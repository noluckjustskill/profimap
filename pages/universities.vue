<template>
  <div>
    <h2 class="display-1 page-title">
      Выбор ВУЗа
    </h2>
    <v-card
      v-for="item in data"
      :key="item.id"
      class="mt-6"
      outlined
      style="border: none;"
    >
      <v-list-item>
        <v-list-item-content class="mx-3">
          <v-list-item-title class="mainline mb-2">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="descr mb-3">
            {{ item.smallDescr }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="right-block ml-0">
          <v-list-item-avatar :size="avatarSize" class="mr-0">
            <v-img :src="item.image" />
          </v-list-item-avatar>
          <v-card-actions>
            <v-btn
              :height="buttonHeight"
              rounded
              depressed
              color="primary"
            >
              <span class="body-2">Выбрать вуз</span>
            </v-btn>
          </v-card-actions>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
  export default {
    // async asyncData({ $axios, params, redirect }) {
    //   const recommendations = await $axios.$get('recommendations').catch(() => null);
    //   if (recommendations) {
    //     const [ first = {}, second = {}, third = {} ] = recommendations;
    //     first.color = '#E23B3B';
    //     second.color = '#FFD037';
    //     third.color = '#66BAED';
    //     const data = [first, second, third];
    //     const sum = data.reduce((a, b) => a + b.result, 0);
    //     data.forEach(profession => {
    //       profession.result = Math.round(profession.result / sum * 100);
    //     });
    //     return { first, second, third, emptyResults: !recommendations.length, data };
    //   } else {
    //     redirect('/');
    //   }
    // },
    data() {
      return {
        data: [
          { name: 'МГТУ им. Баумана', city: 'Москва', descr: '', image: 'https://sun9-50.userapi.com/c857636/v857636440/161298/cDe7P4m65ug.jpg' },
          { name: 'ИТМО', city: 'Санкт-Петербург', descr: '', image: 'https://sun9-50.userapi.com/c857636/v857636440/161298/cDe7P4m65ug.jpg' },
        ]
      };
    },
    computed: {
      avatarSize() {
        if (this.$vuetify.breakpoint.xsOnly) { 
          return 80;
        } else if (this.$vuetify.breakpoint.smOnly) {
          return 110;
        } else return 150;
      },
      buttonHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 24 : 36;
      },
    },
  };
</script>

<style scoped lang="scss">
  .mainline {
    font-weight: 500;
    font-size: 25px;
    line-height: 29px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 800px) {
      font-size: 20px;
      line-height: 23px;
    }
    @media (max-width: 420px) {
      font-size: 15px;
      line-height: 18px;
    }
  }
  .subline {
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 800px) {
      font-size: 17px;
      line-height: 20px;
    }
    @media (max-width: 420px) {
      font-size: 10px;
      line-height: 12px;
    }
  }
  .descr {
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 800px) {
      font-size: 17px;
      line-height: 20px;
    }
    @media (max-width: 420px) {
      font-size: 10px;
      line-height: 12px;
    }
  }
  .course-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    @media (max-width: 800px) {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 420px) {
      width: 20px;
      height: 20px;
    }
  }
  .page-title {
    margin-top: 35px;
    margin-bottom: 15px;
  }
  .nuxtLink {
    text-decoration: none;
  }
  .list-empty {
    display: flex;
    flex-flow: column wrap;
    padding-top: 40px;
    padding-bottom: 80px;
  }
  .v-list-item__title, 
  .v-list-item__subtitle {
    overflow: visible;
    white-space: normal;
  }
  .body-2 {
    text-transform: none;
    @media (max-width: 420px) {
      font-size: 10px !important;
    }
  }
  .right-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
