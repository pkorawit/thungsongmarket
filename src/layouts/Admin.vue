<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary shadow-3">
      <q-toolbar>
        <q-toolbar-title>
            <q-avatar rounded>
              <q-img src="~assets/logo.png" />
            </q-avatar> ระบบจัดการ
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert">
            <q-menu>
          <q-list style="min-width: 200px">
            <q-item clickable v-close-popup>
              <q-item-section>หน้าแรก</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>รายชื่อร้านค้า</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>ออกจากระบบ</q-item-section>
            </q-item>            
          </q-list>
        </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition
        name="custom-classes-transition"
        :enter-active-class="enterTransition"
        :leave-active-class="leaveTransition"
        :duration="{ enter: 200, leave: 150 }"
      >
        <router-view />
      </transition>
    </q-page-container>
    <q-footer></q-footer>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      leaveTransition: "animated slideOutLeft",
      enterTransition: "animated slideInRight"
    };
  },
};
</script>

<style>
</style>