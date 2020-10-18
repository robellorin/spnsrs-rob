import Vuex from "vuex";
import "es6-promise/auto";
import auth from "./auth";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    }
  });

  return Store;
}
