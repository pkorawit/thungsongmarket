<template>
  <q-page class="app-container q-mt-sm">
    <q-infinite-scroll @load="onLoad" :offset="200">
      <div class="row">
        <div
          class="col-12 col-sm-4 categoryByselectedCategory"
          v-for="(shop, index) in shops"
          :key="index"
        >
          <shop-list :shop="shop" @shop-selected="toShop" />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="secondary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <div
      v-if="shopNotFound"
      class="text-h6 text-center"
      style="padding: 25px 0px 0px 0px;"
    >ไม่มีสินค้าประเภท {{ this.selectedCategory }} ในขณะนี้</div>
  </q-page>
</template>

<script>
import { getNearbyShop, getShopByCategory } from "../api/api";
import ShopList from "../components/shop/ShopList.vue";

export default {
  components: {
    ShopList
  },
  data() {
    return {
      shops: [],
      selectedCategory: "",
      shopNotFound: false,
      pageNumber: 1,
      isLastPage: false,
    };
  },
  async mounted() {
    console.log("mounted");
    this.$q.loading.show();
    this.selectedCategory = this.$route.params.id;
    this.$store.commit("SET_NAV_TITLE", this.selectedCategory);
    await this.getData(this.pageNumber);
    this.$q.loading.hide();
  },
  methods: {
    toShop(shop) {
      this.$router.push({
        name: "shopinfo",
        params: { id: shop.id }
      });
    },
    async getData(pageNumber) {
      console.log("getData " + pageNumber);
      return await getShopByCategory(
        this.selectedCategory,
        pageNumber
      );
    },
    async onLoad(index, done) {
      console.log("loading..");
      if (this.isLastPage == false && this.pageNumber > 1) {
        const haveMoreData = await this.getData(this.pageNumber);
        this.pageNumber++;
        if (haveMoreData == false) {
          this.isLastPage = true;
        }
        this.setCache();
        done();
      } else {
        done();
      }
    }
  }
};
</script>

<style>
@media only screen and (min-wselectedcategoryth: 1023px) {
  .categoryByselectedCategory {
    padding-left: 15px;
    padding-right: 15px;
  }
  .shoplist {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
