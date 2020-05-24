<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary shadow-3">
      <q-toolbar>
        <q-toolbar-title>
          <div v-if="isTopLevel">
            <q-avatar rounded>
              <q-img src="~assets/logo.png" />
            </q-avatar>
            หลาดชุมทางทุ่งสง
          </div>
          <div v-if="!isTopLevel">
            <q-btn flat icon="arrow_left" @click="back" size="lg" dense>
              <!-- <q-avatar>
                <q-img src="~assets/logo.png" />
              </q-avatar>-->
              {{ title }}
            </q-btn>
          </div>
        </q-toolbar-title>
        <div v-if="screen != 'xs'" class="q-mx-sm">
          <q-toolbar inset>
            <q-btn
              class="q-ma-sm"
              flat
              label="ร้านค้า"
              name="shop"
              :to="{ name: 'shop' }"
              icon="fas fa-store"
              dense
            />
            <q-btn
              class="q-ma-sm"
              flat
              label="หมวดหมู่"
              name="category"
              :to="{ name: 'category' }"
              icon="fas fa-list-alt"
              dense
            />
            <q-btn
              class="q-ma-sm"
              flat
              label="ร้านของฉัน"
              name="account"
              :to="{ name: 'account' }"
              @click="toAccount"
              icon="fas fa-user-circle"
              dense
            />
            <q-btn
              class="q-ma-sm"
              flat
              label="ติดต่อ"
              name="about"
              :to="{ name: 'about' }"
              icon="fas fa-question-circle"
              dense
            />
          </q-toolbar>
        </div>
        <div v-if="$currentUser && route.name === 'account'">
          <q-btn
            flat
            icon-right="logout"
            label="ออกจากระบบ"
            @click="logout"
            dense
          />
        </div>
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

    <q-footer v-if="screen == 'xs'" class="bg-primary">
      <q-tabs
        no-caps
        active-color="white"
        indicator-color="transparent"
        class="text-grey-10"
        v-model="tab"
        dense
      >
        <q-route-tab
          name="shop"
          :to="{ name: 'shop' }"
          icon="fas fa-store"
          label="ร้านค้า"
        />
        <q-route-tab
          name="category"
          :to="{ name: 'category' }"
          icon="fas fa-list-alt"
          label="หมวดหมู่"
        />
        <!-- <q-route-tab
          name="map"
          :to="{name:'map'}"
          icon="fas fa-map-marked-alt"
          label="ร้านใกล้ฉัน"
        />-->
        <q-route-tab
          name="account"
          :to="{ name: 'account' }"
          @click="toAccount"
          icon="fas fa-user-circle"
          label="ร้านของฉัน"
        />
        <q-route-tab
          name="about"
          :to="{ name: 'about' }"
          icon="fas fa-question-circle"
          label="ติดต่อ"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { Screen } from "quasar";
export default {
  data() {
    return {
      tab: "home",
      leaveTransition: "animated slideOutLeft",
      enterTransition: "animated slideInRight",
      screen: ""
    };
  },
  mounted() {
    this.screen = this.$q.screen.name;
    console.log("screen", this.screen);
  },
  methods: {
    pushStack(route) {
      this.$store.commit("PUSH_STACK", route);
    },
    clearStack() {
      this.$store.commit("CLEAR_STACK");
    },
    back() {
      this.$router.back();
    },
    toAccount() {
      this.$router.push({ name: "account", query: { id: currentUser.uid } });
    },
    logout() {
      this.$auth.signOut();
      this.$router.replace({ name: "shop" });
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
