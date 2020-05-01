<template>
  <q-page>
    <div v-if="$currentUser">
      <div class="row bg-primary window-width account-header q-pa-md">
        <div class="col-xs-12 text-center">
          <circle-profile-image :src="model.photoURL" @imageSelected="imageSelected" />
        </div>
        <div class="col-xs-8 offset-xs-2 text-center">
          <q-input dark v-model="model.name" type="text" label="ชื่อ-สกุล" ref="name">
            <template v-slot:append>
              <q-icon name="edit" @click="focusTo('name')" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 window-width">
          <q-input
            filled
            square
            v-model="model.phone"
            type="text"
            label="เบอร์โทรศัพท์"
            ref="phone"
          >
            <template v-slot:append>
              <q-icon name="edit" @click="focusTo('phone')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 window-width">
          <q-input filled square v-model="model.email" type="text" label="อีเมล์" ref="email">
            <template v-slot:append>
              <q-icon name="edit" @click="focusTo('email')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 window-width">
          <q-select
            filled
            square
            v-model="model.gender"
            :options="genderOptions"
            label="เพศ"
            ref="gender"
          />
        </div>
        <div class="col-xs-12 window-width">
          <q-list separator>
            <q-item
              clickable
              v-ripple
              style="background: rgba(0, 0, 0, 0.05); padding-left: 12px; padding-right: 12px;"
              @click="toMyshopList"
            >
              <q-item-section class="q-ml-none">
                <q-item-label>ร้านของฉัน</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>
                  <q-icon name="arrow_right" size="sm" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-xs-12 window-width">
          <q-btn
            color="green"
            icon="save"
            label="บันทึก"
            size="md"
            @click="save"
            class="full-width no-border-radius"
            :loading="saving"
          />
        </div>
      </div>
    </div>
    <div v-if="!$currentUser" class="absolute-center full-width q-px-md shop-notice">
      <q-icon
        name="fas fa-store"
        color="primary"
        size="128px"
        class="q-mb-md"
        style="opacity: 0.3"
      />
      <q-btn
        color="primary"
        label="ต้องเปิดร้านก่อนนะคะ กดตรงนี้เปิดร้านกันเลย"
        @click="toMyshop"
        size="md"
        class="full-width animated tada"
        style="animation-duration: 2s;"
      />
    </div>
  </q-page>
</template>

<script>
import CircleProfileImage from "../components/account/CircleProfileImage.vue";
import EditAddress from "../components/account/EditAddress.vue";

export default {
  components: {
    CircleProfileImage
  },
  data() {
    return {
      model: {
        name: "Chittiphong Lasunon",
        phone: "0823722103",
        gender: "male",
        email: "sminko1599@gmail.com",
        photoURL:
          "https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/s960x960/87818689_2563709987072755_3318153898799136768_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_eui2=AeF7x93Efq5ZdoV0fuTTDfpd8zwlr0RJ7CPzPCWvREnsI5pB3FcyZD1ahBUBz5_kzYiWdzAJxvYQetUj1ZzN9BYJ&_nc_oc=AQlq68r50Odke4S8uVrWtzLHFDK6sV5ElvPQKL-kNCune1j9wBmOAZbR4jVSnI7DBKo&_nc_ht=scontent.fbkk5-1.fna&_nc_tp=7&oh=f030730cf1b98b7d2371b55d35200fff&oe=5EB32F29"
      },
      genderOptions: [
        { label: "ชาย", value: "male" },
        { label: "หญิง", value: "female" },
        { label: "ไม่ระบุ", value: "etc" }
      ],
      saving: false
    };
  },
  methods: {
    focusTo(ref) {
      this.$refs[ref].focus();
    },
    imageSelected(base64) {},
    save() {
      this.saving = true;
      setTimeout(() => {
        this.saving = false;
        this.$q.notify({
          type: "positive",
          position: "top",
          message: "บันทึกสำเร็จ",
          color: "green"
        });
      }, 2000);
    },
    toMyshopList() {
      this.$router.push({
        name: "myshop-list",
        query: { id: this.$currentUser.uid }
      });
    },
    toMyshop() {
      this.$router.push({ path: "myshop" });
    }
  },
  computed: {
    gender() {
      return this.genderOptions.map(g => {
        if (g.value === this.model.gender) {
          return g.label;
        }
      })[0];
    }
  },
  mounted() {
    this.model.gender = this.gender;
  }
};
</script>

<style>
.shop-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>