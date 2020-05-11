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
          <q-btn color="primary" @click="showTextLoading">จัดการ</q-btn>

          <q-card class="bg-grey-3 relative-position card-example" v-show="showSimulatedReturnData">
            <q-card-section class="q-pb-none">
              <div class="text-h6">Lorem Ipsum</div>
            </q-card-section>

            <q-card-section>
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna eu risus laoreet tristique.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna eu risus laoreet tristique.
                </div>
              </transition>
            </q-card-section>

            <q-inner-loading :showing="visible">
              <q-spinner-gears size="500px" color="primary"></q-spinner-gears>
            </q-inner-loading>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="q-pa-md q-gutter-lg">
            <q-btn label="จัดการ" color="primary" @click="confirm"></q-btn>
          </div>
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
</style>