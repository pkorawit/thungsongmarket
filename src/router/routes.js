const routes = [
  {
    path: "/redirect/:id",
    name: "redirect",
    component: () => import("layouts/Redirect.vue")
  },
  {
    path: "/",
    name: "root",
    component: () => import("layouts/Splash.vue")
  },
  {
    path: "/landing",
    name: "landing",
    component: () => import("pages/Landing.vue")
  },
  {
    // Auth Routes
    path: "/auth",
    name: "auth",
    component: () => import("layouts/Authen.vue"),
    meta: { authRequired: false },
    children: [
      {
        path: "signin",
        name: "signin",
        component: () => import("pages/SignIn.vue")
      },
      {
        path: "confirmcode",
        name: "confirmcode",
        component: () => import("pages/ConfirmCode.vue")
      }
    ]
  },
  {
    // Auth Routes
    path: "/admin",
    name: "admin",
    component: () => import("layouts/Admin.vue"),
    children: [
      {
        path: "",
        name: "adminsignin",
        component: () => import("pages/admin/SignIn.vue"),
        meta: { authRequired: false }
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/admin/Dashboard.vue"),
        meta: { authRequired: false }
      },
      {
        path: "shoplist",
        name: "shoplist",
        component: () => import("pages/admin/ShopList.vue"),
        meta: { authRequired: false }
      },
      {
        path: "shop/:id",
        name: "shopinfoAdmin",
        component: () => import("pages/ShopInfo.vue"),
        meta: { authRequired: false }
      }
    ]
  },
  {
    path: "/main",
    name: "main",
    component: () => import("layouts/MainLayout.vue"),
    meta: { authRequired: false },
    children: [
      { path: "shop", name: "shop", component: () => import("pages/Shop.vue") },
      {
        path: "myshop",
        name: "myshop",
        component: () => import("pages/MyShop.vue"),
        meta: { authRequired: true }
      },
      { path: "map", name: "map", component: () => import("pages/Map.vue") },
      {
        path: "about",
        name: "about",
        component: () => import("pages/About.vue")
      },
      {
        path: "category",
        name: "category",
        component: () => import("pages/Category.vue")
      },
      {
        path: "account",
        name: "account",
        component: () => import("pages/ShopsOfUser.vue")
      },
      {
        path: "shop/:id",
        name: "shopinfo",
        component: () => import("pages/ShopInfo.vue")
      },
      {
        path: "myshop-list",
        name: "myshop-list",
        component: () => import("pages/ShopsOfUser.vue"),
        meta: { authRequired: true }
      },
      {
        path: "category/:id",
        name: "categoryById",
        component: () => import("pages/CategoryById.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
