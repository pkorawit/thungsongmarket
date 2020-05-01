<template>
  <div id="q-app">
    <!-- <transition
      leave-active-class="animated slideOutLeft"
      enter-active-class="animated slideInRight"
    >
    <keep-alive>-->
    <router-view />
    <!-- </keep-alive>
    </transition>-->
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>