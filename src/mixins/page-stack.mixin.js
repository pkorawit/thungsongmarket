export const pageStackMixin = {
  methods: {
    setNavTitle(title) {
      this.$store.commit("SET_NAV_TITLE", title);
    }
  }
};
