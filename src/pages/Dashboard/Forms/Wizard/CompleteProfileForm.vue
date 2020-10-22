<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <h5 class="info-text">
          Let's start with the basic information (with validation)
        </h5>
        <div class="md-layout">
          <div class="md-layout-item md-size-40 mt-4 md-small-size-100">
            <div class="picture-container">
              <div class="picture">
                <div v-if="!image">
                  <img :src="avatar" class="picture-src" title="" />
                </div>
                <div v-else>
                  <img :src="image" />
                </div>
                <input type="file" @change="onFileChange" />
              </div>
              <h6 class="description">Choose Picture</h6>
            </div>
          </div>
          <div class="md-layout-item md-size-60 md-small-size-100">
            <ValidationProvider
              name="username"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field
                :class="[
                  { 'md-error': failed },
                  { 'md-valid': passed },
                  { 'md-form-group': true },
                ]"
              >
                <md-icon>how_to_reg</md-icon>
                <label>Username</label>
                <md-input v-model="username" type="text"> </md-input>

                <slide-y-down-transition>
                  <md-icon class="error" v-show="failed">close</md-icon>
                </slide-y-down-transition>
                <slide-y-down-transition>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </slide-y-down-transition>
              </md-field>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { mapGetters } from 'vuex'
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);

export default {
  components: {
    SlideYDownTransition,
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png",
    },
  },
  data() {
    return {
      image: "",
      username: "",
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getAuthUser'
    })
  },
  created() {
    this.image = this.authUser.image;
    this.username = this.authUser.username;
  },
  methods: {
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    validate() {
      return this.$refs.form.validate().then(res => {
        if (!res) {
          return;
        }
        this.$emit("on-validated", res, {
            username: this.username,
            image: this.image.split(",")[1],
          });
        return res;
      });
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = async (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style></style>
