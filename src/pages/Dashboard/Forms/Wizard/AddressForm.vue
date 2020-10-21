<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <h5 class="info-text">Are you living in a nice area?</h5>
        </div>
        <div class="md-layout-item md-size-70 md-small-size-100">
          <ValidationProvider
            name="streetName"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Street Name</label>
              <md-input v-model="streetName" type="text"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-size-30 md-small-size-100">
          <ValidationProvider name="city" v-slot="{ passed, failed }" rules="required">
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>City</label>
              <md-input v-model="city" type="text"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-small-size-100">
          <ValidationProvider name="state" v-slot="{ passed, failed }" rules="required">
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>State</label>
              <md-input v-model="state" type="text"> </md-input>

              <slide-y-down-transition>
                <md-icon class="error" v-show="failed">close</md-icon>
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon class="success" v-show="passed">done</md-icon>
              </slide-y-down-transition>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-small-size-100">
          <ValidationProvider name="country" rules="required" v-slot="{ passed, failed }" >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label for="country" :class="failed?'error':'success'">Country</label>
              <md-select v-model="country" name="country">
                <md-option value="angola">Angola</md-option>
                <md-option value="france">France</md-option>
                <md-option value="germany">Germany</md-option>
                <md-option value="england">England</md-option>
              </md-select>
            </md-field>
          </ValidationProvider>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      streetName: "",
      state: "",
      city: "",
      country: null,
      countryOptions: ["One", "Two", "Three", "Four", "Five", "Six"]
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        if (!res) {
          return;
        }
        this.$emit("on-validated", res);
        return res;
      });
    }
  }
};
</script>
<style></style>
