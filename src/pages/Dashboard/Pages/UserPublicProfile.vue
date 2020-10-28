<template>
  <div class="content">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <public-profile header-color="green"> </public-profile>
      </div>
    </div>
  </div>
</template>

<script>
import { PublicProfile, UserCard } from "@/pages";
export default {
  components: {
    PublicProfile,
    // UserCard
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
