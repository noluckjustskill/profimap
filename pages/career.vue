<template>
  <div>
    <h2 class="display-1 page-title mb-0">
      {{ paidUser ? 'Направления, которые Вам подходят:' : 'Что ждет тебя после тестирования?' }}
    </h2>
    <v-layout
      v-if="paidUser"
      row
      wrap
      align-start
      justify-start
      class="list ma-0"
    >
      <template v-if="!emptyResults">
        <v-layout
          column
          wrap
          style="background-color: white; width: 100%"
        >
          <h3 class="top3-title display-1 mx-auto mt-5 pl-4">
            ТОП-3 направления
          </h3>
          <v-layout 
            row
            wrap
            align-center
            justify-space-between
            class="graphs px-6 mb-5"
          >
            <v-flex
              v-for="(item, i) in professions"
              :key="item.id" 
              xs4
              class="graphs__item text-center"
              style="flex-basis: 0"
            >
              <v-progress-circular
                rotate="-90"
                :size="chartSize(i)"
                :value="item.chartResult"
                :width="chartWidth"
                color="black"
                class="chart"
              >
                <p class="percents mb-0">
                  {{ item.chartResult }}%
                </p>
              </v-progress-circular>
              <p class="mt-3 label">
                {{ item.name }}
              </p>
            </v-flex>
          </v-layout>
        </v-layout>
        <v-card
          v-for="item in fullProfessionsList"
          :key="item.id"
          class="profession"
          outlined
        >
          <v-list-item class="card">
            <v-list-item-content>
              <v-list-item-title class="mainline mt-4 mb-3">
                {{ item.chartResult }}% {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-5">
                <v-layout row wrap class="ma-0">
                  <v-flex xs9>
                    {{ item.smallDescr }}
                  </v-flex>
                  <v-flex xs3 class="avatar-container">
                    <v-img :src="item.image" :width="avatarSize" class="mx-auto" />
                  </v-flex>
                </v-layout>
              </v-list-item-subtitle>
              <!-- <v-list-item-title class="subline mb-3">
                Образовательные курсы по данной профессии:
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-5" style="display: flex">
                {{ item.course }}
                <v-img 
                  :src="require('~/assets/skillbox.png')"
                  :max-width="imageSize"
                  :max-height="imageSize"
                  contain
                  class="mr-4"
                />
                <v-img 
                  :src="require('~/assets/skillfactory.png')"
                  :max-width="imageSize"
                  :max-height="imageSize"
                  class="mr-4"
                  contain
                />
                <v-img 
                  :src="require('~/assets/geekbrains.png')"
                  :max-width="imageSize"
                  :max-height="imageSize"
                  class="mr-4"
                  contain
                />
              </v-list-item-subtitle> -->
              <v-list-item-title class="subline mb-3">
                Направления в ВУЗах, связанные с профессией:
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-2">
                {{ item.education }}
              </v-list-item-subtitle>
              <nuxt-link to="/universities">
                <v-btn
                  :large="buttonSize"
                  rounded
                  depressed
                  color="primary"
                  class="my-3"
                >
                  <span class="body-2">Выбрать вуз</span>
                </v-btn>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <template v-else>
        <div class="list-empty">
          <h2 class="mb-3">
            Для Вас пока нет рекомендаций
          </h2>
          <h3 class="mb-5" style="opacity: 0.6">
            Для получения рекомендаций пройдите тесты
          </h3>
          <nuxt-link to="tests" class="nuxtLink">
            <v-flex xs12>
              <v-btn
                color="primary"
                rounded
                depressed
              >
                К тестам
              </v-btn>
            </v-flex>
          </nuxt-link>
        </div>
      </template> 
    </v-layout>
    <v-layout
      v-else
      row
      wrap
      align-start
      justify-center
    >
      <v-flex
        md4
        sm6
        xs12
        class="block"
      >
        <div class="advantage">
          <v-img :src="require('~/assets/bar-chart.png')" width="50" class="img" />
          <h3>Направления, которые подходят именно тебе</h3>
          <p>По результатам тестирования ты получишь топ-3 наиболее подходящих направления в виде диаграммы</p>
          <v-img :src="require('~/assets/example.png')" width="210" class="img mx-auto mt-2" />
        </div>
      </v-flex>
      <v-flex
        md4
        sm6
        xs12
        class="block"
      >
        <div class="advantage">
          <v-img :src="require('~/assets/edu.png')" width="50" class="img" />
          <h3>Рекомендации по ВУЗам и курсам</h3>
          <p>
            Мы предоставим описание 
            всех подходящих тебе направлений, 
            а также поделимся своими личными рекомендациями по ВУЗам и курсам, 
            которые помогут освоить данные профессии
          </p>
        </div>
      </v-flex>
      <v-flex
        md4
        sm6
        xs12
        class="block"
      >
        <div class="advantage">
          <v-img :src="require('~/assets/cost.png')" width="50" class="img" />
          <h3>Не просто доступ, а целый жизненный путь</h3>
          <p>
            Все еще не знаешь, 
            в какой сфере развиваться? Мы готовы помочь и направить тебя на правильный путь. 
            Безлимитный доступ к тестам и рекомендациям по цене чашки кофе!
          </p>
          <div class="text-center">
            <v-btn
              href="/api/pay"
              rounded
              depressed
              color="primary"
              class="buy-btn"
            >
              <span class="body-2">Купить за 179 рублей</span>
            </v-btn>
            <h4 class="text-center caption mt-3 promocode" @click="promocode = true">
              У меня есть промокод!
            </h4>
            <ActivatePromocode :opened="promocode" @close="promocode = false" />
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import ActivatePromocode from '../components/ActivatePromocode';

  export default {
    components: {
      ActivatePromocode,
    },
    async asyncData({ $axios, store, params, redirect }) {
      if (!store.$auth.user.paid) {
        return;
      }

      const fullProfessionsList = await $axios.$get('recommendations').catch(() => null);
      if (fullProfessionsList) {
        if (fullProfessionsList.length) {
          const max = fullProfessionsList[0].result;
          const min = fullProfessionsList[fullProfessionsList.length-1].result;

          fullProfessionsList.forEach(profession => {
            profession.chartResult = Math.round((profession.result - min) * 100 / (max - min));
          });
          const professions = fullProfessionsList.slice(0, 3);
          const [first, second, third] = professions;

          return { emptyResults: false, professions: [second, first, third], fullProfessionsList };
        }

        return { emptyResults: true, professions: [], fullProfessionsList: [] };
      }

      redirect('/');
    },
    data() {
      return {
        promocode: false,
      };
    },
    computed: {
      paidUser() {
        return Boolean(this.$store.state.auth.user.paid);
      },
      avatarSize() {
        if (this.$vuetify.breakpoint.xsOnly) { 
          return 80;
        } else if (this.$vuetify.breakpoint.smOnly) {
          return 110;
        } else return 150;
      },
      imageSize() {
        if (this.$vuetify.breakpoint.xsOnly) { 
          return 18;
        } else if (this.$vuetify.breakpoint.smOnly) {
          return 35;
        } else return 60;
      },
      buttonSize() {
        return !this.$vuetify.breakpoint.smAndDown;
      },
      chartWidth() {
        return this.$vuetify.breakpoint.xsOnly ? 6 : 11;
      },
    },
    methods: {
      chartSize(index) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return index % 2 ? 75 : 60; 
        } else if (this.$vuetify.breakpoint.smOnly) {
          return index % 2 ? 175 : 150;
        }
        return index % 2 ? 240 : 200;
      },
    },
    middleware: 'authenticated',
  };
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    background-color: transparent;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 50px;
    padding-bottom: 20px;
    border-radius: 5px;
    @media (max-width: 767px) {
      padding: 20px 10px;
    }
    @media (min-width: 768px) and (max-width: 1099px) {
      padding: 30px;
    }
  }
  .card {
    padding: 0 40px;
    @media (max-width: 767px) {
      padding: 0 10px;
    }
    @media (min-width: 769px) and (max-width: 1099px) {
      padding: 0 30px;
    }
  }
  .mainline {
    font-weight: 500;
    font-size: 25px;
    line-height: 29px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 960px) {
      font-size: 20px;
      line-height: 23px;
    }
    @media (max-width: 600px) {
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
    @media (max-width: 960px) {
      font-size: 17px;
      line-height: 20px;
    }
    @media (max-width: 600px) {
      font-size: 12px;
      line-height: 12px;
    }
  }
  .descr {
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    opacity: 0.8;
    @media (max-width: 960px) {
      font-size: 14px;
      line-height: 20px;
    }
    @media (max-width: 600px) {
      font-size: 12px;
      line-height: 12px;
    }
  }
  .course-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    @media (max-width: 960px) {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 600px) {
      width: 20px;
      height: 20px;
    }
  }
  .page-title {
    margin-top: 35px;
    margin-bottom: 15px;
    padding-left: 60px;
    @media (max-width: 799px) {
      margin-top: 15px;
      padding-left: 10px;
    }
    @media (min-width: 800px) and (max-width: 1099px) {
      padding-left: 30px;
    }
  }
  .nuxtLink {
    text-decoration: none;
  }
  .top3-title {
    margin-bottom: 40px;
    @media (max-width: 960px) {
      margin-bottom: 35px;
    }
    @media (max-width: 600px) {
      margin-bottom: 20px;
    }
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
    @media (max-width: 600px) {
      font-size: 10px !important;
    }
  }
  .right-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .graphs {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
  }
  .block {
    font-family: 'Montserrat', sans-serif;
    padding: 30px 20px;

    & .advantage{
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      padding: 25px 10px;
      height: 450px;
      box-sizing: border-box;

      & .img {
        display: block;
        margin-bottom: 10px;
      }

      & h3 {
        margin: 10px 0;
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 25px;
        letter-spacing: 0.05em;
      }

      & p {
        margin: 5px 0;
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 200;
        font-size: 18px;
        line-height: 23px;
      }

      & .buy-btn {
        margin-top: 20px;
      }

      & .promocode {
        color: #868686;
        cursor: pointer;
      }
    }
  }
  .graphs__item {
    .percents {
      font-weight: 500;
      font-size: 29px;
      line-height: 32px;
      @media (max-width: 600px) {
        font-size: 9px;
        line-height: 32px;
      }
    }
    .label {
      font-weight: normal;
      font-size: 25px;
      line-height: 30px;
      text-align: center;
      height: 60px;
      margin-bottom: 0;
      @media (max-width: 960px) {
        height: 40px;
        line-height: 20px;
        font-size: 18px;
      }
      @media (max-width: 600px) {
        font-size: 12px;
        line-height: 15px;
        height: 30px;  
      }
    }
    &:nth-child(odd) {
      .chart, .label {
        margin-top: 26px !important;
        @media (max-width: 960px) {
          margin-top: 16.5px !important;
        }
        @media (max-width: 600px) {
          margin-top: 13.5px !important;
        }
      }
    }
  }
  .profession {
    margin-top: 35px;
    border: none !important;
    @media (max-width: 960px) {
      margin-top: 12px;
    }
    @media (max-width: 600px) {
      margin-top: 5px;
    }

    .avatar-container {
      margin-top: -30px;
    }
  }
</style>
