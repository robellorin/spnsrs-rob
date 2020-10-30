<template>
  <ValidationObserver ref="form">
      <md-card class="md-card-profile">
          <md-card-header
            class="md-card-header-icon"
            :class="getClass(headerColor)"
          >
            <div class="md-card-banner">
              <div v-if="publicuser.banner">
                <img :src="publicuser.banner" alt="banner image" />
              </div>
              <div v-else>
                <img
                  src="https://source.unsplash.com/1600x350/?nature,water"
                  alt="banner image"
                />
              </div>
            </div>
            <div class="md-card-avatar">
              <div class="picture">
                <div v-if="publicuser.image">
                  <img :src="publicuser.image" />
                </div>
                <div v-else>
                  <img :src="avatar" title="" />
                </div>
              </div>
            </div>
            <h3 class="title">
              {{publicuser.firstname + ' ' + publicuser.lastname + `(@${publicuser.username})`}}
            </h3>
            <p class="description">
              {{publicuser.description}}
            </p>
            <div class="social-buttons">
              <md-button class="md-round md-just-icon md-facebook" @click="gotoUrl(publicuser.facebook)" v-show="publicuser.facebook && publicuser.facebook!=''">
                <i class="fab fa-facebook"></i>
              </md-button>
              <md-button class="md-round md-just-icon md-twitter" @click="gotoUrl(publicuser.twitter)" v-show="publicuser.twitter && publicuser.twitter!=''">
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button class="md-round md-just-icon md-instagram" @click="gotoUrl(publicuser.instagram)" v-show="publicuser.instagram && publicuser.instagram!=''">
                <i class="fab fa-instagram"></i>
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-large-size-33 md-size-25"
                v-for="banner in sortedBanners"
                :key="banner.id"
                @click="gotoUrl(banner.url)"
              >
                <product-card header-animation="false" :ripple="false">
                  <img class="img header-image" slot="imageHeader" :src="banner.image" />
                  <h4 slot="title" class="title">
                    {{ banner.title }}
                  </h4>
                  <div slot="description" class="card-description">
                    {{ banner.description }}
                  </div>
                </product-card>
              </div>
            </div>
          </md-card-content>
      </md-card>
  </ValidationObserver>
</template>
<script>
import { mapGetters } from "vuex";
import { ProductCard } from "@/components";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import firebaseUtilFuncs, { firebaseDB } from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";

extend("required", required);

export default {
  name: "edit-profile-form",
  components: {
    ProductCard,
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png",
    },
    headerColor: {
      type: String,
      default: "",
    },
    // publicuser: {
    //   type: Object,
    //   default: {},
    // },
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
      authUser: "auth/getAuthUser"
    }),
  },
  data() {
    return {
      publicuser: {},
      banners: []
    };
  },
  async created() {
    this.publicuser = { ...this.authUser };
    this.banners = await firebaseDB
      .collection("banners")
      .where("userId", "==", this.authUser.id)
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        let updatedBanners = [];
        querySnapshot.forEach((doc) => {
          updatedBanners.push({ id: doc.id, ...doc.data() });
        });
        return updatedBanners;
      });
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    gotoUrl: function(url) {
      if (url) {
        window.open(url);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.facebook {
  color: #3b5998!important
}
.md-card-avatar {
  margin-top: -90px;
}
.twitter {
  color: #55acee!important
}
.instagram {
  color: #125688!important
}
.description {
  text-align: left;
  color: #333333
}
.md-social {
  .md-icon {
    margin: 20px;
    font-size: 2rem!important;
  }
}
.ripple {
  overflow: hidden;
}
.header-image {
  height: 250px;
  object-fit: cover;

  @media screen and (min-width: 1400px) {
    min-height: 350px;
  }
}
.md-card-header {
  position: relative;

.md-card-avatar {
  position: relative;
  z-index: 30;
  .picture {
    width: 130px;
    height: 130px;
    background-color: #999999;
    border: 4px solid #cccccc;
    color: #ffffff;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    input[type="file"] {
      cursor: pointer;
      display: block;
      height: 100%;
      left: 0;
      opacity: 0 !important;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  &:hover,
  &:focus {
    .picture {
      border-color: #4caf50;
    }
  }
}
.md-icon-button{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.md-card-banner {
  margin: 0;
  position: relative;
  z-index: 20;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  img {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  
  input[type="file"] {
    cursor: pointer;
    display: block;
    height: 100%;
    left: 0;
    opacity: 0 !important;
    position: absolute;
    top: 0;
    width: 100%;
  }
  &:hover {

  > div::after {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 50%;
    top: 0;
    left: 0;
  }
  }
}
}
</style>
