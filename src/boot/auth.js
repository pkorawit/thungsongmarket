import Firebase from "firebase/app";
import "firebase/auth";

export default ({ app, router, Vue, store }) => {
  Vue.prototype.$auth = Firebase.auth();

  Firebase.auth().onAuthStateChanged(user => {
    Vue.prototype.$currentUser = null;
  });
  router.beforeEach((to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    let authRequired = to.matched.some(route => route.meta.authRequired);
    let isAuthenticated = false;
    Vue.prototype.$currentUser = null;
    if (Firebase.auth().currentUser !== null) {
      isAuthenticated = true;
      Vue.prototype.$currentUser = Firebase.auth().currentUser;
    }

    if (authRequired) {
      if (isAuthenticated) {
        // User is already signed in. Continue on.
        console.log("isAuthenticated");
        next();
      } else {
        // Not signed in. Redirect to login page.
        next({
          name: "signin",
          params: { nextUrl: to.fullPath }
        });
      }
    } else {
      // Doesn't require authentication. Just continue on.
      next();
    }
  });
};
