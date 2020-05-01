<template>
  <div class="window-width shop-container shadow-3 q-my-sm">
    <div class="shop-avatar-box q-pa-sm">
      <q-skeleton size="200px" square class="full-width" />
    </div>
    <div class="description-box q-pa-sm" v-ripple>
      <div class="description-header text-h5">
        <q-skeleton type="text" class="full-width" />
      </div>
      <div class="description-caption">
        <div>
          <q-skeleton type="text" class="full-width" />
        </div>
      </div>
      <div class="description-caption">
        <div>
          <q-skeleton type="text" class="full-width" />
        </div>
      </div>
      <div class="description-caption">
        <div>
          <q-skeleton type="text" class="full-width" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopListLoadingPlaceholder"
};
</script>

<style>
.shop-container {
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid grey; */
  /* background: rgba(0, 0, 0, 0.03); */
}
.shop-avatar-box {
  display: flex;
  height: 100%;
  width: 100%;
  /* border: 1px solid grey; */
  background: rgba(0, 0, 0, 0.02);
}
.description-box {
  /* border: 1px solid grey; */
  background: rgba(0, 0, 0, 0.02);
}
</style>