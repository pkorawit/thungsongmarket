<template>
  <div>
    <q-page v-if="$currentUser">
      <div v-if="loading">
        <shop-list-loading-placeholder v-for="i in 5" :key="i" />
      </div>
      <div v-if="!loading && shop" class="row">
        <div class="col-12 col-sm-3 account">
          <shop-list :shop="shop" @shop-selected="toMyshop" />
        </div>
      </div>
    </q-page>
    <div
      v-if="!$currentUser"
      class="absolute-center full-width q-px-md shop-notice"
    >
      <q-icon
        name="fas fa-store"
        color="primary"
        size="128px"
        class="q-mb-md"
        style="opacity: 0.3"
      />
      <q-btn
        color="primary"
        label="ต้องเข้าสู่ระบบก่อนนะคะ กดตรงนี้เข้าสู่ระบบกันเลย"
        @click="toMyshop"
        size="md"
        class="full-width animated tada"
        style="animation-duration: 2s;"
      />
    </div>
    <div
      v-if="$currentUser && !shop"
      class="absolute-center full-width q-px-md shop-notice"
    >
      <q-icon
        name="fas fa-store"
        color="primary"
        size="128px"
        class="q-mb-md"
        style="opacity: 0.3"
      />
      <q-btn
        color="primary"
        label="ข้อมูลร้านไม่สมบูรณ์ กดตรงนี้เพื่อแก้ไขร้าน"
        @click="toMyshop"
        size="md"
        class="full-width animated tada"
        style="animation-duration: 2s;"
      />
    </div>
  </div>
</template>

<script>
import ShopList from "../components/shop/ShopList.vue";
import ShopListLoadingPlaceholder from "../components/shop/ShopListLoadingPlaceholder.vue";
import { getOwnedShop, getShops } from "../api/api";
export default {
  name: "ShopsOfUser",
  components: {
    ShopList,
    ShopListLoadingPlaceholder
  },
  data() {
    return {
      shop: null,
      loading: false
    };
  },
  methods: {
    toMyshop(shop) {
      this.$router.push({ name: "myshop", props: { shop } });
    },
    toMyshopList() {
      this.$router.push({
        name: "myshop-list",
        query: { id: this.$currentUser.uid }
      });
    }
  },
  async mounted() {
    try {
      if (this.$currentUser) {
        this.$store.commit("SET_NAV_TITLE", "รายการร้านของฉัน");
        this.loading = true;
        this.shop = await getOwnedShop(this.$currentUser.uid);
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style>
.shop-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media only screen and (min-width: 1023px) {
  .account {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
