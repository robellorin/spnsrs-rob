<template>
  <div class="wrapper" :class="[{ 'nav-open': $sidebar.showSidebar }]">
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item
          :link="{ name: 'Dashboard', icon: 'dashboard', path: '/dashboard' }"
        >
        </sidebar-item>
        <sidebar-item
            :link="{ name: 'My Profile', icon: 'image', path: '/profile/myprofile' }"
        ></sidebar-item>
        <!-- <sidebar-item
            :link="{ name: 'Buttons', path: '/components/buttons' }"
          ></sidebar-item>
        <sidebar-item
          :link="{ name: 'Icons', path: '/components/icons' }"
        ></sidebar-item>
        <sidebar-item
          :link="{ name: 'Typography', path: '/components/typography' }"
        ></sidebar-item>
        <sidebar-item :link="{ name: 'Pages', icon: 'image' }">
          <sidebar-item
            :link="{ name: 'Login', path: '/login' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Register', path: '/register' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Pricing', path: '/pricing' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Timeline', path: '/pages/timeline' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Lock Screen', path: '/lock' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'User Profile', path: '/profile/editprofile' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Components', icon: 'apps' }">
          <sidebar-item
            :link="{ name: 'Buttons', path: '/components/buttons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Grid System', path: '/components/grid-system' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Panels', path: '/components/panels' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Sweet Alert', path: '/components/sweet-alert' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Notifications', path: '/components/notifications' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Icons', path: '/components/icons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Typography', path: '/components/typography' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Forms', icon: 'content_paste' }">
          <sidebar-item
            :link="{ name: 'Regular Forms', path: '/forms/regular' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Extended Forms', path: '/forms/extended' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Validation Forms', path: '/forms/validation' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Wizard', path: '/forms/wizard' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Tables', icon: 'grid_on' }">
          <sidebar-item
            :link="{ name: 'Regular Tables', path: '/table-list/regular' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Extended Tables', path: '/table-list/extended' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Paginated Tables', path: '/table-list/paginated' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: 'Maps', icon: 'place' }">
          <sidebar-item
            :link="{ name: 'Google Maps', path: '/maps/google' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Full Screen Maps', path: '/maps/full-screen' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Vector Maps', path: '/maps/vector-map' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Widgets', icon: 'widgets', path: '/widgets' }"
        ></sidebar-item>
        <sidebar-item
          :link="{ name: 'Charts', icon: 'timeline', path: '/charts' }"
        ></sidebar-item>
        <sidebar-item
          :link="{ name: 'Calendar', icon: 'date_range', path: '/calendar' }"
        ></sidebar-item> -->
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :colorBg.sync="sidebarBackgroundColor"
        :sidebarMini.sync="sidebarMini"
        :sidebarImg.sync="sidebarImg"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <fixed-add-banner></fixed-add-banner>
      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import firebaseUtilFuncs, { firebaseDB } from "@/utils/firebase/firebaseUtil.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import FixedPlugin from "../../FixedPlugin.vue";
import FixedAddBanner from "../../FixedAddBanner.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
import { mapGetters } from "vuex";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    FixedPlugin,
    FixedAddBanner,
    MobileMenu,
    UserMenu,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  },
  computed: {
    ...mapGetters({
      authUser: "auth/getAuthUser",
      banners: "banners/getBanners",
    }),
  },
  async created() {
      const banners = await firebaseDB
      .collection("banners")
      .where("userId", "==", this.authUser.id)
      .get()
      .then((querySnapshot) => {
        let updatedBanners = [];
        querySnapshot.forEach((doc) => {
          updatedBanners.push({ id: doc.id, ...doc.data() });
        });
        return updatedBanners;
      });
      this.$store.commit('banners/setBanners', banners);

      const sharedBanners = await firebaseDB
      .collection("shares")
      .where("influencerId", "==", this.authUser.id)
      .get()
      .then(async (snapshot1) => {
        let bannerIdList = [];
        snapshot1.forEach((doc) => {
          bannerIdList.push(doc.data().bannerId);
        });
        let sharedBannersList = [];
        if (bannerIdList.length==0) {
          return sharedBannersList;
        }
        sharedBannersList = await firebaseDB
        .collection("banners")
        .where("id", "in", bannerIdList)
        .where("published", "==", true)
        .get()
        .then((snapshot2) => {
          let internalBanners = [];
          snapshot2.forEach((doc) => {
            internalBanners.push({ id: doc.id, ...doc.data() });
          });
          return internalBanners;
        });
        return sharedBannersList;
      });
      this.$store.commit('banners/setSharedBanners', sharedBanners);
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
