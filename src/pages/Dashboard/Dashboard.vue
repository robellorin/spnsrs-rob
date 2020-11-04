<template>
  <div class="md-layout">
    <div class="md-layout-item md-group md-size-100">
      <md-button class="md-round md-success" @click="bannerTypesButtonClick('all')" :class="{activeBtn: activeBtn=='all'}">All Banners</md-button>
      <md-button class="md-round md-success" @click="bannerTypesButtonClick('my')" :class="{activeBtn: activeBtn=='my'}">My Banners</md-button>
      <md-button class="md-round md-success" @click="bannerTypesButtonClick('shared')" :class="{activeBtn: activeBtn=='shared'}">Shared Banners</md-button>
    </div>
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-large-size-33 md-size-25"
      v-for="banner in sortedBanners"
      v-show="activeBtn=='my' || activeBtn=='all'"
      :key="banner.id"
    >
      <dashboard-card 
        :banner="banner" 
        :updateStatus="updateStatus" 
        :editBanner="editBanner"
        :removeBanner="removeBanner"
        :shareBannerClick="shareBannerClick"
        :shared="false"
      >
      </dashboard-card>
    </div>
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-large-size-33 md-size-25"
      v-for="banner in sortedSharedBanners"
      v-show="activeBtn=='shared' || activeBtn=='all'"
      :key="banner.id"
    >
      <dashboard-card 
        :banner="banner" 
        :updateStatus="updateStatus" 
        :editBanner="editBanner"
        :removeBanner="removeBanner"
        :shareBannerClick="shareBannerClick"
        :shared="true"
      >
      </dashboard-card>
    </div>
    <modal v-if="showDialog" @close="showDialog = false">
      <template slot="body">
        <banner-users :banner="shareBanner"/>
      </template>
      <template slot="footer">
        <md-button class="md-primary md-round" @click="closeMdal">Close</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import firebaseUtilFuncs, { firebaseDB } from "@/utils/firebase/firebaseUtil.js";
import BannerUsersTable from "./Components/BannerUsersTable.vue";
import DashboardCard from "./Components/DashboardCard.vue";
import {Modal} from "@/components";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

export default {
  components: {
    DashboardCard,
    Modal,
    'banner-users': BannerUsersTable,
  },
  data() {
    return {
      shareBanner: null,
      showDialog: false,
      activeBtn: 'all',
    };
  },
  computed: {
    sortedBanners: function() {
      function priority(a, b) {
        if (a.priority == "Low") return 1;
        if (a.priority == "High") return -1;
        if (b.priority == "Low") return -1;
        if (b.priority == "High") return 1;
        return 0;
      }

      return this.banners.slice().sort(priority);
    },
    sortedSharedBanners: function() {
      function priority(a, b) {
        if (a.priority == "Low") return 1;
        if (a.priority == "High") return -1;
        if (b.priority == "Low") return -1;
        if (b.priority == "High") return 1;
        return 0;
      }

      return this.sharedBanners.slice().sort(priority);
    },
    ...mapGetters({
      authUser: "auth/getAuthUser",
      banners: "banners/getBanners",
      sharedBanners: "banners/getSharedBanners",
      editableBanner: "banners/getEditableBanner"
    }),
  },
  methods: {
    bannerTypesButtonClick(type) {
      this.activeBtn = type;
      if (type==='my') {

      }
    },
    notifyVue(message) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        timeout: 2500,
        message: message,
        icon: "add_alert",
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      });
    },
    editBanner(id) {
      const selectedBanner = this.banners.find((banner => banner.id == id));
      this.$store.commit('banners/setEditableBanner', selectedBanner);
    },
    shareBannerClick(banner) {
      this.shareBanner = banner;
      this.showDialog = true;
    },
    removeBanner(e, id) {
        Swal.fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-danger",
          cancelButtonClass: "md-button md-success",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            firebaseUtilFuncs.deleteData('banners', id).then(()=> {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                type: "success",
                confirmButtonClass: "md-button md-success",
                buttonsStyling: false
              });

             this.$store.commit('banners/removeBanner', id);
            })
          }
        });
    },
    updateStatus(e, type, id){
      if (type=='active') {
        firebaseDB.collection('banners').doc(id).update({active: e});
        this.notifyVue(`Banner status is ${e ? 'active' : 'inactive'}`);
      } else if (type=='published') {
        firebaseDB.collection('banners').doc(id).update({published: e});
        this.notifyVue(`Banner is ${e ? 'published' : 'not published'}`);
      }
    },
    closeMdal() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .activeBtn, .md-button.md-success:focus {
    background-color: rgb(26, 87, 41)!important;
  }
  .md-button.md-success:hover, .md-button.md-success:active{
    background-color: rgb(22, 119, 46)!important;
  }
  .md-switch {
    display: flex;
  }

  .header-image {
    height: 250px;
    object-fit: cover;

    @media screen and (min-width: 1400px) {
      min-height: 350px;
    }
  }

  .md-menu {
    overflow: hidden;
  }
</style>