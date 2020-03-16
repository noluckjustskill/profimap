<template>
  <v-layout align-center justify-end class="userContainer">
    <v-menu v-model="menu" offset-y offset-x>
      <template v-slot:activator="{ on }">
        <v-avatar 
          :color="avatarColor"
          :size="isMobile ? 28 : 36"
          v-on="on"
        >
          <v-img v-if="user.picture" :src="user.picture" />
          <span v-else class="subtitle-1 white--text">{{ userInitials }}</span>
        </v-avatar>
        <div class="hidden-sm-and-down userInfo">
          <div class="userName">
            {{ user.name }}
            <v-btn
              color="gray"
              small
              icon
              v-on="on"
            >
              <v-icon>
                {{ menu ? 'mdi-menu-up' : 'mdi-menu-down' }}
              </v-icon>
            </v-btn>
          </div>
          <!-- <div class="userMail">
            {{ subTitle }}
          </div> -->
        </div>
      </template>
      <v-list>
        <v-list-item to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown;
      },
      userInitials() {
        return initials(this.user.name).charAt(0);
      },
      avatarColor() {
        return this.$dynamicColor(this.user.name);
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
    font-weight: 500;
    font-size: 18px;
  }

  .userMail {
    font-weight: 400;
    font-size: 12px;
  }
</style>
