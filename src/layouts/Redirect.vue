<template>
  <div>
    <div v-if="loading" class="window-height window-width row justify-center items-center bg-white">
        <div class="col-2 justify-center text-center">
          <q-spinner-dots color="secondary" size="5em" />
          <q-tooltip :offset="[0, 8]">Loading</q-tooltip>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,      
    };
  },
  async mounted() {

    const shopId = this.$route.params.id;
    console.log(shopId);

    if (typeof shopId == "string") {
      this.$router.push({ name: "shopinfo", params: { id: shopId } });
    }
    else{
        this.$router.push({ name: "shop" });
    }

  }
};
</script>

<style>
</style>