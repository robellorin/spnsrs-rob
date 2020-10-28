<template>
  <div class="user">
    <div class="photo">
      <img :src="profileImage" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          {{ name }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <router-link to="/pages/user">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </router-link>
              </li>
              <li>
                <router-link to="/pages/profilebuild">
                  <span class="sidebar-mini">PS</span>
                  <span class="sidebar-normal">Profile Settings</span>
                </router-link>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import {mapGetters} from 'vuex';

export default {
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: "Tania Andrew"
    },
    avatar: {
      type: String,
      default: "./img/faces/avatar.jpg"
    }
  },
  data() {
    return {
      isClosed: true
    };
  },
  computed: {
...mapGetters({
      authUser: 'auth/getAuthUser'
    }),
    name() {
      return this.authUser.nickname || this.authUser.firstname ? this.authUser.nickname || this.authUser.firstname : this.title;
    },
    profileImage() {
      return this.authUser.image  ?  this.authUser.image : this.avatar;
    },
  }
    ,
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
