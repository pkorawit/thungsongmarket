<template>
  <div>
    <div id="q-info" v-if="shop && !loading">
      <q-carousel
        swipeable
        animated
        v-model="carouselIndex"
        infinite
        arrows
        thumbnails
        :fullscreen.sync="fullscreen"
        height="280px"
      >
        <q-carousel-slide
          :name="index"
          v-for="(imageUrl, index) in this.shop.photoURL"
          :key="index"
          :img-src="imageUrl"
          class="uncropped-image"
        ></q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>

      <div class="app-container">
        <q-card>
          <q-card-section class="bg-secondary text-black">
            <div class="text-h5">{{ shop.shopName }}</div>
            <div class="flex text-grey-8">
              <q-icon
                name="fas fa-tag"
                color="grey-8"
                size="11px"
                style="padding: 7px 0 0 0; margin: 0 5px 0 0"
              />
              {{ shop.category }}
            </div>
          </q-card-section>
          <q-card-section style="padding-top: 5px; padding-bottom: 1px">
            <div style="font-size:15px">
              <p>{{ shop.description }}</p>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6 full-width">
              <q-icon name="list" class="q-mr-sm" />รายการสินค้า
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-list>
              <q-item dense v-for="(food, index) in shop.products" :key="index">
                <q-item-section>
                  <q-item-label style="font-size:15px">• {{ food.productName }}</q-item-label>
                </q-item-section>

                <q-item-section side class="text-right">
                  <q-item-label style="font-size:15px">฿ {{ food.price }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">
              <q-icon name="info" class="q-mr-sm" />ข้อมูลร้าน
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div style="font-size:15px;" class="q-pl-md q-pl-md-md q-mb-md">ข้อมูลเจ้าของร้าน</div>
            <div class="row">
              <div class="col-md-6 col-12 flex-row q-pl-md q-pl-md-md">
                <q-avatar v-if="shop.owner.photoURL" size="90px">
                  <img :src="shop.owner.photoURL" />
                </q-avatar>
                <q-avatar v-if="shop.owner.photoURL == ''" size="90px">
                  <img src="statics/noimage.png" />
                </q-avatar>
                <div style="font-size:15px;">
                  <div class="q-py-sm q-px-lg">
                    ชื่อ:
                    {{ shop.owner.firstName }}
                    {{ shop.owner.lastName }}
                  </div>
                  <div class="q-px-lg">เบอร์โทร: {{ shop.owner.telNo }}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 q-pl-md q-pl-md-md">
                <q-list>
                  <q-item dense>
                    <q-item-section thumbnail style="padding-right: 13px; margin-left: -20px;">
                      <q-icon name="location_on" class="text-orange" style="font-size: 22px;" />
                    </q-item-section>
                    <q-item-section style="font-size:15px;">
                      อยู่ที่ : {{ shop.address.detail }}
                      {{ shop.address.subDistrict }}
                      {{ shop.address.district }}
                      {{ shop.address.province }}
                      {{ shop.address.postalCode }}
                    </q-item-section>
                  </q-item>
                  <!--  -->
                  <q-item dense>
                    <q-item-section thumbnail>
                      <q-icon
                        name="fas fa-shipping-fast"
                        class="text-primary"
                        style="font-size: 15px;"
                      />
                    </q-item-section>
                    <q-item-section style="font-size:15px;">
                      <div class="row">
                        <div
                          class="q-ma-xs"
                          v-for="service in shop.serviceType"
                          :key="service"
                        >{{ service }}</div>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <!--  -->
                    <q-item-section thumbnail>
                      <q-icon
                        name="far fa-money-bill-alt"
                        class="text-green"
                        style="font-size: 15px;"
                      />
                    </q-item-section>
                    <q-item-section style="font-size:15px">
                      <div class="row">
                        <div
                          class="q-ma-xs"
                          v-for="payment in shop.paymentType"
                          :key="payment"
                        >{{ payment }}</div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section></q-card-section>
        </q-card>

        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">
              <q-icon name="phone" class="q-mr-sm" />ติดต่อสอบถามได้ที่
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div style="font-size:15px" class="q-pl-md q-pl-md-md">
              <p v-if="shop.contact.telNo">
                เบอร์โทร :
                <a :href="'tel:' +  shop.contact.telNo">{{ shop.contact.telNo }}</a>
              </p>
              <p v-if="shop.contact.line">
                LINE :
                <a
                  target="_blank"
                  :href="'http://line.me/ti/p/~' +  shop.contact.line"
                >{{ shop.contact.line }}</a>
              </p>
              <p v-if="shop.contact.facebook">
                Facebook :
                <a
                  target="_blank"
                  :href="shop.contact.facebook"
                >{{ shop.contact.facebook }}</a>
              </p>
              <p v-if="shop.contact.others">อื่นๆ : {{ shop.contact.others }}</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="loading">
      <shop-info-placeholder></shop-info-placeholder>
    </div>
  </div>
</template>

<script>
import { getShopById } from "../api/api";
import ShopInfoPlaceholder from "../components/shop-info/ShopInfoPlaceholder";
import { pageStackMixin } from "../mixins/page-stack.mixin";

export default {
  mixins: [pageStackMixin],
  name: "ManuFoods",
  components: {
    ShopInfoPlaceholder
  },
  data() {
    return {
      shop: null,
      carouselIndex: 0,
      fullscreen: false,
      loading: false
    };
  },
  async mounted() {
    const shopId = this.$route.params.id;
    this.loading = true;
    this.shop = (await getShopById(shopId)).data;
    this.setNavTitle(this.shop.shopName);
    this.loading = false;
  }
};
</script>

<style lang="scss">
.uncropped-image {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: black;
}
</style>
