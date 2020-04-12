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
    <v-dialog v-model="registrationSuccess" persistent>
      <div class="pa-2 white">
        <v-img
          :src="require('~/assets/checked.png')"
          :width="100"
          :height="100"
          class="my-8 mx-auto"
        />
        <h3 class="text-center headline mb-3">
          Успешно! На Вашу почту было отправлено письмо с дальнейшими инструкциями.
        </h3>
      </div>
    </v-dialog>
    <v-layout
      row
      wrap
      align-center
      justify-space-between
      class="ma-0 px-4"
    >
      <v-flex md7 xs12 class="full-h px-6">
        <h1 class="text-center display-1 font-weight-medium mt-2 mb-4">
          Зачем регистрироваться?
        </h1>
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(item, i) in reasons"
            :key="i"
            :icon="item.icon"
            color="primary"
            fill-dot
            large
            class="my-12"
          >
            <v-card
              color="primary"
              dark
              class="py-2"
            >
              <v-card-title class="title">
                {{ item.text }}
              </v-card-title>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <div class="text-center pb-4 hidden-sm-and-up">
          <v-btn
            block
            large
            rounded
            depressed
            color="primary"
            @click="scroll"
          >
            <span class="title">Начать!</span>
          </v-btn>
        </div>
      </v-flex>
      <v-flex
        id="form"
        ref="form"
        md4
        xs12
        class="full-h px-6"
      >
        <v-layout row wrap class="mt-6 px-4 reg-form">
          <v-flex xs12 md6 class="google-btn">
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
        <v-divider class="mt-6" light />
        <v-form class="mt-6" @submit.prevent="register">
          <v-text-field
            v-model="name"
            label="Ваше имя"
            required
            @change="nameInput"
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            @change="emailInput"
          />
          <v-select
            v-model="gender"
            :items="genderList"
            label="Пол"
            item-text="name"
            item-value="key"
          />
          <v-menu
            ref="menu"
            v-model="pickDoB"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateOfBirth"
                label="Дата рождения"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateOfBirth"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              locale="ru-RU"
              @change="saveDoB"
            />
          </v-menu>
          <v-checkbox v-model="acceptRules" hide-details class="mt-0">
            <template v-slot:label class="accept">
              <div class="caption">
                Я принимаю условия 
                <a href="https://profimap.ru/privacypolicy" target="_blank" @click.stop>конфиденциальности</a> и 
                <a href="https://profimap.ru/useragreement" target="_blank" @click.stop>пользовательского соглашения</a>
              </div>
            </template>
          </v-checkbox>
          <v-layout row wrap class="mt-3 px-4">
            <v-flex xs12 class="mb-6">
              <v-btn
                :disabled="!acceptRules || !name || !email || registrationInProgress"
                class="white--text"
                block
                large
                color="accent" 
                type="submit"
              >
                {{ registrationInProgress ? 'Отправка...' : 'Отправить' }}
              </v-btn>
              <v-btn
                to="/login"
                class="white--text mt-2"
                nuxt
                block
                large
                color="#333333" 
              >
                Войти
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    layout: 'login',
    data: () => ({
      registrationSuccess: false,
      registrationInProgress: false,
      email: null,
      name: null,
      gender: null,
      dateOfBirth: null,
      password: null,
      acceptRules: false,
      emailRules: [
        v => !!v || 'E-mail обязателен',
        v => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v) || 'E-mail введён не верно',
      ],
      passwordRules: [v => !!v || 'Необходим пароль'],
      genderList: [{
        key: 'M',
        name: 'Мужской',
      }, {
        key: 'F',
        name: 'Женский',
      }],
      reasons: [
        {
          text: 'Рекомендации в личном профиле',
          icon: 'mdi-account-check',
        },
        {
          text: 'Персональная карьерная карта',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Профориентационные тесты',
          icon: 'mdi-format-list-checkbox',
        },
      ],
      pickDoB: false,
      snackbar: false,
      snackbarText: '',
      preloader: true,
    }),
    watch: {
      pickDoB (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
    },
    methods: {
      scroll() {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 600,
          easing: 'easeInCubic',
        });
      },
      nameInput(val) {
        if (String(val).length > 64) {
          this.name = this.name.slice(0, 64).trim();
        }
      },
      emailInput(val) {
        if (String(val).length > 64) {
          this.email = this.email.slice(0, 64).trim();
        }
      },
      saveDoB(date) {
        this.$refs.menu.save(date);
      },
      async register() {
        this.registrationInProgress = true;
        await this.$recaptchaLoaded();
        const recaptchaToken = await this.$recaptcha('homepage');

        if (!recaptchaToken) {
          this.snackbarText = 'Ошибка валидации';
          this.snackbar = true;
          this.registrationInProgress = false;
          return;
        }
        
        if (!this.acceptRules || !this.email || !this.name) { 
          return;
        }
        const validation = this.emailRules.find(rule => typeof rule(this.email) === 'string');
        if (validation) {
          this.snackbarText = validation(this.email);
          this.snackbar = true;
          return;
        }

        this.$axios.$post('signup', {
          name: this.name,
          email: this.email,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth,
          recaptchaToken,
        }).then(() => {
          this.registrationSuccess = true;
          this.registrationInProgress = false;
        }).catch(err => {
          console.log(err);
          
          this.snackbarText = 'Не удалось зарегистрироваться';
          this.snackbar = true;
          this.registrationInProgress = false;
        });
      },
    },
    head () {
      return {
        title: 'Время выбирать профессию! Куда и как поступать?',
      };
    },
    middleware: 'logged-in',
  };
</script>

<style lang="scss" scoped>
  .page {
    background-color: #F6CAAE;
  }

  #form {
    background: white;
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  .google-btn {
    padding-right: 8px;
    padding-bottom: 0px;

    @media (max-width: 960px) {
      padding-right: 0;
      padding-bottom: 8px
    }
  }

  .title {
    word-break: normal;
  }

  .full-h {
    @media (max-width: 960px) {
      min-height: 100vh;

      .reg-form {
        padding-top: 40px;
      }
    }
  }
</style>
