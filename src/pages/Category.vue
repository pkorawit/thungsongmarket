<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center text-h4 q-pa-md">
        หมวดหมู่สินค้า
      </div>
      <div
        class="col-12 col-sm-3 category q-pa-md"
        v-for="shop in shopsCategory"
        :key="shop"
        @click="toCategoryById(shop)"
      >
      <q-btn unelevated rounded class="full-width text-black" color="secondary" size="lg" :label="shop" />
        <!-- <q-card class="my-card bg-secondary">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="~assets/logo.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">{{ shop }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCategories } from "../api/api";
export default {
  data() {
    return {
      shopsCategory: []
    };
  },
  async mounted() {
    //getCategory
    let categoryOption = await getCategories();
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
