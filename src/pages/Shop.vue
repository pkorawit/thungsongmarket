<template>
  <q-page class="app-container">
    <q-input
      type="search"
      label="หาอะไรอยู่หรือป่าว. . .?"
      color="primary"
      filled
      square
      class="full-width q-mb-md shadow-3 bg-white"
      v-model="keyword"
    >
      <template v-slot:append>
        <q-icon color="primary" name="search" @click="searchShop" />
      </template>
    </q-input>
    <div v-if="loading">
      <shop-list-loading-placeholder v-for="i in 5" :key="i" />
    </div>
    <q-infinite-scroll @load="onLoad" :offset="200">
      <div v-if="!loading" class="row">
        <div
          :class="`col-12 col-sm-4 ${shopListClass(index)}`"
          v-for="(shop, index) in shops"
          :key="shop.id"
        >
          <shop-list :shop="shop" @shop-selected="toShop" />
        </div>
        <div class="col-12 q-pa-md text-center" v-show="shops.length == 0">ไม่พบข้อมูลร้านค้า</div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="!isOwnShop && !loading">
      <q-fab color="primary" icon="fas fa-store" direction="up">
        <q-fab-action @click="toMyShop" color="secondary" label=" ฝากร้าน " icon="fas fa-store" />
      </q-fab>
    </q-page-sticky>-->
  </q-page>
</template>

<script>
import { getLastUpdatedShop, searchShopByKeyword } from "../api/api";
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
      isLastPage: false,
      keyword: "",
      searchMode: false
    };
  },
  async mounted() {
    this.getCachedShops();

    if (this.shops.length == 0) {
      this.loading = true;
      // Get first page manually, later page will use pull to refresh
      const response = await getLastUpdatedShop(this.pageNumber);
      const shops = response.data;
      this.shops = shops;
      this.pageNumber++;
      this.loading = false;
    }
  },
  methods: {
    getCachedShops() {
      // Get cached shops
      if (sessionStorage.shops) {
        this.shops = JSON.parse(sessionStorage.shops);
      }
      if (sessionStorage.pageNumber)
        this.pageNumber = parseInt(sessionStorage.pageNumber);
      if (sessionStorage.isLastPage)
        this.isLastPage = sessionStorage.isLastPage;
      if (sessionStorage.keyword) this.keyword = sessionStorage.keyword;
    },

    clearCachedShops() {
      if (sessionStorage.shops) {
        sessionStorage.removeItem("shops");
      }
      if (sessionStorage.pageNumber) sessionStorage.removeItem("pageNumber");
      if (sessionStorage.isLastPage) sessionStorage.removeItem("isLastPage");
      if (sessionStorage.keyword) sessionStorage.removeItem("keyword");
    },

    async getMoreData() {
      let response = null;
      if (this.searchMode)
        response = await searchShopByKeyword(this.keyword, this.pageNumber++);
      else response = await getLastUpdatedShop(this.pageNumber++);
      const shops = response.data;
      if (shops.length > 0) {
        for (let shop in shops) {
          this.shops.push(shops[shop]);
        }
        sessionStorage.shops = JSON.stringify(this.shops);
        sessionStorage.pageNumber = this.pageNumber;
        return true;
      } else {
        return false;
      }
    },
    async searchShop() {
      if (this.keyword == "") {
        return;
      }
      this.loading = true;
      this.clearCachedShops();
      this.searchMode = true;
      this.pageNumber = 1;
      const response = await searchShopByKeyword(
        this.keyword,
        this.pageNumber++
      );
      const shops = response.data;
      this.shops = shops;
      sessionStorage.keyword = this.keyword;
      sessionStorage.shops = JSON.stringify(this.shops);
      this.loading = false;
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
        const haveMoreData = await this.getMoreData();
        if (haveMoreData == false) {
          this.isLastPage = true;
          sessionStorage.isLastPage = this.isLastPage;
        }
        done();
      } else {
        done();
      }
    },
    shopListClass(index) {
      const moded = index % 3;
      const prefix = "shop-list";
      return moded === 0
        ? `${prefix}-left`
        : moded === 1
        ? `${prefix}-mid`
        : `${prefix}-right`;
    }
  }
};
</script>

<style lang="sass">
.shop-logo 
  width: 90px;
  height: 90px;

.hashtag-section 
  display: flex;

.hashtag 
  font-size: 11px;

.rating-section 
  display: flex;

.service-section 
  display: flex;

@media only screen and (min-width: 1024px) 
  .shop-list-left 
    padding-right: 10px;
  
  .shop-list-mid 
    padding-left: 5px;
    padding-right: 5px;
  
  .shop-list-right 
    padding-left: 10px;
  

</style>
