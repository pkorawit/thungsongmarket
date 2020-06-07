<template>
  <q-page class="q-pa-md">
    <div class="row  text-center">
      <div class="text-h5 text-center">ภาพรวมตลาด</div>
    </div>
    <div class="row text-center q-pa-md" >
      <div class="col-12 col-md-4 q-pa-md">
        <q-card class="bg-orange-6 text-white" flat>
          <q-card-section>
            <q-icon name="fas fa-store" size="lg"/>
            <div class="text-h6">ร้านค้า</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center" class="bg-white text-black">
            <div class="text-h6">{{ shops.length }} ร้าน</div>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-4 q-pa-md">
        <q-card class="bg-blue-6 text-white" flat>
          <q-card-section>
            <q-icon name="fas fa-boxes" size="lg"/>
            <div class="text-h6">สินค้า</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center" class="bg-white text-black">
            <div class="text-h6">{{ shops.length }} ชนิด</div>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-4 q-pa-md">
        <q-card class="bg-purple-6 text-white" flat>
          <q-card-section>
            <q-icon name="fas fa-users" size="lg"/>
            <div class="text-h6">ผู้เข้าชม</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center" class="bg-white text-black">
            <div class="text-h6">{{ shops.length }} คน</div>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="text-center col-12">
        <q-btn @click="openShopList" label="ดูรายชื่อร้านค้ารออนุมัติ" size="lg" type="button" color="secondary">
          <q-icon name="fas fa-angle-right" />
        </q-btn>
      </div>
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