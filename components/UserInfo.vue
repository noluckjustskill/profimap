<template>
  <v-card
    class="mx-auto elevation-0 card"
  >
    <h2 class="display-1 font-weight-medium profile">
      Мой профиль
    </h2>
    <v-list-item class="pa-0 profile-content">
      <v-list-item-avatar :size="avatarSize" :color="avatarColor">
        <img v-if="user.picture" :src="user.picture" alt="avatar">
        <span v-else class="display-1 font-weight-light white--text ma-0">{{ userInitials }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline font-weight-medium">
          {{ user.name }}
        </v-list-item-title>
        <!-- <v-list-item-subtitle>Начинающий сценарист</v-list-item-subtitle> -->
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
      avatarColor() {
        return this.$dynamicColor(this.user.name);
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
  .display-1 {
    letter-spacing: -0.1rem !important;
  }
  .font-weight-light {
    font-size: 12px;
    margin-top: 5px;
  }
  .avatar {
    border: 10px solid rgba(0, 0, 0, 0.1);
  }
</style>
