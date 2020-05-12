<template>
  <q-page>
    <div class="q-pa-md row">
      <div class="col"></div>

      <q-card class="my-card col-12 col-md-4">
        <q-card-section class="text-center">Log in to you Admin</q-card-section>

        <!-- <q-form @submit="onSubmit" action="ShopList.vue"> -->
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <q-input filled v-model="email" type="email" suffix="@gmail.com" hint="Email">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>
          <div class="col"></div>
        </div>
        <br />
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <q-input filled v-model="password" :type="isPwd ? 'password' : 'text'" hint="Password">
              <template v-slot:before>
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

        <div class="col-6 text-center">
          <q-btn @click="openDash" label="Submit" type="submit" color="blue-10"></q-btn>
        </div>
        <!-- </q-form> -->
        <br />
        <br />
      </q-card>

      <div class="col"></div>
    </div>
  </q-page>
</template>


<script>
export default {
  data() {
    return {
      isPwd: true
    };
  },
  methods: {
    openDash() {
      console.log("openDash");
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>

<style>
.mBot {
  margin-bottom: 50px;
}
.mTom {
  margin-top: 50px;
}
</style>