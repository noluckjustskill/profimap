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
        v-for="univer in universities"
        :key="univer.id"
        class="mt-6 card"
        outlined
      >
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="mainline mb-3">
              {{ univer.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="descr mb-5">
              <v-layout row wrap class="ma-0 pa-0">
                <v-flex xs9>
                  {{ univer.description }}
                </v-flex>
                <v-flex xs3 class="avatar-container">
                  <v-img :src="univer.image" :width="avatarSize" class="mx-auto" />
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
                  v-for="direction in univer.universitiesToDirections"
                  :key="direction.id"
                  xs12 
                  md6
                >
                  <p class="mb-0" style="color: #1782FF">
                    {{ direction.directions.name }}
                  </p>
                  <p>Проходной балл 2019 года: {{ direction.score }}</p>
                </v-flex>
              </v-layout>
            </v-list-item-subtitle>
            <v-btn
              target="_blank"
              :href="univer.link"
              :large="buttonSize"
              rounded
              depressed
              color="primary"
              style="flex-basis: auto; flex-grow: unset"
            >
              <span class="body-2">Перейти на сайт</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
  export default {
    watchQuery: true,
    async asyncData({ $axios, query, redirect }) {
      const findString = Object.keys(query)
        .filter(key => query[key])
        .map(key => `${key}=${encodeURIComponent(query[key])}`)
        .join('&');

      const [citiesList, universities] = await Promise.all([
        $axios.$get('getCities').catch(() => []),
        $axios.$get(`getUniversities${findString ? ('?' + findString) : ''}`).catch(() => null),
      ]);

      if (!universities) {
        redirect('/');
        return;
      }

      const cities = [{ city: 'Все', id: null }].concat(citiesList.map((city, i) => ({
        ...city,
        id: i + 1,
      })));

      const city = query.city && cities.find(elem => query.city === elem.city) || null;

      return { city, cities, universities };
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
        const city = this.city && this.cities.find(elem => elem.id === this.city);
        const cityName = city && city.city;
        const query = Object.assign({}, this.$route.query, { city: cityName || undefined });

        this.$router.replace({ query });
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
