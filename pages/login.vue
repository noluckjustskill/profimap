<template>
  <v-app class="page">
    <v-snackbar
      v-model="snackbar"
      top
      right
      :color="$vuetify.theme.themes.light.error"
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-content class="hero" :class="{ white: preloader }">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
            class="cont"
          >
            <v-card v-if="!preloader" class="mx-auto card px-lg-12 px-md-8 px-sm-6">
              <v-card-text>
                <h2 class="title-info mt-6 text-center">
                  Войти с помощью
                </h2>  
                <v-layout row wrap class="mt-6 px-4">
                  <v-flex xs12 md6 :class="!isMobile ? 'pr-2' : 'pb-2'">
                    <v-btn
                      block
                      x-large
                      href="/auth/google" 
                    >
                      <img 
                        class="mr-2" 
                        width="18" 
                        height="18"
                        :src="require('~/assets/icon-google.png')"
                      >
                      Google
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-btn
                      block
                      x-large
                      href="/auth/vkontakte" 
                      color="accent"
                    >
                      <v-icon left>
                        mdi-vk
                      </v-icon>
                      ВКонтакте
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-form class="mt-8" @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Логин"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />

                  <v-layout row wrap class="mt-3 px-4">
                    <v-flex xs12 class="mb-6">
                      <v-btn
                        class="white--text"
                        block
                        large
                        :disabled="!email || !password"
                        color="#333333" 
                        type="submit"
                      >
                        Войти
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
            <Preloader v-if="preloader" :width="300" :height="300" />
          </v-col>
        </v-row>
      </v-container>

      <div class="cube" />
      <div class="cube" />
      <div class="cube" />
      <div class="cube" />
      <div class="cube" />
      <div class="cube" />
    </v-content>
  </v-app>
</template>

<script>
  import Preloader from '../components/Preloader';
  
  export default {
    layout: 'login',
    components: {
      Preloader
    },
    data: () => ({
      drawer: null,
      email: null,
      password: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [v => !!v || 'The input is required'],
      snackbar: false,
      snackbarText: '',
      preloader: true,
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown;
      },
    },
    created() {
      const token = this.$route.query.token;

      if (token) {
        this.$auth.setUserToken(token).catch(() => {
          this.preloader = false;
        });
      } else {
        this.preloader = false;
      }
    },
    methods: {
      async login() {
        if (!this.email || !this.password) return;

        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push('/');
        } catch (e) {
          console.log(e);
          
          this.snackbarText = 'Не удалось авторизоваться';
          this.snackbar = true;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.page::-webkit-scrollbar {
  display: none;
}

.title-info {
  color: #E23B3B;
}

.cont {
  position: relative;
  z-index: 1;
}

.card {
  border-radius: 10px;
}

.hero {
  background-color: #F6CAAE;
  position: relative;
  height: 100vh;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px darken(#E23B3B, 8%);
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 16s ease-in forwards infinite;
  
  &:nth-child(2n) {
    border-color: lighten(#E23B3B, 10%);
  }
  
  &:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
  }
  
  &:nth-child(3) {
    animation-delay: 4s;
    left: 75vw;
    top: 50vh;
  }
  
  &:nth-child(4) {
    animation-delay: 6s;
    left: 90vw;
    top: 10vh;
  }
  
  &:nth-child(5) {
    animation-delay: 8s;
    left: 10vw;
    top: 85vh;
  }
  
  &:nth-child(6) {
    animation-delay: 10s;
    left: 50vw;
    top: 10vh;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);   
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%); 
    opacity: 0;
  }
}
</style>
