<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <h5 class="info-text">Are you living in a nice area?</h5>
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100">
          
            <ValidationProvider
              name="firstName"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field
                :class="[
                  { 'md-error': failed },
                  { 'md-valid': passed },
                  { 'md-form-group': true }
                ]"
              >
                <md-icon>face</md-icon>
                <label>First Name</label>
                <md-input v-model="firstName" type="text"> </md-input>

                <slide-y-down-transition>
                  <md-icon class="error" v-show="failed">close</md-icon>
                </slide-y-down-transition>
                <slide-y-down-transition>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </slide-y-down-transition>
              </md-field>
            </ValidationProvider>

        </div>
        <div class="md-layout-item md-size-50 md-small-size-100">
        
            <ValidationProvider
              name="lastName"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field
                :class="[
                  { 'md-error': failed },
                  { 'md-valid': passed }
                ]"
              >
                <label>Last Name</label>
                <md-input v-model="lastName" type="text"> </md-input>

                <slide-y-down-transition>
                  <md-icon class="error" v-show="failed">close</md-icon>
                </slide-y-down-transition>
                <slide-y-down-transition>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </slide-y-down-transition>
              </md-field>
            </ValidationProvider>
        </div>
        <div class="md-layout-item md-size-70 md-small-size-100">
          <ValidationProvider
            name="streetName"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed },
                  { 'md-form-group': true }
            ]">
                <md-icon></md-icon>
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
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed },{ 'md-form-group': true }]">
                <md-icon></md-icon>
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
                <md-option v-for="country in countryOptions" :value="country" :key="country">{{country}}</md-option>
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
import { required } from "vee-validate/dist/rules";

extend("required", required);

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      firstName: "Jhon",
      lastName: "doe",
      streetName: "Some Street name",
      state: "ohio",
      city: "akron",
      country: "Afghanistan",
      countryOptions: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        if (!res) {
          return;
        }
        this.$emit("on-validated", res, {firstname: this.firstName, lastname: this.lastName, street: this.streetName,city: this.city, country: this.country, state: this.state });
        return res;
      });
    }
  }
};
</script>
<style></style>
