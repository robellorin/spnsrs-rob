<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-large-size-33 md-size-25"
      v-for="banner in sortedBanners"
      :key="banner.id"
    >
      <product-card header-animation="false">
        <img class="img header-image" slot="imageHeader" :src="banner.image" />
        <h4 slot="title" class="title">
          {{ banner.title }}
        </h4>
        <div slot="description" class="card-description">
          {{ banner.description }}
        </div>
        <template slot="footer">
          <div
            class="md-layout-item md-small-size-100 md-size-33"
          >
            <md-switch v-model="banner.active" @change="updateStatus($event, banner.id)">Active</md-switch>
          </div>
          
          <md-menu md-direction="top-start" md-close-on-click class="md-menu">
            <md-button
              md-menu-trigger
              class="md-round md-just-icon md-icon-button md-primary"
            >
              <i class="material-icons text_align-center"
                >more_vert</i
              >
            </md-button>

            <md-menu-content  class="md-menu">
              <!-- <md-ripple> -->
                <md-menu-item @click="editBanner(banner.id)">
                  <div>Edit</div>
                  <md-icon>edit</md-icon>
                </md-menu-item>
              <!-- </md-ripple> -->
              <!-- <md-ripple> -->
                <md-menu-item @click="removeBanner( $event, banner.id)">
                  <div>Delete</div>
                  <md-icon>delete</md-icon>
                </md-menu-item>
              <!-- </md-ripple> -->
                <md-menu-item @click="shareBanner( $event, banner.id)">
                  <div>Share</div>
                  <md-icon>share</md-icon>
                </md-menu-item>
            </md-menu-content>
          </md-menu>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
import firebaseUtilFuncs, { firebaseDB } from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";
import { ProductCard } from "@/components";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      
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
    ...mapGetters({
      authUser: "auth/getAuthUser",
      banners: "banners/getBanners",
      editableBanner: "banners/getEditableBanner"
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
  },
  methods: {
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
    shareBanner(id) {
      alert('Share this banner')
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
    updateStatus(e,id){
      firebaseDB.collection('banners').doc(id).update({active: e});
      this.notifyVue(`Banner status is ${e ? 'active' : 'inactive'}`);
    }
  }
};
</script>

<style lang="scss" scoped>
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