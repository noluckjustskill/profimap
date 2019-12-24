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
    <v-footer 
      app
    >
      <span>&copy; 2019</span>
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
        itemsBar: [
          {
            icon: 'mdi-star-circle',
            title: 'Портфолио',
            to: '/'
          },
          {
            icon: 'mdi-star-circle',
            title: 'Тестирование',
            to: '/tests'
          }
        ],
      };
    },
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.mdAndDown;
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

<style scoped>
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
  }
  .header-layout{
    max-width: 1016px;
    margin: 0 auto;
  }
</style>
