<template>
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      active-color="primary"
      animated
      flat
    >
      <q-step :name="1" title="ทั่วไป" icon="settings" :done="step > 1">
        <div class="row ">
          <div class="col-12 col-sm-6 step">
            <q-input
              filled
              bottom-slots
              ref="shopName"
              v-model="model.shopName"
              label="ร้านชื่ออะไร"
              :rules="[val => !!val || 'ใส่ชื่อร้านด้วยค่ะ']"
            ></q-input>
          </div>
          <div class="col-12 col-sm-6 step">
            <q-select
              filled
              label="ประเภทสินค้า"
              v-model="model.category"
              :options="categoryOption"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12 step">
            <q-input
              type="textarea"
              rows="14"
              filled
              v-model="model.description"
              label="ฝากร้านได้เลยค่ะ"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12 step">
            <div class="text-subtitle2 text-weight-bolder q-mt-sm">
              รูปแบบบริการ
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-select
              :options="serviceOption"
              v-model="model.serviceType"
              filled
              label="ส่งแบบไหนบ้าง"
            />
          </div>
          <div class="col-12 col-sm-6 step">
            <q-select
              :options="paymentOption"
              v-model="model.paymentType"
              filled
              label="จ่ายเงินแบบไหนได้บ้าง"
            ></q-select>
          </div>
        </div>
      </q-step>

      <q-step :name="2" title="สินค้า" icon="fas fa-book-open" :done="step > 2">
        <div class="row">
          <div class="col-12">
            <div class="text-subtitle2 text-weight-bolder">รูปสินค้า</div>
          </div>
          <div class="col-12 text-center">
            <div class="row q-col-gutter-xs">
              <div class="col-12 col-md">
                <image-file-picker
                  :src="model.photoURL[0]"
                  :index="0"
                  @imageSelected="imageSelected"
                />
              </div>
              <div class="col-6 col-md" v-for="n in 4" :key="`xs-${n}`">
                <div class="my-content">
                  <image-file-picker
                    :src="model.photoURL[n]"
                    :index="n"
                    @imageSelected="imageSelected"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-mt-sm q-mb-sm">
          <div class="col-6">
            <div class="text-subtitle2 text-weight-bolder">รายการสินค้า</div>
          </div>
        </div>
        <div
          class="row q-col-gutter-sm"
          v-for="(product, index) in model.products"
          :key="index"
        >
          <div class="col-6">
            <q-input
              bottom-slots
              filled
              dense
              v-model="product.productName"
              label="ชื่อสินค้า"
            ></q-input>
          </div>
          <div class="col-4">
            <q-input
              bottom-slots
              filled
              dense
              v-model.number="product.price"
              label="ราคา"
              type="number"
            ></q-input>
          </div>
          <div class="col-2">
            <q-btn
              color="primary"
              outline
              size="md"
              icon="fas fa-trash-alt"
              @click="removeMenu(index)"
            />
          </div>
        </div>
        <div class="col-6 text-right">
          <q-btn
            class="full-width"
            color="primary"
            size="md"
            icon="fas fa-plus-circle"
            label="เพิ่มสินค้า"
            unelevated
            @click="addMenu"
          />
        </div>
      </q-step>

      <q-step :name="3" title="สถานที่" icon="fas fa-map-marker-alt">
        <div class="row column items-center">
          <div class="col-12">
            <CircleProfileImage
              :src="model.owner.photoURL"
              @imageSelected="imageProfileSelected"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-input
              v-model="model.owner.firstName"
              bottom-slots
              label="ชื่อ"
            ></q-input>
          </div>
          <div class="col-12 col-sm-6 step">
            <q-input
              v-model="model.owner.lastName"
              bottom-slots
              label="นามสกุล"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              v-model="model.owner.telNo"
              bottom-slots
              label="เบอร์โทรศัพท์"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="text-subtitle2 text-weight-bolder">ที่อยู่</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-input
              bottom-slots
              v-model="model.address.province"
              readonly
              label="จังหวัด"
            ></q-input>
          </div>
          <div class="col-12 col-sm-6 step">
            <q-select
              v-model="model.address.district"
              :options="districtOptions"
              label="อำเภอ"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-select
              v-model="model.address.subDistrict"
              :options="subdistrictOptions"
              label="ตำบล"
            />
          </div>
          <div class="col-12 col-sm-6 step">
            <q-input
              bottom-slots
              v-model="model.address.postalCode"
              label="รหัสไปรษณีย์"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              v-model="model.address.detail"
              autogrow
              label="รายละเอียดที่อยู่"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12"></div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-input
              v-model="model.contact.telNo"
              label="เบอร์โทรศัพท์ติดต่อร้าน"
            />
          </div>
          <div class="col-12 col-sm-6 step">
            <q-input v-model="model.contact.line" label="Line" />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 step">
            <q-input v-model="model.contact.facebook" label="facebook" />
          </div>
          <div class="col-12 col-sm-6 step">
            <q-input v-model="model.contact.others" label="อื่นๆ" />
          </div>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step < 3"
            @click="nextStep(step)"
            color="primary"
            label="ถัดไป"
          />
          <q-btn
            v-if="step === 3"
            icon="fas fa-thumbs-up"
            color="primary"
            @click="saveData()"
            label="บันทึกข้อมูลร้าน"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="secondary"
            @click="$refs.stepper.previous()"
            label="ย้อนกลับ"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import firebaseUploader from "components/FirebaseUploader";
import ImageFilePicker from "../components/ImageFilePicker.vue";
import CircleProfileImage from "../components/account/CircleProfileImage";
import noi from "../statics/noimage.png";
import {
  addNewShop,
  getShopByUser,
  updateShop,
  getCategory,
  getServiceType,
  getPaymentType
} from "../api/api";
import { Dialog } from "quasar";

