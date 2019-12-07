<template>
  <v-app id="inspire">
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

    <v-content>
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
            md="4"
          >
            <v-card v-if="!preloader" class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Вход</v-toolbar-title>
                <div class="flex-grow-1" />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
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
                    <v-flex xs12 class="mb-2">
                      <v-btn
                        block
                        :disabled="!email || !password"
                        color="primary" 
                        type="submit"
                      >
                        Войти
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 md6 :class="!isMobile ? 'pr-2' : 'pb-2'">
                      <v-btn
                        tile
                        outlined
                        icon
                        block
                        color="accent"
                        href="/auth/google" 
                      >
                        <v-icon left>
                          mdi-google
                        </v-icon>
                        Вход через Google
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn
                        tile
                        outlined
                        icon
                        block
                        color="accent"
                        href="/auth/vkontakte" 
                      >
                        <v-icon left>
                          mdi-vk
                        </v-icon>
                        Вход через VK.com
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
    mounted() {
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
          
          this.snackbarText = 'Can not login';
          this.snackbar = true;
        }
      }
    }
  };
</script>

<style scoped>
</style>
