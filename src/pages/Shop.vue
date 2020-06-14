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
      <template v-slot:append v-if="searchMode">
        <q-chip label="ยกเลิก" clickable color="secondary" icon="close" @click="cancelSearchShop"></q-chip>
      </template>
      <template v-slot:append v-else>
        <q-icon color="primary" name="search" @click="searchShop" />
      </template>
    </q-input>
    <div class="flex-row q-mb-md category-section" v-if="searchMode">
      <!-- <div class="text-h7">ประเภทสินค้า:</div> -->
      <q-chip
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :outline="cat === category ? false : true"
        color="secondary"
        text-color="white"
        clickable
        ripple
        @click="category = cat"
      />
    </div>
    <div v-if="loading" class="full-width row">
      <shop-list-loading-placeholder v-for="i in 10" :key="i" class="col-12 col-sm-4" />
    </div>
    <q-infinite-scroll @load="onLoad" :offset="200">
      <q-pull-to-refresh @refresh="refresh">
        <div v-if="!loading" class="row">
          <div
            :class="`col-12 col-sm-4 ${shopListClass(index)}`"
            v-for="(shop, index) in shops"
            :key="shop.id"
          >
            <shop-list
              :shop="shop"
              @shop-selected="toShop"
              @category-selected="selectedCategory => category = selectedCategory"
            />
          </div>
          <div class="col-12 q-pa-md text-center" v-show="shops.length == 0">ไม่พบข้อมูลร้านค้า</div>
        </div>
      </q-pull-to-refresh>
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
import {
  getLastUpdatedShop,
  searchShopByKeyword,
  getCategories,
  clearCache
} from "../api/api";
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
      shops$: [],
      loading: false,
      isOwnShop: false,
      pageNumber: 1,
      isLastPage: false,
      keyword: "",
      searchMode: false,
      category: "ทั้งหมด",
      categories: []
    };
  },
  async mounted() {
    // Restore from search mode
    if (sessionStorage.keyword) {
      this.keyword = sessionStorage.keyword;
      this.searchMode = true;
      this.searchShop();
    } else {
      if (this.shops$.length == 0) {
        this.loading = true;
        // Get first page manually, later page will use pull to refresh
        const response = await getLastUpdatedShop(this.pageNumber);
        const shops = response.data;
        this.shops$ = shops;
        this.pageNumber++;
        this.loading = false;
      }
    }
    this.shops = this.shops$;
    await this.getCategories();
  },
  methods: {
    refresh(done) {
      this.loading = true;
      this.pageNumber = 1;
      this.category = "ทั้งหมด";
      clearCache("getLastUpdatedShop");
      clearCache("searchShopByKeyword");
      setTimeout(async () => {
        // Get first page manually, later page will use pull to refresh
        const response = await getLastUpdatedShop(this.pageNumber++);
        const shops = response.data;
        this.shops = shops;
        this.shops$ = shops;        
        this.loading = false;
        if (done) done();
      }, 2500);
    },
    async getMoreData() {
      let response = null;
      if (this.searchMode)
        response = await searchShopByKeyword(this.keyword, this.pageNumber++);
      else response = await getLastUpdatedShop(this.pageNumber++);
      const shops = response.data;
      if (shops.length > 0) {
        for (let shop in shops) {
          this.shops$.push(shops[shop]);
        }
        return true;
      } else {
        return false;
      }
    },
    async cancelSearchShop() {
      this.keyword = "";
      this.searchMode = false;
      sessionStorage.keyword = "";
      this.refresh();
    },
    async searchShop() {
      console.log("Search for " + this.keyword);
      if (this.keyword == "") {
        return;
      }
      this.loading = true;
      this.searchMode = true;
      this.pageNumber = 1;
      const response = await searchShopByKeyword(
        this.keyword,
        this.pageNumber++
      );
      const shops = response.data;
      console.log(shops);
      this.shops = shops;
      this.shops$ = shops;

      // Perist search states
      sessionStorage.keyword = this.keyword;

      this.loading = false;
    },
    toMyShop() {
      this.$router.push({ name: "myshop" });
    },
    toShop(shop) {
      this.$router.push({ name: "shopinfo", params: { id: shop.id } });
    },
    async onLoad(index, done) {
      if (this.category !== "ทั้งหมด") {
        done();
        return;
      }
      // Pull to refresh will no work on last page and first page
      if (this.isLastPage == false && this.pageNumber > 1) {
        const haveMoreData = await this.getMoreData();
        if (haveMoreData == false) {
          this.isLastPage = true;
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
    },
    async getCategories() {
      this.categories = [
        "ทั้งหมด",
        ...(await getCategories()).map(c => c.name)
      ];
    }
  },
  watch: {
    category: function(category) {
      if (this.loading) {
        return;
      }
      category === "ทั้งหมด"
        ? (this.shops = this.shops$)
        : (this.shops = this.shops$.filter(shop => shop.category === category));
    }
  }
};
</script>

<style lang="sass">
.shop-logo
  width: 90px
  height: 90px

.hashtag-section
  display: flex

.hashtag
  font-size: 11px

.rating-section
  display: flex

.service-section
  display: flex

.category-section
  overflow-x: scroll

@media only screen and (min-width: 1024px)
  .shop-list-left
    padding-right: 10px

  .shop-list-mid
    padding-left: 5px
    padding-right: 5px

  .shop-list-right
    padding-left: 10px
</style>
