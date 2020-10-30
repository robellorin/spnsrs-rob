<template>
  <div>
    <div class="fixed-add-banner">
      <a @click="showDialog = !showDialog">
        <i class="fa fa-plus fa-2x"></i>
      </a>
    </div>

    <md-dialog class="add-banner-dialog" :md-active.sync="show" :md-fullscreen="false">
      <md-dialog-content>
        <ValidationObserver ref="form">
          <form @submit.prevent="validate">
            <product-card header-animation="false" class="no-margin-bottom" :ripple="true">
              <img
                v-if="banner.image"
                class="img"
                slot="imageHeader"
                :src="banner.image"
              />
              <div slot="description">
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <h6 v-if="!banner.image">Please choose banner image</h6>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>banner Image</label>
                      <md-file @change="onFileChange" accept="image/*" />
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <ValidationProvider
                      name="title"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>Title</label>
                        <md-input v-model="banner.title" type="text"></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <ValidationProvider
                      name="bannerurl"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label>Banner url</label>
                        <md-input v-model="banner.url" type="text"></md-input>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <ValidationProvider
                      name="description"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                        maxlength="5"
                      >
                        <label>Description</label>
                        <md-textarea v-model="banner.description"></md-textarea>
                        <slide-y-down-transition>
                          <md-icon class="error" v-show="failed">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                          <md-icon class="success" v-show="passed"
                            >done</md-icon
                          >
                        </slide-y-down-transition>
                      </md-field>
                    </ValidationProvider>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="priority"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label
                          for="priority"
                          :class="failed ? 'error' : 'success'"
                          >Priority</label
                        >
                        <md-select v-model="banner.priority" name="priority">
                          <md-option
                            v-for="option in priorityOptions"
                            :value="option"
                            :key="option"
                            >{{ option }}</md-option
                          >
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-switch v-model="banner.published" @change="updateStatus('published',$event)">Published</md-switch>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-switch v-model="banner.active" @change="updateStatus('active',$event)">Active</md-switch>
                  </div>
                </div>
              </div>
              <template slot="footer">
                <md-button v-on:click="cancelEdit" justify="flex-end" class="md-raised md-info"
                  >Cancel</md-button
                >
                <md-button type="submit" justify="flex-end" class="md-raised md-success"
                  >Save</md-button
                >
              </template>
            </product-card>
          </form>
        </ValidationObserver>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import { ProductCard } from "@/components";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";

extend("required", required);

export default {
  components: {
    ProductCard,
    SlideYDownTransition,
  },
  computed: {
    ...mapGetters({
      authUser: "auth/getAuthUser",
      banners: "banners/getBanners",
      editBanner: "banners/getEditableBanner",
    }),
    show: {
      // getter
      get: function () {
        return this.showDialog || this.editBanner.id ? true : false
      },
      // setter
      set: function (newValue) {
        this.$store.commit('banners/removeEditableBanner')
        this.showDialog = false
      }
    }
  },
  watch: {
    editBanner: function(existingBanner) {
      if (existingBanner && existingBanner.id) {
        this.banner = {...this.editBanner}
      } else {
        this.banner = {image: null}
      }
    }
  },
  data() {
    return {
      showDialog: false,
      product1: "./img/card-2.jpg",
      priorityOptions: ["High", "Medium", "Low"],
      publishedOptions: ["published", "Not Published"],
      activeOptions: ["Active", "Inactive"],
      banner: {
        image: null
      },
      oldBanner: {},
      isFileChanged: false
    };
  },
  methods: {
    cancelEdit(){
      this.$store.commit('banners/removeEditableBanner');
      this.showDialog = false;
    },
    updateStatus(type, value){
      this.banner[type] = value;
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
    validate() {
      return this.$refs.form.validate().then((res) => {
        if (!res) {
          console.log("Fields not valid");
          return;
        }
        this.saveBanner();
        return res;
      });
    },
    async saveBanner() {
      console.log(this.banner)
      this.banner.userId = this.authUser.id;
      
      let docRef;
      let isNew = false;
      if (!this.banner.id) {  
        docRef = await firebaseUtilFuncs.createData(
          "banners",
          this.banner
        );
        this.banner.id = docRef.id;
        isNew = true;
      }
      if (this.banner.image && this.isFileChanged) {
        console.log(`Banner uploading for user[${this.authUser.username}]`);
        const storageRef = await this.$firebaseGlob
          .storage()
          .ref(`/banners/`)
          .child(this.banner.id)
          .putString(this.banner.image.split(",")[1], "base64", {
            contentType: "image/jpg",
          })
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log(downloadURL);
              return downloadURL;
              console.log("File available at", downloadURL);
            });
          });

        this.banner.image = storageRef;
      }


      this.bannerUpdate(isNew,this.banner);
    },
    bannerUpdate(isNew, banner) {
      firebaseUtilFuncs.updateData("banners",banner).then(()=>{
        if (isNew) {
          this.$store.commit('banners/addNewBanner',banner);
          this.$store.commit('banners/removeEditableBanner');
          this.notifyVue(`Successfully created a new banner.`);
        } else {
          this.$store.commit('banners/updateBanner',banner);
          this.$store.commit('banners/removeEditableBanner');
          this.notifyVue(`Successfully updated.`);
        }
        
        this.isFileChanged = false;
        this.showDialog = false;
      });
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = async (e) => {
        vm.banner.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onFileChange(e) {
      this.isFileChanged = true
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
  },
};
</script>

<style lang="scss">
$mobile: 576px;

.fixed-add-banner {
  position: fixed;
  right: 0;
  width: 64px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1031;
  border-radius: 8px 0 0 8px;
  text-align: center;
  top: 156px;

  .fa-plus {
    color: #ffffff;
    padding: 10px;
    border-radius: 0 0 6px 6px;
    width: auto;
    cursor: pointer;
  }
}
.no-margin-bottom {
  margin-bottom: 0;
  margin-top: 0;
}

.img {
  max-height: 300px;
  object-fit: cover;
}

.add-banner-dialog {
  .md-dialog-container {
    @media screen and (max-width:$mobile) {
      width: 100%!important;
    }
  }
}
</style>
