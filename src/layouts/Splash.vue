<template>
  <div>
    <div v-if="loading" class="window-height window-width row justify-center items-center bg-white">
      <div class="column" style="height: 350px">
        <div class="col-8">
          <q-img src="~assets/logo.png" style="width: 250px"></q-img>
        </div>
        <div class="col-2 justify-center text-center">
          <q-spinner-dots color="secondary" size="5em" />
          <q-tooltip :offset="[0, 8]">Loading</q-tooltip>
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