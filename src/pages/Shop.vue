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
    <div v-if="!loading" class="row">
      <div
        class="col-12 col-sm-3 shoplist"
        v-for="shop in shops"
        :key="shop.id"
      >
        <shop-list :shop="shop" @shop-selected="toShop" />
      </div>
    </div>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="!isOwnShop && !loading"
    >
      <q-fab color="primary" icon="fas fa-store" direction="up">
        <q-fab-action
          @click="toMyShop"
          color="secondary"
          label=" ฝากร้าน "
          icon="fas fa-store"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { getNearbyShop } from "../api/api";
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
      isOwnShop: false
    };
  },
  async mounted() {
    this.loading = true;
    this.$geolocation.getCurrentPosition(
      async pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        this.shops = await getNearbyShop({ lat, lng });
        if (this.$currentUser && this.shops) {
          for (let index = 0; index < this.shops.length; index++) {
            const shop = this.shops[index];
            if (shop.owner === this.$currentUser.uid) {
              this.isOwnShop = true;
              break;
            }
          }
        }
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    toMyShop() {
      this.$router.push({ name: "myshop" });
    },
    toShop(shop) {
      this.$router.push({ name: "shopinfo", params: { id: shop._id } });
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
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
