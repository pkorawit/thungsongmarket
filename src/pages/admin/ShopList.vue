<template>
  <q-page id="shopList">
    <q-card class="bg-warning">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="dark"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" label="รออนุมัติ"></q-tab>
        <q-tab name="alarms" label="อนุมัติแล้ว"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div v-if="pendingShops.length == 0">
            <div class="text-h5 text-center">ไม่มีร้านที่รออนุมัติ</div>
          </div>

          <div class="q-pa-md row items-start q-gutter-md">
            <q-card
              class="my-card col-12 col-md-2"
              v-for="(pendings, index) in this.pendingShops"
              :key="index"
            >
              <q-img :src="pendings.photoURL[0]" height="250px">
                <div
                  class="absolute-bottom text-right"
                  style="font-size: 12px;"
                >{{ lastUpdate(pendings.lastUpdated) }}</div>
              </q-img>

              <q-card-section>
                <div class="text-h5">{{ pendings.shopName }}</div>
                <div class="flex text-grey-8">
                  <q-icon
                    name="fas fa-tag"
                    color="grey-8"
                    size="12px"
                    style="padding: 7px 0 0 5px; margin: 0 8px 0 0"
                  />
                  {{ pendings.category }}
                </div>
                <div class="row q-gutter-md">
                  <div class="col-2 text-center">
                    <q-avatar>
                      <q-img :src="pendings.owner.photoURL" height="70px" />
                    </q-avatar>
                  </div>
                  <div class="col" style="padding: 15px 0px 0px 0px; font-size: 17px;">
                    <p>
                      {{ pendings.owner.firstName }}
                      {{ pendings.owner.lastName }}
                    </p>
                  </div>
                </div>

                <div class="description-caption rating">
                  <div class="q-mr-xs">
                    <q-icon
                      name="fas fa-mobile-alt"
                      color="green"
                      size="15px"
                      style="padding: 0px 0px 0px 0px;"
                    />
                  </div>
                  <div style="font-size: 17px;">{{ pendings.owner.telNo }}</div>
                </div>

                <div class="row q-gutter-md" style="padding: 10px 0px 0px 0px;">
                  <div class="col text-right">
                    <q-btn
                      class="full-width"
                      label="ข้อมูลร้าน"
                      color="primary"
                      @click="openPending(pendings.id)"
                    ></q-btn>
                  </div>

                  <div class="col text-right">
                    <q-btn
                      class="full-width"
                      label="จัดการ"
                      color="primary"
                      @click="updateData(pendings.id, true)"
                    ></q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div v-if="authorizedShop.length == 0">
            <div class="text-h5 text-center">ไม่มีร้านที่ผ่านการอนุมัติ</div>
          </div>

          <div class="q-pa-md row items-start q-gutter-md">
            <q-card
              class="my-card col-12 col-md-2"
              v-for="(authorizeds, index) in authorizedShop"
              :key="index"
            >
              <q-img :src="authorizeds.photoURL[0]" height="250px">
                <div
                  class="absolute-bottom text-right"
                  style="font-size: 12px;"
                >{{ lastUpdate(authorizeds.lastUpdated) }}</div>
              </q-img>
              <q-card-section>
                <div class="text-h5">{{ authorizeds.shopName }}</div>
                <div class="flex text-grey-8">
                  <q-icon
                    name="fas fa-tag"
                    color="grey-8"
                    size="12px"
                    style="padding: 7px 0 0 5px; margin: 0 8px 0 0"
                  />
                  {{ authorizeds.category }}
                </div>

                <div class="row q-gutter-md">
                  <div class="col-2 text-center">
                    <q-avatar>
                      <q-img :src="authorizeds.owner.photoURL" height="70px" />
                    </q-avatar>
                  </div>
                  <div class="col" style="padding: 15px 0px 0px 0px; font-size: 17px;">
                    <p>
                      {{ authorizeds.owner.firstName }}
                      {{ authorizeds.owner.lastName }}
                    </p>
                  </div>
                </div>

                <div class="description-caption rating">
                  <div class="q-mr-xs">
                    <q-icon
                      name="fas fa-mobile-alt"
                      color="green"
                      size="15px"
                      style="padding: 0px 0px 0px 0px;"
                    />
                  </div>
                  <div style="font-size: 17px;">{{ authorizeds.owner.telNo }}</div>
                </div>

                <div class="row q-gutter-md" style="padding: 10px 0px 0px 0px;">
                  <div class="col text-right">
                    <q-btn
                      class="full-width"
                      label="ข้อมูลร้าน"
                      color="primary"
                      @click="openPending(authorizeds.id)"
                    ></q-btn>
                  </div>

                  <div class="col text-right">
                    <q-btn
                      class="full-width"
                      label="จัดการ"
                      color="primary"
                      @click="updateData(authorizeds.id, false)"
                    ></q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import {
  getAuthorizedShop,
  getPendingShop,
  setAuthorizeStatus
} from "../../api/api";

import moment from "moment";

export default {
  name: "ShopList",
  data() {
    return {
      tab: "mails",
      pendingShops: [],
      authorizedShop: [],
      details: false
    };
  },
  async mounted() {
    this.getdata();
  },
  methods: {
    lastUpdate(ldate) {
      moment.locale("th");
      return moment(ldate).format("LLLL");
    },
    updateData(id, status) {
      this.$q
        .dialog({
          message: "ยืนยันข้อมูลการเปิดร้าน",
          options: {
            type: "radio",
            model: "",
            items: [
              { label: "อนุมัติ", value: "comfirm", color: "secondary" },
              { label: "รออนุมัติ", value: "unComfirm", color: "secondary" }
            ]
          },
          cancel: true,
          persistent: true
        })
        .onOk(async data => {
          if (data == "comfirm" && status == true) {
            const responseStatus = await setAuthorizeStatus(id, status);
            this.getdata();
          } else if (data == "unComfirm" && status == false) {
            const responseStatus = await setAuthorizeStatus(id, status);
            this.getdata();
          } else {
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    async getdata() {
      const responsePending = await getPendingShop();
      this.pendingShops = responsePending.data;
      // console.log(this.pendingShops);

      const responseAuthorized = await getAuthorizedShop();
      this.authorizedShop = responseAuthorized.data;
      // console.log(this.authorizedShop);
    },
    openPending(id) {
      // console.log("openPending");
      // console.log(id);

      this.$router.push({
        name: "shopinfoAdmin",
        params: { id: id }
      });
    }
  }
};
</script>

<style>
.card-example {
  width: 500px;
}
.rating {
  display: flex;
}
.service-type {
  display: flex;
}
</style>
