// =========================================================
// * Vue Material Dashboard PRO - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
import routes from "./routes/routes";
import store from "./store";

import firebase from "@/utils/firebase/firebaseInit.js";

// plugin setup
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("isLoggedIn", true);
  } else {
    localStorage.setItem("isLoggedIn", false);
  }
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    if (to.name === "Login" || to.name == "Register") {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    if (to.name === "Login" || to.name == "Register") {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});

// global library setup
Vue.prototype.$Chartist = Chartist;
Vue.prototype.$firebaseGlob = firebase;
Vue.prototype.$firebaseGlobDB = firebase.firestore();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
