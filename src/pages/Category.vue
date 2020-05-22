<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <h5>Category</h5>
      </div>
      <div
        class="col-12 col-sm-3 category items-start q-gutter-md"
        v-for="shop in shopsCategory"
        :key="shop"
        @click="toCategoryById(shop)"
      >
        <q-card class="my-card ">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ shop }}</q-item-label>
            </q-item-section>
          </q-item>
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
