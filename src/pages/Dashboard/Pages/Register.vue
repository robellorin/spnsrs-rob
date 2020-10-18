<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-50 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <signup-card>
            <h2 class="title text-center" slot="title">Register</h2>
            <div
              class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
              slot="content-right"
            >
              
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed }"
              >
                <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-icon>email</md-icon>
                  <label>Email Adress</label>
                  <md-input v-model="email" type="email"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required|confirmed:confirmation"
                v-slot="{ passed, failed }"
              >
                <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-icon>lock_outline</md-icon>
                  <label>Password</label>
                  <md-input v-model="password" type="password"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                vid="confirmation"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-icon></md-icon>
                  <label>Confirm password</label>
                  <md-input v-model="confirmation" type="password"> </md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
              
              <div class="social-line text-center">
                <md-button class="md-just-icon md-round md-twitter">
                  <i class="fab fa-twitter"></i>
                </md-button>
                <md-button class="md-just-icon md-round md-facebook">
                  <i class="fab fa-facebook-f"></i>
                </md-button>
                <md-button class="md-just-icon md-round md-google" @click="googleLogin">
                  <i class="fab fa-google"></i>
                </md-button>
              </div>
              <md-content class="md-accent" :class="[{ 'md-error': signupError }]">
                <p>{{signupError}}</p>
              </md-content>
              <div class="button-container">
                <md-button type="submit" class="md-success md-round mt-4" slot="footer"
                  >Get Started</md-button
                >
              </div>
            </div>
          </signup-card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import firebase from "firebase";
import { SignupCard } from "@/components";
export default {
  components: {
    SignupCard,
    SlideYDownTransition
  },
  methods: {
    submit() {
      this.$firebaseGlob
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async data => {
          localStorage.setItem("isLoggedIn", true);
          var newUser = await firebaseUtilFuncs.createData('users', {email: data.user.email})
          this.$store.commit('auth/setAuthUser', {
            id: newUser.id,
            email: data.user.email
          })
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          console.log(err)
          this.signupError = err.message;
        });
    },
    async googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(async (result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        const usersRef = this.$firebaseGlobDB.collection('users');
        const snapshot = await usersRef.where('email', '==', user.email).get();
        if (snapshot.empty) {
          var newUser = await firebaseUtilFuncs.createData('users', {email: user.email})
          this.$store.commit('auth/setAuthUser', {
            id: newUser.id,
            email: user.email
          })
        } else {
          var user = null;        
          snapshot.forEach(doc => {
            this.$store.commit('auth/setAuthUser', {
              id: doc.id,
              ...doc.data()
            })
          })
        }
        this.$router.replace({ name: "Dashboard" });
      }).catch(function(error) {
        console.log("social login failed")
        console.log(error)
      });
    }
  },
  data() {
    return {
      firstname: null,
      boolean: false,
      email: "test@email.com",
      password: "123456",
      confirmation: "123456",
      signupError: null,
      contentLeft: [
        {
          colorIcon: "icon-success",
          icon: "timeline",
          title: "Marketing",
          description:
            "We've created the marketing campaign of the website. It was a very interesting collaboration."
        },

        {
          colorIcon: "icon-danger",
          icon: "code",
          title: "Fully Coded in HTML5",
          description:
            "We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
        },

        {
          colorIcon: "icon-info",
          icon: "group",
          title: "Built Audience",
          description:
            "There is also a Fully Customizable CMS Admin Dashboard for this product."
        }
      ],
      inputs: [
        {
          icon: "email",
          name: "Email",
          nameAttr: "email",
          type: "email",
          rule: "required|email"
        },

        {
          icon: "lock_outline",
          name: "Password",
          nameAttr: "password",
          type: "password",
          rule: "required|confirmed:confirmation|min:5"
        },

        {
          name: "Confirm password",
          nameAttr: "confirmpassword",
          type: "password",
          rule: "confirmed:password"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.no-boder {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>
