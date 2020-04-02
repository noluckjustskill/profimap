<template>
  <v-dialog
    v-model="isOpened"
    max-width="630"
    height="500"
    :persistent="persistent"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
  >
    <v-card class="dialog-card">
      <v-card-title v-if="!message" class="headline">
        {{ persistent ? 'Для продолжения необходимо авторизоваться' : 'Сохранить результат' }}
        <h4 v-if="persistent" class="hint body-2 text-center mt-2">
          Тебе будут доступны все тесты и информация о себе
        </h4>
        <v-btn
          text
          icon
          small
          class="btn"
          @click="close"
        >
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text v-if="!message">
        <v-form @submit.prevent="signUp">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Имя"
            name="name"
            type="text"
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            name="email"
            type="text"
          />
          <v-layout row wrap class="mt-3 px-2">
            <v-flex xs12 class="mb-2">
              <v-btn
                block
                :disabled="!email || !name || loading"
                color="primary"
                type="submit"
              >
                Отправить
              </v-btn>
            </v-flex>
          </v-layout>
          <h3 class="my-3 text-center subtitle-1">
            ИЛИ
          </h3>
          <v-layout row wrap class="mt-6 px-4">
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
        </v-form>
      </v-card-text>
      <v-card-text v-else class="text-center body-1 pt-5">
        <v-img
          :src="successSignup ? require('~/assets/checked.png') : require('~/assets/fail.png')"
          :width="100"
          :height="100"
          class="mb-2 mx-auto"
        />
        <!-- eslint-disable-next-line -->
        <span v-html="message" />
        <br>
        <v-btn
          v-if="!successSignup"
          :block="isMobile"
          color="primary"
          rounded
          depressed
          class="mt-3"
          @click="message = null"
        >
          Назад
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      },
      persistent: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      email: null,
      name: null,
      emailRules: [
        v => !!v || 'E-mail - обязательное поле',
        v => /.+@.+/.test(v) || 'E-mail указан неверно',
      ],
      nameRules: [v => !!v || 'Имя - обязательное поле'],

      loading: false,
      successSignup: false,
      message: null,
    }),
    computed: {
      isOpened: {
        get() {
          return this.opened;
        },
        set(val) {
          if (!val) {
            this.$emit('close');
          }
        }
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      }
    },
    methods: {
      close() {
        if (this.persistent) {
          this.$router.go(-1);
        } else {
          this.isOpened = false;
        }
      },
      async signUp() {
        this.loading = true;

        await this.$axios.$post('invite', {
          name: this.name,
          email: this.email,
        }).then(() => {
          this.successSignup = true;
          this.message = 'Готово! На твою почту мы отправили письмо с дальнейшими инструкциями';
        }).catch(err => {
          this.successSignup = false;
          this.message = `К сожалению, что-то пошло не так, попробуйте позже<br/>
          или напишите нам на <a href="mailto:help@profimap.ru" style="color: #1782FF">help@profimap.ru</a>`;
          console.error(err);
        });

        this.loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .google-btn {
    padding-right: 8px;
    padding-bottom: 0px;

    @media (max-width: 960px) {
      padding-right: 0;
      padding-bottom: 8px
    }
  }
  .dialog-card {
    max-width: 100%;
  }
  .headline {
    position: relative;
    justify-content: center;
    word-break: break-word;

    .btn {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .hint {
    color: #919191;
  }
</style>
