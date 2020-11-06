<template>
  <ValidationObserver ref="form">
      <md-card class="md-card-profile">
          <md-card-header
            class="md-card-header-icon"
            :class="getClass(headerColor)"
          >
            <div class="md-card-banner">
              <div v-if="userInfo.banner">
                <img :src="userInfo.banner" alt="banner image" />
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
                <div v-if="userInfo.image">
                  <img :src="userInfo.image" />
                </div>
                <div v-else>
                  <img :src="avatar" title="" />
                </div>
              </div>
            </div>
            <h3 class="title">
              {{userInfo.firstname}} {{userInfo.lastname}} ({{userInfo.username}})
            </h3>
            <p class="description">
              {{userInfo.description}}
            </p>
            <div class="social-buttons">
              <md-button class="md-round md-just-icon md-facebook" @click="gotoUrl(userInfo.facebook)" v-show="userInfo.facebook && userInfo.facebook!=''">
                <i class="fab fa-facebook"></i>
              </md-button>
              <md-button class="md-round md-just-icon md-twitter" @click="gotoUrl(userInfo.twitter)" v-show="userInfo.twitter && userInfo.twitter!=''">
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button class="md-round md-just-icon md-instagram" @click="gotoUrl(userInfo.instagram)" v-show="userInfo.instagram && userInfo.instagram!=''">
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
              <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-large-size-33 md-size-25"
                v-for="banner in sortedSharedBanners"
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
import axios from "@/api/axios";
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
    username: {
      type: String,
      default: "username4",
    },
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
      authUser: "auth/getAuthUser"
    }),
  },
  data() {
    return {
      userInfo: {},
      banners: [],
      sharedBanners: [],
    };
  },
  watch: {
    '$route.params.username': function(val) {
      let username = val
      axios
      .get(`/profile/${username}`)
      .then(response => {
        let data = response.data
        if (data) {
          this.banners = data.banners;
          this.sharedBanners = data.sharedBanners;
          this.userInfo = data.userInfo;
        }
      })
      .catch(err => {
        console.log(err)
      });
    }
  },
  created() {
    console.log(this.$route.name);
    let routeName = this.$route.name
    let username = null;
    if (routeName === "PublicUserProfile") {
      username = this.authUser.username
    } else {
      username = this.$route.params.username
    }
    if (username) {
      axios
      .get(`/profile/${username}`)
      .then(response => {
        let data = response.data
        if (!data.err && data) {
          this.banners = data.banners;
          this.sharedBanners = data.sharedBanners;
          this.userInfo = data.userInfo;
        } else {
          this.banners = [];
          this.sharedBanners = [];
          this.userInfo = {};
        }
      })
      .catch(err => {
        console.log(err)
      });
    }
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
.md-card {
  padding: 10px;
  border: 1px solid lightgray;
}
.ripple {
  overflow: hidden;
}
.header-image {
  height: 250px;
  object-fit: cover;

  @media screen and (min-width: 1400px) {
    min-height: 100px;
    max-height: 150px;
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
