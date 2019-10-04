<template>
  <v-app light>
    <v-app-bar 
      v-model="drawer"
      clipped-left
      :height="$vuetify.breakpoint.mdAndDown ? 50 : 88"
      app
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
          <UserBar v-if="user" :user="user" />
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
            title: 'Обучение',
            to: '/'
          },
          {
            icon: 'mdi-star-circle',
            title: 'Карьера',
            to: '/career'
          },
          {
            icon: 'mdi-star-circle',
            title: 'Тестирование',
            to: '#'
          }
        ],
        title: 'Vuetify.js',
        tab: null,
      };
    },
    computed: {
      user() {
        // return this.$store.state.auth.user; <= presentation hotfix
        return {
          name: 'Vasya Pupkin',
          email: 'profimap@gmail.com',
          picture: 'https://wolfsgallery.com/images/works/_huge/charles-cottet-portrait-of-boy-4.jpg',
        };
      },
      user() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/login');
      }
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
  .button {
    text-align: right;
    padding: 5px 5px 0 0;
  }
  .content {
    background-color: #fff;
  }
  .burger {
    margin-right: 15px;
  }
  .content .container{
    max-width: 1040px;
  }
  .header-layout{
    max-width: 1040px;
    margin: 0 auto;
  }
</style>
