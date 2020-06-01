<template>
  <q-page class="app-container q-mt-sm">
    <div class="row">
      <div class="col-12 col-sm-4 categoryByselectedCategory" v-for="shop in shops" :key="shop.selectedCategory">
        <shop-list v-if="shop.category == selectedCategory" :shop="shop" @shop-selected="toShop" />
      </div>
    </div>

    <div
      v-if="shopNotFound"
      class="text-h6 text-center"
      style="padding: 25px 0px 0px 0px;"
    >ไม่มีสินค้าประเภท {{ this.selectedCategory }} ในขณะนี้</div>
    <div class="row">
      <div class="col-12 col-sm-4 shoplist" v-for="shop in shops" :key="shop.selectedCategory">
        <shop-list :shop="shop" @shop-selected="toShop" />
      </div>
    </div>
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
      shopsCategory: [],
      selectedCategory: "",
      shopNotFound: false
    };
  },
  async mounted() {
    this.selectedCategory = this.$router.currentRoute.params.selectedCategory;
    this.$store.commit("SET_NAV_TITLE", this.selectedCategory);
    // console.log(this.selectedCategory);

    this.$q.loading.show();
    const response = await getShopByCategory(this.selectedCategory);
    this.shops = response.data;
    if(this.shops.length == 0) this.shopNotFound = true;
    this.$q.loading.hselectedCategorye();
  },
  methods: {
    toShop(shop) {
      this.$router.push({ name: "shopinfo", params: { selectedCategory: shop.selectedCategory } });
    }
  }
};
</script>

<style>
@media only screen and (min-wselectedCategoryth: 1023px) {
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
