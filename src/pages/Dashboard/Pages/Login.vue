<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(loginClick)">
          <login-card header-color="green">
            <h4 slot="title" class="title">Log in</h4>
            <md-button
              slot="buttons"
              href="#facebook"
              class="md-just-icon md-simple md-white"
            >
              <i class="fab fa-facebook-square"></i>
            </md-button>
            <md-button
              slot="buttons"
              href="#twitter"
              class="md-just-icon md-simple md-white"
            >
              <i class="fab fa-twitter"></i>
            </md-button>
            <md-button
              slot="buttons"
              href="#google"
              class="md-just-icon md-simple md-white"
            >
              <i class="fab fa-google-plus-g"></i>
            </md-button>
            <template slot="inputs">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed }"
              >
                <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-icon>email</md-icon>
                  <label>Email...</label>
                  <md-input v-model="email" type="email"></md-input>
                </md-field>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required|min:5"
                v-slot="{ passed, failed }"
              >
                <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-icon>lock_outline</md-icon>
                  <label>Password...</label>
                  <md-input v-model="password" type="password"></md-input>
                </md-field>
              </ValidationProvider>
            </template>
            
            <md-content slot="errormessage" class="md-accent" :class="[{ 'md-error': signinError}]">
              <p>{{signinError}}</p>
            </md-content>
            <md-button
              slot="footer"
              class="md-simple md-success md-lg"
              type="submit"
            >
              Let's go
            </md-button>
          </login-card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      firstname: null,
      email: 'test@email.com',
      password: '123456',
      signinError: null
    };
  },
  methods: {
    loginClick() {
      this.$firebaseGlob
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          // this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          this.signinError = err.message;
        });
    }
  }
};
</script>

<style></style>
