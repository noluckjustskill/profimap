<template>
  <v-card v-if="!routeHasFeedBack" class="elevation-0 dialog-card">
    <template v-if="!feedBackSent">
      <v-card-title class="headline">
        Оставьте свой отзыв
        <slot />
      </v-card-title>
      <v-card-text class="text-center body-1">
        Оцените пройденный тест, чтобы мы становились ещё лучше!
        <br>
        Возможно, у Вас есть вопросы или пожелания - напишите их тоже
        <v-rating
          v-model="rating"
          background-color="red lighten-3"
          color="primary"
          :large="!isMobile"
          class="mt-2"
        />
        <v-textarea
          v-model="message"
          name="message"
          label="Отзыв"
          :height="120"
          no-resize
          class="ma-0"
        />
        <div class="text-right">
          <v-btn
            :disabled="!rating || sendingInProgress"
            :block="isMobile"
            color="primary"
            rounded
            depressed
            @click="send"
          >
            {{ sendingInProgress ? 'Отправка...' : 'Отправить' }}
          </v-btn>
        </div>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-text class="text-center headline fade-in mt-8 pa-0">
        Ваш отзыв отправлен, спасибо!
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      feedBackSent: false,
      routeHasFeedBack: false,
      message: '',
      rating: 0,
      sendingInProgress: false,
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
    },
    created() {
      this.$axios.$get(`routeFeedback?path=${encodeURIComponent(this.$route.path)}`).then(({ exists }) => {
        this.routeHasFeedBack = exists;
      });
    },
    methods: {
      async send() {
        this.sendingInProgress = true;
        await this.$recaptchaLoaded();
        const recaptchaToken = await this.$recaptcha('homepage');
        if (!this.rating || !recaptchaToken) return;

        this.$axios.$post('sendFeedback', {
          path: this.$route.path,
          rate: this.rating,
          message: this.message,
          recaptchaToken,
        }).then(() => {
          this.feedBackSent = true;
          this.sendingInProgress = false;
          
          setTimeout(() => {
            this.routeHasFeedBack = true;
          }, 3000);
        }).catch(err => {
          console.error(err);
          this.sendingInProgress = false;
        });
      },
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

  .fade-in {
    animation: fadeIn .5s ease-in;
  }

  @keyframes fadeIn {
    0% {opacity: 0;}
    100% {opacity: 1;}
  } 
</style>
