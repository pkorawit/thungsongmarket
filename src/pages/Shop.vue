<template>
  <q-page>
    <q-input
      type="search"
      label="หาอะไรอยู่หรือป่าว. . .?"
      color="primary"
      filled
      square
      class="window-width q-mb-sm shadow-3 bg-white"
    >
      <template v-slot:append>
        <q-icon color="primary" name="search" />
      </template>
    </q-input>
    <div v-if="loading">
      <shop-list-loading-placeholder v-for="i in 5" :key="i" />
    </div>
    <q-infinite-scroll @load="onLoad" :offset="200">
      <div v-if="!loading" class="row">
        <div class="col-12 col-sm-3 shoplist" v-for="shop in shops" :key="shop.id">
          <shop-list :shop="shop" @shop-selected="toShop" />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="!isOwnShop && !loading">
      <q-fab color="primary" icon="fas fa-store" direction="up">
        <q-fab-action @click="toMyShop" color="secondary" label=" ฝากร้าน " icon="fas fa-store" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { getLastUpdatedShopByPage } from "../api/api";
import ShopListLoadingPlaceholder from "../components/shop/ShopListLoadingPlaceholder.vue";
import ShopList from "../components/shop/ShopList.vue";

export default {
  name: "PageShop",
  components: {
    ShopList,
    ShopListLoadingPlaceholder
  },
  data() {
    return {
      shops: [],
      loading: false,
      isOwnShop: false,
      pageNumber: 1,
      isLastPage: false
    };
  },
  async mounted() {
    this.loading = true;
    this.$geolocation.getCurrentPosition(
      async pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Get first page manually, later page will use pull to refresh
        const response = await getLastUpdatedShopByPage(this.pageNumber);
        const shops = response.data;
        this.shops = shops;
        this.pageNumber++;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    async getMoreData() {
      const response = await getLastUpdatedShopByPage(this.pageNumber++);
      const shops = response.data;
      console.log("shop ", shops);
      if (shops.length > 0) {
        for (let shop in shops) {
          this.shops.push(shops[shop]);
        }
        return true;
      } else {
        return false;
      }
    },
    toMyShop() {
      this.$router.push({ name: "myshop" });
    },
    toShop(shop) {
      this.$router.push({ name: "shopinfo", params: { id: shop.id } });
    },
    async onLoad(index, done) {
      // Pull to refresh will no work on last page and first page
      if (this.isLastPage == false && this.pageNumber > 1) {
        console.log("Loading...");
        const haveMoreData = await this.getMoreData();
        console.log(haveMoreData);
        if (haveMoreData == false) this.isLastPage = true;
        done();
      }
      else{
        done();
      }
    }
  }
};
</script>

<style>
.shop-logo {
  width: 90px;
  height: 90px;
}
.hashtag-section {
  display: flex;
}
.hashtag {
  font-size: 11px;
}
.rating-section {
  display: flex;
}
.service-section {
  display: flex;
}
@media only screen and (min-width: 1023px) {
  .shoplist {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
