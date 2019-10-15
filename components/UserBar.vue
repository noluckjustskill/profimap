<template>
  <v-layout align-center justify-end class="userContainer">
    <v-menu v-model="menu" offset-y offset-x>
      <template v-slot:activator="{ on }">
        <v-avatar 
          :color="$vuetify.theme.themes.light.secondary" 
          :size="$vuetify.breakpoint.mdAndDown ? 32 : 64"  
          class="click"
          v-on="on"
        >
          <img v-if="user.picture" :src="user.picture" alt="avatar">
          <span v-else>{{ userInitials }}</span>
        </v-avatar>
        <div class="hidden-md-and-down userInfo click" v-on="on">
          <div class="userName">
            {{ user.name }}
          </div>
          <div class="userMail">
            {{ subTitle }}
          </div>
        </div>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
  import { initials } from '../utils/userUtils';

  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return { menu: false };
    },
    computed: {
      userInitials() {
        return initials(this.user.name);
      },
      subTitle() {
        return this.user.email;
      },
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
  .click {
    cursor: pointer;
  }

  .userContainer {
    padding-right: 10px;
  }

  .avatar-image {
    object-fit: cover;
  }

  .userInfo {
    padding-left: 10px;
  }

  .userName {
    font-weight: 700;
    font-size: 18px;
  }

  .userMail {
    font-weight: 400;
    font-size: 12px;
  }
</style>
