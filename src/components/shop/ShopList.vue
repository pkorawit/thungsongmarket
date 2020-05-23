<template>
  <div class="shop-container shadow-1 q-mb-sm bg-white">
    <div class="shop-avatar-box q-pa-sm" @click="toShop">
      <q-img :src="shop.photoURL[0]" class="shop-avatar fit" :ratio="16 / 9" />
    </div>
    <div class="description-box q-pa-sm" v-ripple>
      <div class="description-header text-h5" @click="toShop">
        {{ shop.shopName }}
      </div>
      <div class="flex text-blue cursor" @click="toCategory(shop.category)">
        <div class="row ">
          <q-icon
            name="fas fa-tag"
            color="grey-8"
            size="12px"
            style="padding: 7px 0 0 5px; margin: 0 8px 0 0"
          />
          {{ shop.category }}
        </div>
      </div>
      <div class="description-caption rating" @click="toShop">
        <div class="q-mr-xs">
          <q-icon
            name="money"
            color="green"
            size="15px"
            style="padding: 0px 0px 0px 0px;"
          />
        </div>
        <div class="row">
          <div
            class="q-ma-xs"
            v-for="paymentType in shop.paymentType"
            :key="paymentType"
          >
            {{ paymentType }}
          </div>
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
        <div class="row">
          <div
            class="q-ma-xs"
            v-for="serviceType in shop.serviceType"
            :key="serviceType"
          >
            {{ serviceType }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    shop: {
      type: Object,
      required: true
    }
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
    }
  }
};
</script>

<style>
.shop-container {
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid grey; */
  /* background: rgba(0, 0, 0, 0.03); */
}
.shop-avatar-box {
  display: flex;
  height: 100%;
  width: 100%;
  /* border: 1px solid grey; */
  background: rgba(0, 0, 0, 0.02);
}
.description-box {
  /* border: 1px solid grey; */
  background: rgba(0, 0, 0, 0.02);
}
.description-header {
  /* font-size: 15px; */
}
.description-caption {
  /* font-size: 12px; */
}
.rating {
  display: flex;
}
.hashtags {
  display: flex;
}
.service-type {
  display: flex;
}
.cursor {
  cursor: pointer;
  text-decoration-line: underline;
}
/* .cursor:hover {
  text-decoration-line: underline;
} */
</style>
