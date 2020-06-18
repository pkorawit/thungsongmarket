<template>
  <div>
    <div v-if="loading" class="window-height window-width row justify-center items-center bg-white">
      <div class="row" style="margin-top: 50px">
        <div class="col-12 text-center">
          <q-img src="~assets/logo.png" style="width: 250px"></q-img>
        </div>
        <div class="col-12 text-center">
          <q-spinner-dots color="secondary" size="5em" />
          <q-tooltip :offset="[0, 8]">Loading</q-tooltip>
        </div>        
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <div class="text-h6">สนับสนุนโดย</div>
        </div>
        <div class="col-4 text-center q-pa-sm">
          <q-img src="~assets/spon1.jpg" style="width: 80px"></q-img>
        </div>
        <div class="col-4 text-center q-pa-sm">
          <q-img src="~assets/spon4.jpg" style="width: 70px"></q-img>
        </div>
        <div class="col-4 text-center q-pa-sm">
          <q-img src="~assets/spon2.jpg" style="width: 80px"></q-img>
        </div>
        <div class="col-6 text-center q-pa-sm">
          <q-img src="~assets/spon5.jpg" style="width: 80px"></q-img>
        </div>
        <div class="col-6 text-center q-pa-sm">
          <q-img src="~assets/spon3.jpg" style="width: 150px"></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      errorStr: "",
      gettingLocation: false,
      location: null
    };
  },
  async mounted() {
    if (this.$firebase.auth().currentUser !== null) {
      console.log(this.$firebase.auth().currentUser);
      if (!this.$firebase.auth().currentUser.phoneNumber) {
        //Invalid user (not have phoneNumber) force signout
        console.log("Invalid user");
        await this.$firebase.auth().signOut();
      }
    }

    setTimeout(() => {
      this.$router.push({ name: "shop" });
    }, 2000);

    //do we support geolocation
    // if (!("geolocation" in navigator)) {
    //   this.errorStr = "Geolocation is not available.";
    //   return;
    // }
    // this.gettingLocation = true;
    // this.$geolocation.getCurrentPosition(
    //   pos => {
    //     this.gettingLocation = false;
    //     this.location = pos;
    //     setTimeout(() => {
    //       this.$router.push({ name: "shop" });
    //     }, 2000);
    //   },
    //   err => {
    //     this.gettingLocation = false;
    //     this.errorStr = err.message;
    //     setTimeout(() => {
    //       this.$router.push({ name: "shop" });
    //     }, 2000);
    //   }
    // );
    // setTimeout(() => {
    //   this.loading = false;
    //   this.$router.push('main/home')
    // }, 3000);
  }
};
</script>

<style>
</style>