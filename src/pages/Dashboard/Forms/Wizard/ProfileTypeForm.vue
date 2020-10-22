<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <h5 class="info-text">What are you doing? (checkboxes)</h5>
      <div class="md-layout">
        <div class="md-layout-item">
          <ValidationProvider
            name="profiletype"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <div class="md-layout">
              <div class="md-layout-item md-size-50 md-small-size-100">
                <icon-checkbox
                  v-model="model.influencer"
                  icon="fas fa-terminal"
                  name="influencer"
                  title="Influencer"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                </icon-checkbox>
              </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
                <icon-checkbox
                  v-model="model.sponsor"
                  icon="fas fa-laptop"
                  title="Sponsor"
                  name="sponsor"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                </icon-checkbox>
              </div>
            </div>
          </ValidationProvider>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { mapGetters } from 'vuex'
import { IconCheckbox } from "@/components";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Swal from "sweetalert2";

extend("required", required);

export default {
  components: {
    IconCheckbox,
  },
  data() {
    return {
      model: {
        influencer: false,
        sponsor: false,
      },
      profiletype: null
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getAuthUser'
    })
  },
  created() {
    this.model.influencer = this.authUser.influencer
    this.model.sponsor = this.authUser.sponsor
    // this.profiletype = this.model.influencer | this.model.sponsor
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        if (!(this.model.influencer || this.model.sponsor)) {
          Swal.fire({
            title: "Please select a Profile Type",
            text: "You must select a profile type to continue.",
            type: "danger",
            confirmButtonClass: "md-button md-danger",
            buttonsStyling: false,
          });
          return;
        }
        this.$emit("on-validated", true, this.model);
        return res;
      });
    },
  },
};
</script>
<style></style>
