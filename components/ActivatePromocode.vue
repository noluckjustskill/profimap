<template>
  <v-dialog
    v-model="isOpened"
    max-width="400"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
  >
    <v-snackbar
      v-model="snackbar"
      top
      right
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>
    <v-card class="dialog-card">
      <v-card-title class="headline">
        Введи свой промокод
        <v-btn
          text
          icon
          small
          class="btn"
          @click="isOpened = false"
        >
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="code"
          label="Промокод"
          outlined
          class="mt-3"
        />
        <div class="text-right">
          <v-btn
            :href="url"
            :disabled="!code"
            rounded
            depressed
            color="primary"
          >
            <span class="body-2">Активировать</span>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      code: null,
      snackbar: false,
      snackbarText: 'Ошибка',
      snackbarColor: 'red',
    }),
    computed: {
      isOpened: {
        get() {
          return this.$store.state.promocode;
        },
        set(val) {
          this.$store.commit('activatePromocode', val);
        }
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
      url() {
        return this.code && `/api/pay?code=${this.code}`;
      },
    },
    methods: {
      showError(message) {
        this.snackbarText = typeof message === 'string' ? message : 'Ошибка';
        this.snackbarColor = 'red';
        this.snackbar = true;
      }
    },
  };
</script>

<style lang="scss" scoped>
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
