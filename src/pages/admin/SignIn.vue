<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-center" style="padding: 0px 0px 15px 0px;">หลาดชุมทางทุ่งสง</div>
    <div class="row justify-center">
      <q-card class="my-card col-12 col-md-3" flat>
        <q-card-section class="text-center text-h5">เข้าสู่ระบบ</q-card-section>
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <q-input filled v-model="email" type="email" suffix="@lardchumtang.com" hint="อีเมล์ของผู้ดูแลระบบ">
            </q-input>
          </div>
          <div class="col"></div>
        </div>
        <br />
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <q-input filled v-model="password" :type="isPwd ? 'password' : 'text'" hint="รหัสผ่าน">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col"></div>
        </div>
        <br />

        <div class="col-6 text-center q-ma-md">
          <q-btn @click="openDash" class="full-width" size="lg" label="เข้าสู่ระบบ" type="submit" color="secondary">
            <q-icon
              name="fas fa-angle-right"
              style="font-size: 1.5rem; padding: 0px 0px 0px 25px;"
            />
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isPwd: true
      // admin@lardchumtang.com
      // 123456
    };
  },
  mounted() {},
  methods: {
    openDash() {
      var email = this.email + "@lardchumtang.com";
      var password = this.password;
      // console.log(email);
      // console.log(password);
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      // this.$router.push({ name: "dashboard" });
    }
  }
};
</script>

<style>
input {
  font-size: 18px;
}

.mBot {
  margin-bottom: 50px;
}
.mTom {
  margin-top: 50px;
}
</style>