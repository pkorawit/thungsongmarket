<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-sm-3 categoryById" v-for="shop in shops" :key="shop.id">
        <shop-list v-if="shop.category == id" :shop="shop" @shop-selected="toShop" />
      </div>
    </div>

    <div
      v-if="shopC.length == 0"
      class="text-h5 text-center"
      style="padding: 25px 0px 0px 0px;"
    >ไม่มีสินค้าประเภท {{ this.id }} ในขณะนี้</div>
    <div class="row">
      <div class="col-12 col-sm-3 shoplist" v-for="shop in shopC" :key="shop.id">
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
      shopC: [],
      shops: [],
      shopsCategory: [],
      id: ""
    };
  },
  async mounted() {
    this.id = this.$router.currentRoute.params.id;
    this.$store.commit("SET_NAV_TITLE", this.id);
    // console.log(this.id);

    this.$q.loading.show();
    const response = await getShopByCategory(this.id);
    this.shopC = response.data;
    // console.log(this.shopC);
    this.$q.loading.hide();

    this.$geolocation.getCurrentPosition(
      async pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let shop = await getNearbyShop({ lat, lng });
        for (let i = 0; i < shop.length; i++) {
          let data = shop[i].category;
          if (data == this.id) {
            this.shops.push(shop[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    toShop(shop) {
      this.$router.push({ name: "shopinfo", params: { id: shop.id } });
    }
  }
};
</script>

<style>
@media only screen and (min-width: 1023px) {
  .categoryById {
    padding-left: 15px;
    padding-right: 15px;
  }
  .shoplist {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
