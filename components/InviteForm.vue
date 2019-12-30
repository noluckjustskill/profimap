<template>
  <v-dialog
    v-model="isOpened"
    width="500"
    height="500"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
  >
    <v-card>
      <v-card-title v-if="!message" class="headline">
        Сохранить результат
        <v-btn
          text
          icon
          class="btn"
          @click="isOpened = false"
        >
          <v-icon>
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
        </v-form>
      </v-card-text>
      <v-card-text v-else class="text-center body-1 pt-5">
        <v-img
          :src="require('~/assets/checked.png')"
          :width="100"
          :height="100"
          class="mb-2 mx-auto"
        />
        {{ message }}
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
      }
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
      message: ''
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
      signUp() {
        this.loading = true;

        this.$axios.$post('invite', {
          name: this.name,
          email: this.email,
        }).then(() => {
          this.message = 'Готово! На твою почту мы отправили письмо с дальнейшими инструкциями';
        }).catch(err => {
          this.message = 'Что-то пошло не так';
          console.error(err);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .headline {
    position: relative;

    .btn {
      position: absolute;
      right: 24px;
    }
  }
</style>
