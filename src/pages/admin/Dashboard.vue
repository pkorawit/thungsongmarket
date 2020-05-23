<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">ภาพรวมร้านค้า</h4>

    <div class="row items-start q-gutter-md text-center">
      <div class="col-1"></div>

      <div class="col-11 col-md-3">
        <q-card class="bg-orange-6 text-white">
          <q-card-section>
            <div class="text-h6">ร้านค้า {{ shops.length }} ร้าน</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>

          <!-- <q-card-section>lorem</q-card-section> -->
        </q-card>
      </div>

      <div class="col-11 col-md-3">
        <q-card class="bg-blue text-white">
          <q-card-section>
            <div class="text-h6">ผู้ใช้งาน 600 คน</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-11 col-md-3">
        <q-card class="bg-purple-6 text-white">
          <q-card-section>
            <div class="text-h6">สินค้า 1562 รายการ</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- โยงหน้า -->
    <br />
    <div class="text-center">
      <q-btn @click="openShopList" label="อนุมัติร้านค้า" type="submit" color="blue-10"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { getShops } from "../../api/api";

export default {
  data() {
    return {
      shops: []
    };
  },
  async mounted() {
    this.forShop();
  },
  methods: {
    openShopList() {
      console.log("openList");
      this.$router.push({ name: "shoplist" });
    },
    async forShop() {
      const response = await getShops();
      this.shops = response.data;
      // console.log(this.shops);
      // for (i = 0; i < shops.length; i++) {
      //   console.log("i"+ [i]);
      // }
    }
  }
};
</script>

<style>
</style>