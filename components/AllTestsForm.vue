<template>
  <v-dialog
    v-model="opened"
    max-width="500"
    height="500"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
  >
    <v-card class="dialog-card">
      <v-card-title class="headline">
        Пройдены все тесты!
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
      <v-card-text class="text-center body-1 pt-5">
        Спасибо что прошли наши тесты. К сожалению, на данный момент это все. 
        Мы только молодой проект и постоянно развиваемся и добавляем новые тесты и возможности. 
        Подписывайтесь на наши соцсети, чтобы следить за нами.
        <div class="links">
          <v-btn
            class="mr-2" 
            href="https://vk.com/profimap"
            target="_blank"
            text
            icon
            x-large
            color="blue"
          >
            <v-icon> mdi-vk </v-icon>
          </v-btn>
          <v-btn 
            href="https://www.instagram.com/prof1map/?igshid=8xyua4f3xstv"
            target="_blank"
            text
            icon
            x-large=""
            color="#FF29F7"
          >
            <v-icon> mdi-instagram </v-icon>
          </v-btn>
        </div>
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
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      }
    },
    methods: {
      close() {
        this.opened = false;
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
  .links{
    margin-left: auto;
    margin-right: auto;
  }
</style>
