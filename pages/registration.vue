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
    <v-dialog
      v-model="tutorial"
      width="680"
      overlay-color="white"
      overlay-opacity="0.8"
    >
      <v-card v-if="tutorialText[currentStep]">
        <v-card-title class="headline">
          {{ tutorialText[currentStep].title }}
        </v-card-title>
        <!-- 'key' propety need for retype text on each step -->
        <vue-typed-js
          :key="currentStep"
          :strings="[tutorialText[currentStep].text]"
          :show-cursor="false"
          :type-speed="35"
        >
          <v-card-text class="tutor-text typing px-6" />
        </vue-typed-js>
        <v-card-actions>
          <v-spacer />
          <p class="mb-0 mr-3">
            Шаг {{ currentStep + 1 }} из 4
          </p>
          <v-img class="tutor-logo" :src="require('~/assets/logo.png')" />
          <v-btn 
            rounded
            depressed
            color="primary"
            @click="currentStep++"
          >
            {{ currentStep === 3 ? 'Начать' : 'Далее' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="registrationSuccess">
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
      :class="{ blur: tutorial }"
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
        class="px-6"
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
      currentStep: 0,
      tutorial: true,
      tutorialText: [
        { title: 'Кто мы такие?', text: '- Привет! На нашем сервисе ты сможешь сделать первый шаг к своей будущей карьере в IT… \n- Если считаешь, что пока рано, не нажимай кнопку «Далее»' },
        { title: 'Пройти тестирование', text: '- Прохождение тестов позволит понять твои сильные стороны и узнать в какой области IT они применимы \n- Не забудь пройти их при первой возможности!' },
        { title: 'Профиль', text: '- В профиле ты сможешь подробно посмотреть результаты тестов \n- Графики покажут тебе твои сильные и слабые стороны' },
        { title: 'Первый шаг', text: '- Если ты выбираешь ВУЗ, ищешь стажировку или хочешь сменить работу, наш алгоритм подскажет ТОП профессий, подходящих именно тебе \n- А наша База Данных курсов и ВУЗов, подберет лучшие именно для тебя' },
      ],
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
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      }
    },
    watch: {
      pickDoB (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
      currentStep (val) {
        if (val >= 4) {
          this.tutorial = false;
        }
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

  .blur {
    filter: blur(7px);
  }

  #form {
    background: white;
    margin-bottom: 20px;
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
    word-break: break-word;
  }

  .full-h {
    @media (max-width: 960px) {
      min-height: 100vh;
    }
  }

  .reg-form {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .v-dialog__content {
    @media (min-width: 960px) {
      justify-content: left;
      margin-left: 5%;
    }
  }

  .tutor-logo {
    position: absolute;
    left: 24px;
    bottom: 10px;
    width: 70px;
  }

  .tutor-text {
    min-height: 14vh;
    white-space: pre-line;
  }
</style>
