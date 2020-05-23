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
        <q-btn-toggle
          v-model="open"
          spread
          class="toggle "
          no-caps
          toggle-color="orange"
          color="grey"
          text-color="white"
          toggle-text-color="black"
          :options="[
            { label: 'เปิดร้าน', value: 'open' },
            { label: 'ปิดร้าน', value: 'close' }
          ]"
          @click="OpenStore(open)"
        />

        <div class="row q-mt-sm ">
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
            <div class="col-12">
              <q-select
                filled
                v-model="model.category"
                :options="categoryOption"
                label="ประเภทสินค้า"
              />
            </div>
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
            ส่งแบบไหนบ้าง
            <div class="col-12">
              <q-checkbox
                v-model="model.serviceType"
                v-for="n in serviceOption"
                :key="n"
                :label="n"
                :val="n"
                color="orange"
              />
              <q-checkbox
                v-model="otherServiceType"
                label="อื่นๆ"
                val="อื่นๆ"
                color="orange"
              />
            </div>
            <div class="col-12" v-if="otherServiceType">
              <q-input
                v-model="textServiceType"
                filled
                bottom-slots
                label="อื่นๆ"
              ></q-input>
            </div>
          </div>
          <div class="col-12 col-sm-6 step">
            จ่ายเงินแบบไหนได้บ้าง
            <div class="col-12">
              <q-checkbox
                v-model="model.paymentType"
                v-for="n in paymentOption"
                :key="n"
                :label="n"
                :val="n"
                color="orange"
              />
              <q-checkbox
                v-model="otherPaymentType"
                label="อื่นๆ"
                val="อื่นๆ"
                color="orange"
              />
            </div>
            <div class="col-12" v-if="otherPaymentType">
              <q-input
                v-model="textPaymentType"
                filled
                bottom-slots
                label="อื่นๆ"
              ></q-input>
            </div>
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
            <!-- <q-select
              v-model="model.address.district"
              :options="districtOptions"
              label="อำเภอ"
            /> -->
            <q-input
              bottom-slots
              v-model="model.address.district"
              readonly
              label="อำเภอ"
            ></q-input>
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
          <div class="col-12">
            <div class="text-subtitle2 text-weight-bolder">ติดต่อร้าน</div>
          </div>
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
import {
  addNewShop,
  getShopByUser,
  updateShop,
  getCategory,
  getServiceType,
  getPaymentType
} from "../api/api";
import CircleProfileImage from "../components/account/CircleProfileImage";
import { Dialog } from "quasar";
import { functions } from "firebase";
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
        serviceType: [],
        paymentType: [],
        products: [{ productName: "", price: 0 }],
        location: {
          type: "Point",
          coordinates: [0, 0]
        },
        contact: {
          telno: "",
          line: "",
          facebook: "",
          others: ""
        },
        address: {
          province: "นครศรีธรรมราช",
          district: "ทุ่งสง",
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
        status: ""
      },
      step: 1,
      // districtOptions: ["เมือง", "กะทู้", "ถลาง"],
      categoryOption: [],
      serviceOption: [],
      paymentOption: [],
      textServiceType: "",
      textPaymentType: "",
      otherServiceType: false,
      otherPaymentType: false,
      othersCategory: "",
      textCategory: "",
      open: "open"
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
      if (this.textServiceType != "") {
        this.model.serviceType.push(this.textServiceType);
        this.model.paymentType.push(this.textPaymentType);
      }
      this.model.status = this.open;
      if (this.model.category == "อื่่น ๆ") {
        this.model.category = this.textCategory;
      }
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
      console.log("data", this.model);
    },
    OpenStore(data) {
      this.model.status = data;
    }
  },
  mounted() {
    this.$store.commit("SET_NAV_TITLE", "ร้านของฉัน");
    //getCategory
    let categoryOption = getCategory();
    this.categoryOption = categoryOption.map(x => x.name);
    //getSeviceType
    let service = getServiceType();
    this.serviceOption = service.map(x => x.name);
    this.serviceOption = this.serviceOption.filter(word => word != "อื่่น ๆ");
    //getPaymentType
    let paymentType = getPaymentType();
    this.paymentOption = paymentType.map(x => x.name);
    this.paymentOption = this.paymentOption.filter(word => word != "อื่่น ๆ");
    this.$q.loading.show();
    // Get current user info from firebase
    if (this.$firebase.auth().currentUser !== null) {
      console.log(this.$firebase.auth().currentUser);
      this.model.owner.telNo = this.$firebase.auth().currentUser.phoneNumber;
      this.uid = this.model.owner.telNo;
    }
    // Check if the shop is exist for this user
    getShopByUser(this.uid)
      .then(response => {
        console.log(" getShopByUser response", response);
        this.$q.loading.hide();
        // Already opened a shop
        if (response.data.length > 0) {
          if (response.data[0].owner.telNo === this.uid) {
            this.shopId = response.data[0].id;
            this.model = response.data[0];
            this.model.serviceType = this.model.serviceType.filter(
              word => word != ""
            );
            this.model.paymentType = this.model.paymentType.filter(
              word => word != ""
            );
            //open store?
            if (this.model.status == "") {
              this.open = "open";
            } else {
              this.open = this.model.status;
            }
            //filter and add to checkbok
            let allsevice = this.serviceOption.concat(this.model.serviceType);
            this.serviceOption = allsevice.filter(
              (item, pos) => allsevice.indexOf(item) === pos
            );
            let allpayment = this.paymentOption.concat(this.model.paymentType);
            this.paymentOption = allpayment.filter(
              (item, pos) => allpayment.indexOf(item) === pos
            );
          }
        }
        // First time visit
        else {
          // Set initial values
          this.model.owner.telNo = this.uid;
          this.getCurrentLocation();
          // Add new shop to db with initial value
          console.log(JSON.stringify(this.model));
          addNewShop(this.model)
            .then(response => {
              console.log("addNewShop response", response);
              this.shopId = response.data.id;
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
  },
  computed: {
    subdistrictOptions() {
      let output = [];
      if (this.model.address.district === "ทุ่งสง")
        output = [
          "ปากแพรก",
          "ชะมาย",
          "หนองหงส์",
          "ควนกรด",
          "นาไม้ไผ่",
          "นาหลวงเสน",
          "เขาโร",
          "กะปาง",
          "ที่วัง",
          "น้ำตก",
          "ถ้ำใหญ่",
          "นาโพธิ์",
          "เขาขาว"
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
</style>
