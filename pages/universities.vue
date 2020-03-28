<template>
  <div>
    <v-row class="title-row">
      <v-col 
        cols="6" 
        xs="6" 
        md="9" 
        class="pl-0"
      >
        <h2 class="display-1 page-title">
          Выбор ВУЗа
        </h2>
      </v-col>
      <v-col 
        cols="6" 
        xs="6" 
        md="3" 
        class="pr-0"
      >
        <v-select
          v-model="city"
          :items="cities"
          item-text="city"
          item-value="id"
          label="Выберите город"
          dense
          outlined
          style="margin-top: 35px;"
          @change="fetchUniversities"
        />
      </v-col>
    </v-row>
    <v-layout
      row
      wrap
      justify-center
      align-center
      class="layout"
    >
      <v-card
        v-for="item in universities"
        :key="item.id"
        class="mt-6 card"
        outlined
      >
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="mainline mb-3">
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="descr mb-5">
              <v-layout row wrap class="ma-0 pa-0">
                <v-flex xs9>
                  {{ item.description }}
                </v-flex>
                <v-flex xs3 class="avatar-container">
                  <v-img :src="item.image" :width="avatarSize" class="mx-auto" />
                </v-flex>
              </v-layout>
            </v-list-item-subtitle>
            <v-list-item-title class="subline mb-3">
              Подходящие Вам направления:
            </v-list-item-title>
            <v-list-item-subtitle class="directions">
              <v-layout
                row 
                wrap
                class="mx-0 pl-0"
              >
                <v-flex
                  xs12 
                  md6
                >
                  <p class="mb-0" style="color: #1782FF">
                    {{ item.direction1 }}
                  </p>
                  <p>Проходной балл 2019 года: {{ item.passingScore1 }}</p>
                </v-flex>
                <v-flex
                  xs12 
                  md6
                >
                  <p class="mb-0" style="color: #1782FF">
                    {{ item.direction2 }}
                  </p>
                  <p>Проходной балл 2019 года: {{ item.passingScore2 }}</p>
                </v-flex>
              </v-layout>
            </v-list-item-subtitle>
            <v-btn
              target="_blank"
              :href="item.link"
              :large="buttonSize"
              rounded
              depressed
              color="primary"
              style="flex-basis: auto"
            >
              <span class="body-2">Перейти на сайт</span>
            </v-btn>
          </v-list-item-content>

          <!-- <v-list-item-action class="right-block ml-0">
            <v-list-item-avatar :size="avatarSize" class="avatar mr-0">
              <v-img src="https://sun9-54.userapi.com/xDCjYqfcoY34ExqjIlQseUr17f9SX51Q0w817w/HjnqqM-JB90.jpg" />
            </v-list-item-avatar>
            <v-card-actions class="pb-8">
              
            </v-card-actions>
          </v-list-item-action> -->
        </v-list-item>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios, params, redirect }) {
      const citiesList = await $axios.$get('getCities').catch(() => null);
      if (citiesList) {
        citiesList.forEach((element, index) => {
          element.id = index + 1;
        });
        const cities = [{ city: 'Все', id: null }].concat(citiesList);
        return { cities };
      } else {
        redirect('/');
      }
    },
    data() {
      return {
        city: null,
        universities: [],
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
      buttonSize() {
        return !this.$vuetify.breakpoint.smAndDown;
      },
    },
    created() {
      this.fetchUniversities();
    },
    methods: {
      fetchUniversities() {
        if (this.city) {
          const city = this.cities.find(elem => elem.id === this.city);
          const cityName = city && city.city;

          if (cityName) {
            this.$axios.get(`getUniversities?city=${cityName}`).then(res => {
              this.universities = res.data;
            });
          }
        } else {
          this.$axios.get('getUniversities').then(res => this.universities = res.data);;
        }
      }
    },
    middleware: ['authenticated', 'paid'],
  };
</script>

<style scoped lang="scss">
  .layout {
    background-color: #ffffff;
    padding: 0 40px;
    margin: 0 10px;
    box-sizing: border-box;
    @media (max-width: 767px) {
      padding: 0 10px;
    }
    @media (min-width: 769px) and (max-width: 1099px) {
      padding: 0 30px;
    }
  }
  .title-row {
    padding: 0 22px;
  }
  .card {
    border: none !important; 
    border-bottom: 1px solid #b3b3b3 !important; 
    border-radius: 0 !important;
    &:last-child {
      border: none !important;
    }
  }
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
      font-size: 12px;
      line-height: 12px;
    }
  }
  .descr {
    font-weight: 300;
    font-size: 18px;
    line-height: 23px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 800px) {
      font-size: 14px;
      line-height: 20px;
    }
    @media (max-width: 420px) {
      font-size: 12px;
      line-height: 12px;
    }
  }
  .avatar {
    border-radius: 0;
  }
  .directions {
    font-weight: 300;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 800px) {
      font-size: 14px;
      line-height: 20px;
    }
    @media (max-width: 420px) {
      font-size: 12px;
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
