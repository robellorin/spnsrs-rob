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

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
            Account Type
          </template>
          <profile-type-form
            ref="step1"
            @on-validated="onStepValidated"
          ></profile-type-form>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Profile Info
          </template>
          <profile-info-form
            ref="step2"
            @on-validated="onStepValidated"
          ></profile-info-form>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Complete Profile
          </template>
          <complete-profile-form
            ref="step3"
            @on-validated="wizardComplete"
          ></complete-profile-form>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CompleteProfileForm from "./Wizard/CompleteProfileForm.vue";
import ProfileTypeForm from "./Wizard/ProfileTypeForm.vue";
import ProfileInfoForm from "./Wizard/ProfileInfoForm.vue";
import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import { validate } from 'vee-validate';

export default {
  data() {
    return {
      wizardModel: {},
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getAuthUser'
    })
  },
  components: {
    CompleteProfileForm,
    ProfileTypeForm,
    ProfileInfoForm,
    SimpleWizard,
    WizardTab,
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    async wizardComplete(validated, model) {
      if (validated) {
        this.wizardModel = { ...this.wizardModel, ...model };
        this.wizardModel.id = this.authUser.id;
        let isNew = true;
        let authUserId = this.authUser.id
            
        let usersRef = this.$firebaseGlobDB.collection("users");
        let snapshot = await usersRef
          .where("username", "==", this.wizardModel.username)
          .get();

        if (snapshot.empty) {
          isNew = true;
        } else {
          snapshot.forEach(function (doc) {
            if (doc.id == authUserId) {
              isNew = true
            } else {
              isNew = false
            }
          });
        }

        if (isNew) {
          console.log(this.wizardModel.username + ' is available')
          if (this.wizardModel.image) {
            console.log(`Avatar Image uploading for user[${this.wizardModel.username}]`);
            const storageRef = await this.$firebaseGlob
              .storage()
              .ref(`/users/profile/${authUserId}`)
              .child("profilePicture")
              .putString(this.wizardModel.image, "base64", {
                contentType: "image/jpg",
              }).then((snapshot) => {
               return snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL);
                return downloadURL;
                console.log("File available at", downloadURL);
              });
            });

            console.log(storageRef);
            this.wizardModel.image = storageRef;
          } else {
            this.wizardModel.image = this.authUser.image || '';
          }
          this.wizardModel.profilecompleted = true
          firebaseUtilFuncs.updateData("users", this.wizardModel)
          this.$store.commit("auth/setAuthUser", this.wizardModel);
          this.$router.replace({ name: "Dashboard" });
        } else {
          console.log(this.wizardModel.username + ' is already registered')
          Swal.fire({
            title: "The username is not available.",
            text: "Sorry! The Username is already taken by another user. Please use another username.",
            type: "danger",
            confirmButtonClass: "md-button md-danger",
            buttonsStyling: false,
          });
          return false;
        }
      } else {
        Swal.fire({
          title: "Please Fill a username!",
          text: "enter your username!",
          type: "danger",
          confirmButtonClass: "md-button md-danger",
          buttonsStyling: false,
        });
      }
    },
  },
};
</script>
