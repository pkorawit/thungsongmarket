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
              clearable
              filled
              class="code"
              color="black"
              bg-color="white"
              v-model="confirmCode"
              label="รหัสผ่านจาก SMS"
              ref="code"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-sms" />
              </template>
            </q-input>
          </div>
          <div class="col-4 text-center q-mt-sm">
            <q-btn
              class="full-width"
              color="secondary"
              @click="signInWithAuthCode"
              icon="fas fa-sign-in-alt"
              label="ล็อกอิน"
              size="md"
            />
          </div>
          <div class="col-4 text-center q-mt-sm">
            <div id="recaptcha-container" class="text-center"></div>
          </div>
          <div class="col-4 text-center q-mt-xl">
            <q-btn to="signin" icon="fas fa-undo-alt" label="ย้อนกลับ" outline color="white" />
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script>
import { getUserById, addNewUser } from "../api/api";
export default {
  data() {
    return {
      confirmCode: "",
      user: {
        uid: "",
        firstname: "",
        lastname: "",
        telephone: "",
        gender: "",
        photoURL: "",
        email: ""
      }
    };
  },
  methods: {
    signInWithAuthCode() {
      var code = this.confirmCode;
      window.confirmationResult
        .confirm(code)
        .then(result => {
          let user = result.user;
          // Check for existing user data collection
          getUserById(user.uid).then(response => {
            const userData = response.data;  
            // If not exist, create new empty user
            if (!userData) {
              this.user.uid = user.uid;
              this.user.telephone = user.phoneNumber;
              
              addNewUser(this.user).then(response => {
                this.$router.push({ path: this.$route.params.nextUrl });
              });
            } else {
              this.$router.push({ path: this.$route.params.nextUrl });
            }
          });
        })
        .catch(error => {
          let errorMessage = error.message;
          if(error.code == 'auth/invalid-verification-code'){
            this.confirmCode = "";
            this.$refs.code.focus();
            errorMessage = 'รหัสผ่านจาก SMS ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง'
          }
          this.$q.notify({
            color: "warning",
            position: "bottom",
            message: errorMessage,
            icon: "fas fa-check-circle"
          });
        });
    }
  }
};
</script>

<style>
</style>