import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import auth from "./auth";
import banners from "./banners";

Vue.use(Vuex);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const Store = new Vuex.Store({
  modules: {
    auth,
    banners
  },
});

export default Store;
