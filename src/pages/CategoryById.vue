<template>
  <q-page>
    <div class="row">
      <div
        class="col-12 col-sm-3 categoryById "
        v-for="shop in shops"
        :key="shop.id"
      >
        <shop-list
          v-if="shop.category == id"
          :shop="shop"
          @shop-selected="toShop"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { getNearbyShop } from "../api/api";
import ShopList from "../components/shop/ShopList.vue";
export default {
  components: {
    ShopList
  },
  data() {
    return {
      shops: [],
      shopsCategory: [],
      id: ""
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.params.id;
    this.$store.commit("SET_NAV_TITLE", this.id);
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
      this.$router.push({ name: "shopinfo", params: { id: shop._id } });
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
}
</style>
