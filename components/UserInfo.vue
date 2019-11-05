<template>
  <v-card
    class="mx-auto elevation-0 card"
  >
    <h2 class="display-1 font-weight-medium profile">
      Мой профиль
    </h2>
    <v-list-item class="pa-0 profile-content">
      <v-list-item-avatar :size="avatarSize" :color="$vuetify.theme.themes.light.secondary">
        <img v-if="user.picture" :src="user.picture" alt="avatar">
        <span v-else class="initials">{{ userInitials }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline font-weight-medium">
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
        return this.$store.state.auth.user;
      },
      userInitials() {
        return initials(this.user.name);
      },
      avatarSize() {
        return this.$vuetify.breakpoint.mdAndDown ? 90: 120;
      },
    },
  };
</script>

<style scoped lang="scss">
  .profile {
    margin-bottom: 16px;

    @media (max-width: 960px) {
      margin-bottom: 5px;
    }
  }
  .profile-content {
    @media (max-width: 960px) {
      margin-bottom: 10px;
    }
  }
  .card {
    background-color: transparent !important;
  }
  .initials {
    font-size: 22px;
  }
  .font-weight-light {
    font-size: 12px;
    margin-top: 5px;
  }
</style>
