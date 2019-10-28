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

                  <div class="flex-grow-1">
                    <v-btn
                      class="ma-2" 
                      tile
                      outlined
                      :icon="hideGoogleText"
                      color="primary"
                      href="/auth/google" 
                    >
                      <v-icon :left="!hideGoogleText">
                        mdi-google
                      </v-icon>
                      {{ !hideGoogleText ? 'Вход через Google' : null }}
                    </v-btn>
                    <v-btn
                      :disabled="!email || !password"
                      color="primary" 
                      type="submit"
                    >
                      Войти
                    </v-btn>
                  </div>
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
      hideGoogleText() {
        return this.$vuetify.breakpoint.xsOnly;
      },
    },
    mounted() {
      const token = this.$route.query.token;

      if (token) {
        this.$auth.setUserToken(token);
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
  .flex-grow-1 {
    margin-top: 10px;
    text-align: right;
  }
</style>
