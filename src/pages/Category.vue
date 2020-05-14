<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center"><h5>Category</h5></div>
      <div
        class="col-12 col-sm-3 category"
        v-for="shop in shopsCategory"
        :key="shop"
        @click="toCategoryById(shop)"
      >
        <q-card class="no-border-radius">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic>
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ shop }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCategory } from "../api/api";
export default {
  data() {
    return {
      shopsCategory: []
    };
  },
  async mounted() {
    //getCategory
    let categoryOption = await getCategory();
    this.shopsCategory = categoryOption.map(x => x.name);

    console.log("this.shopsCategory", this.shopsCategory);
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
