<template>
  <q-page class="q-pa-md">
    <q-card>
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
        <q-tab name="alarms" label="ทั้งหมด"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card
              class="my-card col-12 col-md-2"
              v-for="(pendings,index) in this.pendingShops"
              :key="index"
            >
              <img :src="pendings.photoURL[0]" />

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
                <div class="description-caption rating">
                  <div class="q-mr-xs">
                    <q-icon
                      name="money"
                      color="green"
                      size="15px"
                      style="padding: 0px 0px 0px 0px;"
                    />
                  </div>
                  <div>{{ pendings.paymentType[0] }}</div>
                </div>
                <div class="row">
                  <div class="description-caption service-type col-6">
                    <q-icon
                      name="fas fa-shipping-fast"
                      color="primary"
                      style="margin-top: 4px; margin-left: 2px; margin-right: 5px;"
                      size="12px"
                    />
                    <div>{{ pendings.serviceType[0] }}</div>
                  </div>

                  <div class="col text-right">
                    <q-btn label="จัดการ" color="primary" @click="updateData(pendings.id, true)"></q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card
              class="my-card col-12 col-md-2"
              v-for="(authorizeds,index) in authorizedShop"
              :key="index"
            >
              <img :src="authorizeds.photoURL[0]" />
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
                <div class="description-caption rating">
                  <div class="q-mr-xs">
                    <q-icon
                      name="money"
                      color="green"
                      size="15px"
                      style="padding: 0px 0px 0px 0px;"
                    />
                  </div>
                  <div>{{ authorizeds.paymentType[0] }}</div>
                </div>
                <div class="row">
                  <div class="description-caption service-type col-6">
                    <q-icon
                      name="fas fa-shipping-fast"
                      color="primary"
                      style="margin-top: 4px; margin-left: 2px; margin-right: 5px;"
                      size="12px"
                    />
                    <div>{{ authorizeds.serviceType[0] }}</div>
                  </div>

                  <div class="col text-right">
                    <q-btn
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

export default {
  data() {
    return {
      tab: "mails",
      // visible: false,
      // showSimulatedReturnData: false,
      pendingShops: [],
      authorizedShop: [],
    };
  },
  async mounted() {
    this.getdata();
  },
  methods: {
    updateData(id, status) {
      this.$q
        .dialog({
          // title: "",
          message: "ยืนยันข้อมูลการเปิดร้าน",
          options: {
            // type: "toggle",
            type: "radio",
            model: "",
            // inline: true,
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
            // console.log("comfirm");

            const responseStatus = await setAuthorizeStatus(id, status);
            this.getdata();
          } else if (data == "unComfirm" && status == false) {
            // console.log("unComfirm");

            const responseStatus = await setAuthorizeStatus(id, status);
            this.getdata();
          } else {
            // console.log("NO");
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