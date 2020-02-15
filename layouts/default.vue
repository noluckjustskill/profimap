<template>
  <v-app light>
    <v-app-bar
      v-if="user"
      v-model="drawer"
      clipped-left
      :height="isMobile ? 50 : 88"
      app
      class="bar"
    >
      <v-layout
        row
        wrap
        align-center
        justify-space-between
        class="header-layout"
      >
        <v-flex xs9>
          <HeaderBar :items="itemsBar" />
        </v-flex>
        <v-flex xs3 fill-height>
          <UserBar :user="user" />
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-content class="content">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation
      v-if="user"
      v-model="tab"
      color="primary"
      class="hidden-md-and-up tabs"
    >
      <v-btn v-for="(item, i) in itemsBar" :key="i" :to="item.to">
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer
      app
    >
      <span class="caption">&copy; Profimap | 2019–2020</span>
      <span class="links">
        <v-btn
          class="mr-2" 
          href="https://vk.com/profimap"
          target="_blank"
          text
          icon
          x-small
          color="blue"
        >
          <v-icon> mdi-vk </v-icon>
        </v-btn>
        <v-btn 
          href="https://www.instagram.com/prof1map/?igshid=8xyua4f3xstv"
          target="_blank"
          text
          icon
          x-small
          color="#FF29F7"
        >
          <v-icon> mdi-instagram </v-icon>
        </v-btn>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  import UserBar from '~/components/UserBar.vue';
  import HeaderBar from '~/components/HeaderBar.vue';

  export default {
    components: {
      UserBar,
      HeaderBar,
    },
    data () {
      return {
        drawer: true,
        tab: '/',
        itemsBar: this.$constants.routes,
      };
    },
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown;
      },
      user() {
        const user = this.$store.state.auth.user;
        return user && user.status === 'active' ? user : null;
      },
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/login');
      }
    },
  };
</script>

<style lang="scss" scoped>
  .bar {
    box-shadow: 0px 2px 1px -1px #E5E5E5;
  }
  .button {
    text-align: right;
    padding: 5px 5px 0 0;
  }
  .content {
    background-color: #F8F8F8;
  }
  .burger {
    margin-right: 15px;
  }
  .content .container{
    max-width: 1040px;

    @media (max-width: 600px) {
      padding-bottom: 56px;
    }
  }
  .header-layout{
    max-width: 1016px;
    margin: 0 auto;
  }
  .links{
    margin-left: auto;
    margin-right: 10px;
  }
  .tabs {
    box-shadow: 0px -2px 1px -1px #E5E5E5;
    position: fixed;
    bottom: 36px;
  }
</style>
