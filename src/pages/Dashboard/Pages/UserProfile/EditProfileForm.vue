<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <md-card class="md-card-profile">
        <md-card-header
          class="md-card-header-icon"
          :class="getClass(headerColor)"
        >
          <div class="md-card-avatar">
            <div class="picture">
              <div v-if="image">
                <img :src="image" title="" />
              </div>
              <div v-else-if="userProfile.image">
                <img :src="userProfile.image" />
              </div>
              <div v-else>
                <img :src="avatar" title="" />
              </div>
              <input type="file" @change="onProfilePictureChange" />
            </div>
          </div>
          <div class="md-card-banner">
            <div v-if="banner">
              <img :src="banner" alt="banner image" />
            </div>
            <div v-else-if="userProfile.banner">
              <img :src="userProfile.banner" alt="banner image" />
            </div>
            <div v-else>
              <img
                src="https://source.unsplash.com/1600x350/?nature,water"
                alt="banner image"
              />
            </div>
            <input type="file" @change="onUserBannerChange" />
          </div>
          <h4 class="title">
            Edit Profile - <small>Complete your profile</small>
          </h4>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>Vanity url name</label>
                  <md-input
                    v-model="userProfile.username"
                    type="text"
                  ></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>First Name</label>
                  <md-input
                    v-model="userProfile.firstname"
                    type="text"
                  ></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>Last Name</label>
                  <md-input
                    v-model="userProfile.lastname"
                    type="text"
                  ></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>Nick Name</label>
                  <md-input
                    v-model="userProfile.nickname"
                    type="text"
                  ></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-75">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>Adress - Street</label>
                  <md-input v-model="userProfile.street" type="text"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-25">
                <md-field
                >
                  <label>Phone number</label>
                  <md-input
                    v-model="userProfile.phonenumber"
                    type="text"
                  ></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-25">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>City</label>
                  <md-input v-model="userProfile.city" type="text"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-25">
              <ValidationProvider
                name="state"
                v-slot="{ passed, failed }"
                rules="required"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label>State</label>
                  <md-input v-model="userProfile.state" type="text"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-25">
              <ValidationProvider
                name="country"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <label for="country" :class="failed ? 'error' : 'success'"
                    >Country</label
                  >
                  <md-select v-model="userProfile.country" name="country">
                    <md-option
                      v-for="country in countryOptions"
                      :value="country"
                      :key="country"
                      >{{ country }}</md-option
                    >
                  </md-select>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-25">
              <md-field>
                <label>Postal Code</label>
                <md-input
                  v-model="userProfile.postalcode"
                  type="number"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item social-buttons md-small-size-100 md-size-33">
              <md-field>
                <!-- <md-icon>facebook</md-icon> -->
                <md-icon class="facebook"><i class="md-facebook fab fa-facebook"></i></md-icon>
                <label>Facebook</label>
                <md-input v-model="userProfile.facebook" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item social-buttons md-small-size-100 md-size-33">
              <md-field>
                <md-icon class="twitter"><i class="fab fa-twitter"></i></md-icon>
                <label>Twitter</label>
                <md-input v-model="userProfile.twitter" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item social-buttons md-small-size-100 md-size-33">
              <md-field>
                <md-icon class="instagram"><i class="fab fa-instagram"></i></md-icon>
                <label>Instagram</label>
                <md-input
                  v-model="userProfile.instagram"
                  type="text"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>Description</label>
                <md-textarea v-model="userProfile.description"></md-textarea>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-right">
              <md-button type="submit" class="md-raised md-success mt-4"
                >Update Profile</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </ValidationObserver>
</template>
<script>
import { mapGetters } from "vuex";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";

extend("required", required);

export default {
  name: "edit-profile-form",
  components: {
    SlideYDownTransition,
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
  },
  computed: {
    ...mapGetters({
      authUser: "auth/getAuthUser",
    }),
  },
  data() {
    return {
      banner: null,
      image: null,
      userProfile: {},
      countryOptions: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]
    };
  },
  created() {
    this.userProfile = { ...this.authUser, ...this.userProfile };
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    onProfilePictureChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0], 'profile');
    },
    onUserBannerChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0], 'banner');
    },
    validate() {
      return this.$refs.form.validate().then((res) => {
        if(!res) {
          return;
        }
        console.log("All Fields Validated");
        this.submitForm();
        return res;
      });
    },
    createImage(file, type) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = async (e) => {
        if(type == 'profile') {
          vm.image = e.target.result;
        }
        if(type == 'banner') {
          vm.banner = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    },
    async submitForm() {
      console.log("submitting form");
      let isNew = true;
      let authUserId = this.userProfile.id;

      let usersRef = this.$firebaseGlobDB.collection("users");
      let snapshot = await usersRef
        .where("username", "==", this.userProfile.username)
        .get();
      if (snapshot.empty) {
        isNew = true;
      } else {
        snapshot.forEach(function(doc) {
          if (doc.id == authUserId) {
            isNew = true;
          } else {
            isNew = false;
          }
        });
      }

      if (isNew) {
        console.log(this.userProfile.username + " is available");
        if (this.image) {
          console.log(
            `Avatar Image uploading for user[${this.userProfile.username}]`
          );
          const profileStorageRef = await this.$firebaseGlob
            .storage()
            .ref(`/users/profile/${authUserId}`)
            .child("profilePicture")
            .putString(this.image.split(",")[1], "base64", {
              contentType: "image/jpg",
            })
            .then((snapshot) => {
              return snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL);
                return downloadURL;
                console.log("File available at", downloadURL);
              });
            });

          console.log(profileStorageRef);
          this.userProfile.image = profileStorageRef;
        }

        if (this.banner) {
          console.log(
            `Banner Image uploading for user[${this.userProfile.username}]`
          );
          const bannerStorageRef = await this.$firebaseGlob
            .storage()
            .ref(`/users/profile/${authUserId}`)
            .child("bannerImage")
            .putString(this.banner.split(",")[1], "base64", {
              contentType: "image/jpg",
            })
            .then((snapshot) => {
              return snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL);
                return downloadURL;
                console.log("File available at", downloadURL);
              });
            });

          console.log(bannerStorageRef);
          this.userProfile.banner = bannerStorageRef;
        }

        firebaseUtilFuncs.updateData("users", this.userProfile);
        this.$store.commit("auth/setAuthUser", this.userProfile);

        Swal.fire({
          title: "Good job!",
          text: "You clicked the finish button!",
          type: "success",
          confirmButtonClass: "md-button md-success",
          buttonsStyling: false,
        });
      } else {
        console.log(this.userProfile.username + " is already registered");
        Swal.fire({
          title: "The username is not available.",
          text:
            "Sorry! The Username is already taken by another user. Please use another username.",
          type: "danger",
          confirmButtonClass: "md-button md-danger",
          buttonsStyling: false,
        });
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.facebook {
  color: #3b5998!important
}
.twitter {
  color: #55acee!important
}
.instagram {
  color: #125688!important
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
.md-card-banner {
  margin: -80px -15px 0;
  min-height: 200px;
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
