<template>
  <!-- <div class="md-layout"> -->
  <product-card header-animation="false">
    <img class="img header-image" slot="imageHeader" :src="banner.image" />
    <h4 slot="title" class="title">
      {{ banner.title }}
    </h4>
    <div slot="description" class="card-description">
      {{ banner.description }}
    </div>
    <template slot="footer">
      <div
        class="md-layout-item md-size-33"
      >
        <md-switch v-model="banner.active" @change="updateStatus($event, 'active', banner.id)">Active</md-switch>
        <md-switch v-model="banner.published" v-show="!shared" @change="updateStatus($event, 'published', banner.id)">Published</md-switch>
      </div>
      
      <md-menu md-direction="top-start" md-close-on-click class="md-menu" v-show="!shared">
        <md-button
          md-menu-trigger
          class="md-round md-just-icon md-icon-button md-primary"
        >
          <i class="material-icons text_align-center"
            >more_vert</i
          >
        </md-button>

        <md-menu-content  class="md-menu">
          <md-menu-item @click="editBanner(banner.id)">
            <div>Edit</div>
            <md-icon>edit</md-icon>
          </md-menu-item>
          <md-menu-item @click="removeBanner( $event, banner.id)">
            <div>Delete</div>
            <md-icon>delete</md-icon>
          </md-menu-item>
          <md-menu-item @click="shareBannerClick(banner)">
            <div>Share</div>
            <md-icon>share</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </template>
  </product-card>
  <!-- </div> -->
</template>

<script>
import { ProductCard } from "@/components";

export default {
  props: {
    banner: {
      type: Object,
      default: () => {
        return {};
      }
    },
    shared: {
      type: Boolean,
      default: false
    },
    shareBannerClick: {
      type: Function,
    },
    removeBanner: {
      type: Function,
    },
    updateStatus: {
      type: Function,
    },
    editBanner: {
      type: Function,
    }
  },
  components: {
    ProductCard
  }
};
</script>

<style lang="scss" scoped>
  .md-switch {
    display: flex;
  }

  .header-image {
    height: 250px;
    object-fit: cover;

    @media screen and (min-width: 1400px) {
      min-height: 350px;
    }
  }

  .md-menu {
    overflow: hidden;
  }
</style>