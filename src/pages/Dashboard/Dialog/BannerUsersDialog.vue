<template>
  <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
    <md-dialog-content>
      <banner-users-table>
      </banner-users-table>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import { BannerUsersTable } from "../Components/BannerUsersTable";
import { mapGetters } from "vuex";
import firebaseUtilFuncs from "@/utils/firebase/firebaseUtil.js";
import Swal from "sweetalert2";

extend("required", required);

export default {
  props: {
    banner: {
      type: Object,
      default: {}
    },
    closeDialog: {
      type: function,
    }
  },
  components: {
    BannerUsersTable,
  },
  data() {
    return {
      showDialog: false,
      bannerUsers: []
    };
  },
  computed: {
    ...mapGetters({
      authUser: "auth/getAuthUser"
    })
  },
  methods: {
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
