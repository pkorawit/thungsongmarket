<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary shadow-3">
      <q-toolbar>
        <q-toolbar-title>
          <div v-if="isTopLevel">
            <q-avatar rounded>
              <q-img src="~assets/logo.png" />
            </q-avatar> ระบบจัดการหลาดชุมทางทุ่งสง
          </div>
          <div v-if="!isTopLevel">
            <q-btn flat icon="arrow_left" @click="back" size="lg" dense>{{ title }}</q-btn>
          </div>
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" v-if="!hideMenu">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section @click="dashboard">หน้าแรก</q-item-section>
                <q-icon name="fas fa-angle-right" class="icon" />
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="shopList">รายชื่อร้านค้า</q-item-section>
                <q-icon name="fas fa-angle-right" class="icon" />
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">ออกจากระบบ</q-item-section>
                <q-icon name="fas fa-sign-out-alt" class="icon" />
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
  methods: {
    pushStack(route) {
      this.$store.commit("PUSH_STACK", route);
    },
    clearStack() {
      this.$store.commit("CLEAR_STACK");
    },
    dashboard() {
      this.$router.push({ name: "dashboard" });
    },
    back() {
      this.$router.back();
    },
    shopList() {
      this.$router.push({ name: "shoplist" });
    },
    logout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "adminsignin" });
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.mainLayout.navTitle;
      }
    },
    isTopLevel: {
      get() {
        return this.$store.state.mainLayout.isTopLevel;
      }
    },
    route() {
      return this.$route;
    },
    baseRoutes() {
      return this.$store.state.mainLayout.baseRoutes;
    },
    backTo() {
      return this.$store.getters.backTo;
    },
    currentUser() {
      return this.$currentUser;
    },
    hideMenu() {
      return this.route.name === "adminsignin" ? true : false;
    }
  },
  watch: {
    route: function(to, from) {
      if (this.baseRoutes.includes(to.name)) {
        this.$store.commit("SET_NAV_TITLE", "หลาดชุมทางทุ่งสง");
        this.clearStack();
      } else {
        this.pushStack(from);
      }
    },
    isTopLevel(to) {
      if (!to) {
        this.enterTransition = "animated slideInRight";

        this.leaveTransition = "animated slideOutLeft";
      } else {
        this.enterTransition = "animated slideInLeft";

        this.leaveTransition = "animated slideOutRight";
      }
    }
  }
};
</script>

<style>
.icon {
  font-size: 1rem;
  padding: 15px 20px 0px 0px;
}
</style> 