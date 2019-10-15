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
            <v-card class="elevation-12">
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
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'login',
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
    }),
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
      },
    }
  };
</script>

<style scoped>
  .flex-grow-1 {
    margin-top: 10px;
    text-align: right;
  }
</style>
