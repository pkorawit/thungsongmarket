<template>
  <q-layout view="hHh lpR fFf">
    <div>
      <div class="window-height window-width row justify-center items-center bg-primary">
        <div class="column q-pa-md">
          <div class="col-4 justify-center text-center">
            <q-img src="~assets/logo.png" style="width: 150px"></q-img>
          </div>
          <div class="col-2 text-center">
            <h6 class="text-white">มาร่วมเป็นครอบครัวเดียวกับเรา</h6>
          </div>
          <div class="col-2 justify-center text-center">
            <q-input
              ref="input"
              clearable
              filled
              class="code"
              color="black"
              bg-color="white"
              v-model="telno"
              label="เบอร์โทรศัพท์"
              :rules="[val => !!val || 'ใส่เบอร์โทรศัพท์ด้วยครับ']"
            >
              <template v-slot:prepend>
                <q-img src="~assets/thailand-flag-square-icon-32.png" style="width: 28px"></q-img>
              </template>
            </q-input>
          </div>
          <div class="col-4 text-center q-mt-sm">
            <q-btn
              class="full-width"
              color="secondary"
              @click="sendVerifyCode"
              icon="fas fa-sms"
              label="ขอรหัสผ่าน"
            />
          </div>
          <div class="col-4 text-center q-mt-sm">
            <div id="recaptcha-container" class="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      telno: "",
      capchaVerified: false
    };
  },
  methods: {
    sendVerifyCode() {
      console.log("sendVerifyCode");
      this.submitPhoneNumberAuth();
    },
    submitPhoneNumberAuth() {
      var phoneNumber = "+66" + this.telno;
      var appVerifier = window.recaptchaVerifier;
      this.$firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          this.capchaVerified = true;
          window.confirmationResult = confirmationResult;
          this.$router.push({
            name: "confirmcode",
            params: { nextUrl: this.$route.params.nextUrl }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    window.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: response => {
          console.log("submitPhoneNumberAuth");
          this.submitPhoneNumberAuth();
        }
      }
    );
  }
};
</script>

<style>
.code {
  font-size: 18px;
}
</style>