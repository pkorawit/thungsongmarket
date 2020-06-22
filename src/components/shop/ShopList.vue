<template>
  <div class="shop-container shadow-1 q-mb-sm bg-white">
    <div class="shop-avatar-box q-pb-sm" @click="toShop">
      <q-img :src="shop.photoURL[0]" class="shop-avatar" :ratio="16 / 9" />
    </div>
    <div class="description-box q-pa-sm">
      <div class="description-header text-h5" @click="toShop">{{ shop.shopName }}</div>
      <div class="flex" @click="toCategory(shop.category)">
        <div class="row">
          <q-icon
            name="fas fa-tag"
            color="secondary"
            size="12px"
            style="padding: 7px 0 0 5px; margin: 0 8px 0 0"
          />
          <div class="text-blue cursor">{{ shop.category }}</div>
        </div>
      </div>
      <div class="description-caption rating" @click="toShop">
        <div class="q-mr-xs">
          <q-icon name="money" color="green" size="15px" style="padding: 0px 0px 0px 0px;" />
        </div>
        <div class="row">
          <div
            class="q-ma-xs"
            v-for="paymentType in shop.paymentType"
            :key="paymentType"
          >{{ paymentType }}</div>
        </div>
      </div>
      <div class="description-caption service-type" @click="toShop">
        <div class="col-12">
          <q-icon
            name="fas fa-shipping-fast"
            color="primary"
            style="margin-top: 4px; margin-left: 2px; margin-right: 5px;"
            size="12px"
          />
        </div>
        <div class="row full-width">
          <div class="q-ma-xs truncate">{{ serviceType }}</div>
        </div>
      </div>
    </div>
    <div class="row q-ma-sm" v-if="isMyShop">
      <div class="col-6">
        <q-btn
          color="primary"
          icon="fas fa-edit"
          label="แก้ไขข้อมูลร้าน"
          @click="toShop"
          class="no-border-radius full-width"
        />
      </div>
      <div class="col-6">
        <q-btn
          color="primary"
          icon="fas fa-qrcode"
          label="QR Code"
          @click="downloadQr"
          class="no-border-radius full-width"
        />
      </div>
    </div>
    <div class="row"  v-if="showQR">
      <div class="col-12 text-center">
        <VueQrcode :value="qrText" :options="{ width: 350 }"></VueQrcode>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { getShopURL } from "../../api/api";
export default {
  name: "ShopList",
  components: {
    VueQrcode
  },
  props: {
    shop: {
      type: Object,
      required: true
    },
    isMyShop: {
      type: Boolean,
      required: false
    },
    showQR: false,
  },
  methods: {
    dictionary(word) {
      const dict = { pickup: "รับที่ร้าน", delivery: "จัดส่ง" };
      return dict[word];
    },
    toShop() {
      this.$emit("shop-selected", this.shop);
    },
    toCategory(type) {
      this.$router.push({ name: "categoryById", params: { id: type } });
      // this.$emit("category-selected", type);
    },
    downloadQr() {
      this.showQR = true;
    }
  },
  computed: {
    serviceType() {
      return this.shop.serviceType.join(" ");
    },
    qrText(){      
      return getShopURL(this.shop.id);
    }
  }
};
</script>

<style lang="sass">
.shop-container
  display: flex
  flex-direction: column
  .truncate
    width: calc( 100% - 10% )
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden

.shop-avatar-box
  display: flex
  height: 100%
  width: 100%
  background: rgba(0, 0, 0, 0.02)

.description-box
  background: rgba(0, 0, 0, 0.02)

.rating
  display: flex

.hashtags
  display: flex

.service-type
  display: flex

.cursor
  cursor: pointer
  text-decoration-line: underline
</style>
