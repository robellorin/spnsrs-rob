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
// import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import firebaseUtilFuncs, { firebaseDB } from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";
// import {
//   StatsCard,
//   ChartCard,
//   ProductCard,
//   AnimatedNumber,
//   GlobalSalesCard,
//   GlobalSalesTable
// } from "@/components";
import { ProductCard } from "@/components";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      removeDialog: false,
      activeOptions: ["Active", "Inactive"],
      product1: "./img/card-2.jpg",
      product2: "./img/card-3.jpg",
      product3: "./img/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920,
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
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