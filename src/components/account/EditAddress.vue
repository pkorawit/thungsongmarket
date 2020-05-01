<template>
  <q-dialog
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :maximized="maximized"
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card>
      <div class="bg-primary row" style="min-height: 50px;">
        <div class="col-xs-4" style="margin: auto; padding-left: 0px; margin-right: 0px">
          <q-btn color="white" flat icon="arrow_left" @click="hide">ย้านกลับ</q-btn>
        </div>
        <div class="col-xs-4" style="margin: auto;">
          <div class="text-center" style="color: white; font-size: 22px;">ที่อยู่</div>
        </div>
        <div class="col-xs-4 text-center" style="margin: auto;">
          <q-btn color="white" flat icon-right="save" @click="hide">บันทึก</q-btn>
        </div>
      </div>

      <q-card-section class="q-pa-none">
        <div class="row">
          <div class="col-xs-12 window-width">
            <q-input filled square v-model="value.detail" type="text" label="เลขที่" ref="detail">
              <template v-slot:append>
                <q-icon name="edit" @click="focusTo('detail')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 window-width">
            <q-input
              filled
              square
              v-model="value.subDistrict"
              type="text"
              label="ตำบล"
              ref="subDistrict"
            >
              <template v-slot:append>
                <q-icon name="edit" @click="focusTo('subDistrict')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 window-width">
            <q-input
              filled
              square
              v-model="value.district"
              type="text"
              label="อำเภอ"
              ref="district"
            >
              <template v-slot:append>
                <q-icon name="edit" @click="focusTo('district')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 window-width">
            <q-input
              filled
              square
              v-model="value.province"
              type="text"
              label="จังหวัด"
              ref="province"
            >
              <template v-slot:append>
                <q-icon name="edit" @click="focusTo('province')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 window-width">
            <q-input
              filled
              square
              v-model="value.postalCode"
              type="text"
              label="รหัสไปษณีย์"
              ref="postalCode"
            >
              <template v-slot:append>
                <q-icon name="edit" @click="focusTo('postalCode')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 window-width">
            <q-btn
              color="green"
              icon="save"
              label="บันทึก"
              size="md"
              @click="onOKClick"
              class="full-width no-border-radius"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    maximized: {
      type: Boolean
    },
    transitionShow: {
      type: String
    },
    transitionHide: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },
    onOKClick() {
      this.$emit("ok", this.value);
      this.hide();
    },
    onCancelClick() {
      this.hide();
    },
    onBackKeyDown(e) {
      console.log(e);
      alert(e);
    }
  },
  mounted() {
    document.addEventListener("backbutton", this.onBackKeyDown, false);
  },
  deactivated() {
    document.removeEventListener("backbutton", () =>
      console.log("remove backbutton event listener")
    );
  }
};
</script>

<style>
</style>