export default {
  data() {
    return {
      uid: "",
      shopId: "",
      model: {
        shopName: "",
        description: "",
        category: "",
        photoURL: [
          "statics/noimage.png",
          "statics/noimage.png",
          "statics/noimage.png",
          "statics/noimage.png",
          "statics/noimage.png"
        ],
        serviceType: "",
        paymentType: "",
        products: [{ productName: "", price: null }],
        hashtags: [],
        location: {
          type: "Point",
          coordinates: [0, 0]
        },
        telephone: "",
        contact: {
          telNo: "",
          line: "",
          facebook: "",
          others: ""
        },
        address: {
          province: "ภูเก็ต",
          district: "",
          subDistrict: "",
          postalCode: "",
          detail: ""
        },
        owner: {
          firstName: "",
          lastName: "",
          telNo: "",
          photoURL: "statics/noimage.png"
        },
        isAuthorized: false,
        status: "open"
      },
      step: 1,
      districtOptions: ["เมือง", "กะทู้", "ถลาง"],
      categoryOption: [],
      serviceOption: [],
      paymentOption: []
    };
  },
  methods: {
    nextStep(step) {
      if (step == 1 && !this.$refs.shopName.validate()) {
        this.$refs.shopName.focus();
      } else {
        this.$refs.stepper.next();
      }
    },
    imageSelected(base64, index) {
      this.model.photoURL[index] = base64;
    },
    imageProfileSelected(base64) {
      this.model.owner.photoURL = base64;
    },
    locationSeleted(location) {
      this.model.location.coordinates[0] = location.lng;
      this.model.location.coordinates[1] = location.lat;
    },
    getCurrentLocation() {
      this.$geolocation.getCurrentPosition(
        pos => {
          this.model.location.coordinates[0] = pos.coords.longitude;
          this.model.location.coordinates[1] = pos.coords.latitude;
          return pos;
        },
        err => {
          return null;
        }
      );
    },
    addImage(item) {
      this.model.photoURL = item.url;
    },
    addMenu() {
      this.model.products.push({ name: "", price: null });
    },
    removeMenu(index) {
      this.model.products.splice(index, 1);
    },
    saveData() {
      this.$q.loading.show();
      updateShop(this.shopId, this.model)
        .then(response => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "warning",
            position: "bottom",
            message: "บันทึกสำเร็จ",
            icon: "fas fa-check-circle"
          });
          setTimeout(() => this.$router.push({ name: "myshop-list" }), 2000);
        })
        .catch(err => {
          this.$q.loading.hide();
          this.$q.notify({
            color: "warning",
            position: "top",
            message: err.message,
            icon: "report_problem"
          });
        });
    }
  },
  mounted() {
    console.log("model ", typeof this.model.owner.photoURL);

    this.$store.commit("SET_NAV_TITLE", "ร้านของฉัน");

    this.$q.loading.show();
    // Get current user info from firebase
    if (this.$firebase.auth().currentUser !== null) {
      console.log(this.$firebase.auth().currentUser);
      this.model.telephone = this.$firebase.auth().currentUser.phoneNumber;
      this.uid = this.$firebase.auth().currentUser.uid;
    }

    // Check if the shop is exist for this user
    getShopByUser(this.uid)
      .then(response => {
        console.log(response);
        this.$q.loading.hide();
        // Already opened a shop
        if (response.data.length > 0) {
          if (response.data[0].owner === this.uid) {
            this.shopId = response.data[0]._id;
            this.model = response.data[0];
          }
        }
        // First time visit
        else {
          // Set initial values
          this.model.owner = this.uid;
          this.getCurrentLocation();

          // Add new shop to db with initial value
          addNewShop(this.model)
            .then(response => {
              console.log(response);
              this.shopId = response.data._id;
            })
            .catch(err => {
              this.$q.loading.hide();
              this.$q.notify({
                color: "primary",
                position: "top",
                message: err.message,
                icon: "report_problem"
              });
            });
        }
      })
      .catch(err => {
        this.$q.loading.hide();
        this.$q.notify({
          color: "primary",
          position: "top",
          message: err.message,
          icon: "report_problem"
        });
      });

    //getCategory
    let categoryOption = getCategory();
    this.categoryOption = categoryOption.map(x => x.name);

    //getSeviceType
    let service = getServiceType();
    this.serviceOption = service.map(x => x.name);

    //getPaymentType
    let paymentType = getPaymentType();
    this.paymentOption = paymentType.map(x => x.name);
  },
  computed: {
    subdistrictOptions() {
      let output = [];
      if (this.model.address.district === "กะทู้")
        output = ["กมลา", "กะทู้", "ป่าตอง"];
      if (this.model.address.district === "เมือง")
        output = [
          "กะรน",
          "ฉลอง",
          "ตลาดเหนือ",
          "ตลาดใหญ่",
          "รัษฎา",
          "ราไวย์",
          "วิชิต"
        ];
      if (this.model.address.district === "ถลาง")
        output = [
          "เกาะแก้ว",
          "ป่าคลอก",
          "ศรีสุนทร",
          "สาคู",
          "เชิงทะเล",
          "เทพกระษัตรี"
        ];
      return output;
    }
  },
  components: {
    firebaseUploader,
    ImageFilePicker,
    CircleProfileImage
  }
};
</script>

<style>
q-input {
  font-size: 18px;
}
.my-content {
  padding: 5px;
}

.q-stepper--horizontal .q-stepper__step-inner {
  padding: 15px;
}
.step {
  padding: 3px;
}
.imgOwner {
  width: 250px;
  height: 350px;
}
</style>
