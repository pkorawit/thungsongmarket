<template>
  <div id="q-info">
    <q-skeleton height="250px" />
    <div class="q-pa-md">
      <div class="text-center" style="font-size:30px;">
        <q-skeleton type="text" />
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <q-skeleton type="text" />
        </div>
      </div>
      <div style="font-size:16px">
        <p>
          <q-skeleton type="text" />
        </p>
      </div>

      <hr />
      <div class="text-center" style="font-size:20px">
        <q-skeleton type="text" />
      </div>
      <q-list v-for="index in 4" :key="index">
        <q-item class="row ManuFoods">
          <q-item-section>
            <q-item-label style="font-size:16px">
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>

          <q-item-section side top class="text-right">
            <q-item-label style="font-size:16px"></q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset></q-separator>
      </q-list>

      <hr />
      <!-- location -->

      <div class="row" style>
        <div class="col-2">
          <!-- ดลิกเลือกรู้แล้วไปหน้า map -->
          <q-skeleton type="text" />
        </div>
        <div class="col-10" style="font-size:18px; margin-top: 16px;">
          <p>
            <q-skeleton type="text" />
          </p>
        </div>
      </div>

      <q-separator spaced inset></q-separator>

      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar rounded>
              <q-skeleton type="text" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="font-size:20px;">
            <q-skeleton type="text" />
          </q-item-section>
        </q-item>
      </q-list>
      <div style="font-size:18px;">
        <p>
          <q-skeleton type="text" />
        </p>
      </div>

      <q-separator spaced inset></q-separator>

      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar rounded>
              <q-skeleton type="text" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="font-size:20px">
            <q-skeleton type="text" />
          </q-item-section>
        </q-item>
      </q-list>
      <div style="font-size:18px">
        <p>
          <q-skeleton type="text" />
        </p>
      </div>

      <hr />
      <!-- contact -->
      <div class="text-center" style="font-size:20px">
        <q-skeleton type="text" />
      </div>
      <div style="font-size:16px">
        <p>
          <q-skeleton type="text" />
        </p>
      </div>
      <!-- end contact -->
    </div>
    <!-- end -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>