<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center"><h5>Category</h5></div>
      <div
        class="col-12 col-sm-3 category"
        v-for="shop in shopsCategory"
        :key="shop.id"
        @click="toCategoryById(shop.category)"
      >
        <q-card class="no-border-radius">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic>
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ shop.category }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getNearbyShop } from "../api/api";
export default {
  data() {
    return {
      shops: [],
      shopsCategory: []
    };
  },
  async mounted() {
    this.$geolocation.getCurrentPosition(
      async pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        this.shops = await getNearbyShop({ lat, lng });
        let type = this.shops.map(x => x.category);
        type = [...new Set(type)];
        for (let i = 0; i < type.length; i++) {
          this.shopsCategory.push({
            id: i + 1,
            category: type[i]
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    toCategoryById(a) {
      this.$router.push({ name: "categoryById", params: { id: a } });
    }
  }
};
</script>

<style>
@media only screen and (min-width: 1023px) {
  .category {
    padding-left: 15px;
    padding-right: 15px;
    margin: 15px;
  }
}
.category {
  padding-top: 10px;
}
</style>
