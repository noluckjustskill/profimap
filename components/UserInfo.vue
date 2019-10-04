<template>
  <v-card
    class="mx-auto elevation-0"
  >
    <v-list-item>
      <v-list-item-avatar :size="avatarSize" :color="$vuetify.theme.themes.light.secondary">
        <img v-if="user.picture" :src="user.picture" alt="avatar">
        <span v-else class="initials">{{ userInitials }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle>Начинающий сценарист</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  import { initials } from '../utils/userUtils';

  export default {
    computed: {
      user() {
        // return this.$store.state.auth.user; <= presentation hotfix
        return {
          name: 'Vasya Pupkin',
          email: 'profimap@gmail.com',
          picture: 'https://wolfsgallery.com/images/works/_huge/charles-cottet-portrait-of-boy-4.jpg',
        };
      },
      userInitials() {
        return initials(this.user.name);
      },
      avatarSize() {
        return this.$vuetify.breakpoint.mdAndDown ? 100: 160;
      },
    },
  };
</script>

<style>
  .initials {
    font-size: 22px;
  }
  .font-weight-light {
    font-size: 12px;
    margin-top: 5px;
  }
</style>
