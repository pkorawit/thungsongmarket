<template>
  <div>
    <q-page v-if="$currentUser" class="app-container">
      <div v-if="loading" class="full-width">
        <shop-list-loading-placeholder v-for="i in 5" :key="i" />
      </div>
      <div v-if="!loading && shop" class="row">
        <div class="col-12 col-sm-4 account q-mt-md">
          <shop-list :shop="shop" @shop-selected="toMyshop" :isMyShop="true" />
        </div>
      </div>
    </q-page>
    <div v-if="!$currentUser" class="absolute-center full-width q-px-md shop-notice">
      <q-icon
        name="fas fa-store"
        color="primary"
        size="128px"
        class="q-mb-md"
        style="opacity: 0.3"
      />
      <q-btn
        color="primary"
        :label="toMyShopBtnLabel"
        @click="toMyshop"
        size="md"
        class="to-my-shop-btn"
      />
    </div>
  </div>
</template>

<script>
import ShopList from "../components/shop/ShopList.vue";
import ShopListLoadingPlaceholder from "../components/shop/ShopListLoadingPlaceholder.vue";
import { getOwnedShop, getShops } from "../api/api";
import { pageStackMixin } from "../mixins/page-stack.mixin";
export default {
  mixins: [pageStackMixin],
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
    }
  },
  async mounted() {
    try {
      if (this.$currentUser) {
        this.setNavTitle("รายการร้านของฉัน");
        this.loading = true;
        this.shop = (
          await getOwnedShop(this.$firebase.auth().currentUser.phoneNumber)
        ).data[0];
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    toMyShopBtnLabel() {
      if (!this.$currentUser) {
        return "ต้องเข้าสู่ระบบก่อนนะคะ กดตรงนี้เข้าสู่ระบบกันเลย";
      } else if (this.$currentUser && !this.shop) {
        return "ข้อมูลร้านไม่สมบูรณ์ กดตรงนี้เพื่อแก้ไขร้าน";
      } else {
        return "กำลังอ่านข้อมูลหรืออาจเกิดข้อผิดพลาดกรุณาติดต่อทีมงาน";
      }
    }
  }
};
</script>

<style lang="sass">
.shop-notice 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

.to-my-shop-btn
  width: 100%

@media only screen and (min-width: 1024px) 
  .account 
    padding-left: 10px;
    padding-right: 10px;
  
  .to-my-shop-btn
    width: calc( 100% - 70% )


</style>
