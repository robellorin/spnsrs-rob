<template>
  <div class="content">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form header-color="green"> </edit-profile-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
export default {
  components: {
    EditProfileForm,
    // UserCard
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
