<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="title">Build your profile</h3>
          <h5 class="category">
            This information will let us know more about you.
          </h5>
        </template>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Account Type
          </template>
          <profile-type-form
            ref="step2"
            @on-validated="onStepValidated"
          ></profile-type-form>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            About Me
          </template>
          <about-me-form ref="step1" @on-validated="onStepValidated"></about-me-form>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Address
          </template>
          <address-form ref="step3" @on-validated="wizardComplete"></address-form>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import AboutMeForm from "./Wizard/AboutMeForm.vue";
import ProfileTypeForm from "./Wizard/ProfileTypeForm.vue";
import AddressForm from "./Wizard/AddressForm.vue";
import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";

export default {
  data() {
    return {
      wizardModel: {}
    };
  },
  components: {
    AboutMeForm,
    ProfileTypeForm,
    AddressForm,
    SimpleWizard,
    WizardTab
  },
  methods: {
    validateStep(ref) {
      console.log("validateStep")
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      console.log("onStepValidated")
      this.wizardModel = { ...this.wizardModel, ...model };
      console.log(model);
    },
    wizardComplete() {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the finish button!",
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false
      });
    }
  }
};
</script>
