<template>
  <q-page class="q-pa-md">
    <h4 class="text-center">
      รายชื่อร้านค้า
      <hr />
    </h4>

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
            <q-card class="my-card col-12 col-md-2">
              <img :src="photoURL" />

              <q-card-section>
                <div class="text-h5">{{ shopName }}</div>
                <div class="flex text-grey-8">
                  <q-icon
                    name="fas fa-tag"
                    color="grey-8"
                    size="12px"
                    style="padding: 7px 0 0 5px; margin: 0 8px 0 0"
                  />
                  {{ shopCategory }}
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
                  <div>{{shopPaymentType}}</div>
                </div>
                <div class="row">
                  <div class="description-caption service-type col-6">
                    <q-icon
                      name="fas fa-shipping-fast"
                      color="primary"
                      style="margin-top: 4px; margin-left: 2px; margin-right: 5px;"
                      size="12px"
                    />
                    <div>{{shopServiceType}}</div>
                  </div>

                  <div class="col text-right">
                    <q-btn color="secondary" label="จัดการ" @click="confirm" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <h4>ทั้งหมด</h4>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "mails",
      photoURL: "https://cdn.quasar.dev/img/mountains.jpg",
      shopName: "ยำขนมจีนพี่ปอนด์",
      shopCategory: "ของกิน",
      shopPaymentType: "เงินสดโอน",
      shopServiceType: "ส่งทุกเที่ยง",
      visible: false,
      showSimulatedReturnData: false
    };
  },
  methods: {
    showTextLoading() {
      this.visible = true;
      this.showSimulatedReturnData = false;
      setTimeout(() => {
        this.visible = false;
        this.showSimulatedReturnData = true;
      }, 1000);
    },
    confirm() {
      this.$q
        .dialog({
          title: "ชื่อร้าน",
          message: "ข้อมูล",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
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