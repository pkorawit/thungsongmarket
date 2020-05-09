<template>
  <q-page>
    <div class="q-pa-md row">
      <div class="col"></div>
      <q-card class="my-card col-12 col-md-4">
        <q-card-section class="text-center">Log in to you Admin</q-card-section>
        <div class="col-3">
          <q-input filled v-model="email" type="email" suffix="@gmail.com" >
            <template v-slot:before>
              <q-icon name="mail" />
            </template>
          </q-input>
        </div>
        <br />
      </q-card>
      <div class="col"></div>
    </div>
  </q-page>
</template>


<script>
export default {

}
</script>

<style>

</style>