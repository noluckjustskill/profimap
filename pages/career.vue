<template>
  <div>
    <h2 class="display-1 page-title">
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
        <h3 class="top3-title display-1 mx-auto">
          ТОП-3 направления
        </h3>
        <v-layout 
          row
          wrap
          align-center
          justify-space-between
          class="graphs px-7"
        >
          <v-flex
            v-for="(item, i) in professions"
            :key="item.id" 
            xs4
            class="graphs__item"
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
        <v-card
          v-for="item in professions.sort((a, b) => b.chartResult - a.chartResult)"
          :key="item.id"
          class="profession"
          outlined
        >
          <v-list-item>
            <v-list-item-content class="mx-3">
              <v-list-item-title class="mainline mb-2">
                {{ item.chartResult }}% {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-3">
                {{ item.smallDescr }}
              </v-list-item-subtitle>
              <v-list-item-title class="subline mb-2">
                Образовательные курсы по данной профессии:
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-3">
                {{ item.course }}
              </v-list-item-subtitle>
              <v-list-item-title class="subline mb-2">
                Направления в ВУЗах, связанные с профессией:
              </v-list-item-title>
              <v-list-item-subtitle class="descr mb-3">
                {{ item.education }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="right-block ml-0">
              <v-list-item-avatar :size="avatarSize" class="mr-0">
                <v-img :src="item.image" />
              </v-list-item-avatar>
              <v-card-actions>
                <nuxt-link to="/universities">
                  <v-btn
                    :height="buttonHeight"
                    rounded
                    depressed
                    color="primary"
                  >
                    <span class="body-2">Выбрать вуз</span>
                  </v-btn>
                </nuxt-link>
              </v-card-actions>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
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

      const professions = await $axios.$get('recommendations').catch(() => null);
      if (professions) {
        if (professions.length) {
          const max = professions[0].result;
          const min = professions[professions.length-1].result;

          const [first, second, third] = professions.slice(0, 3).map(profession => ({
            ...profession,
            chartResult: Math.round((profession.result - min) * 100 / (max - min)),
          }));

          return { emptyResults: false, professions: [second, first, third] };
        }

        return { emptyResults: true, professions: [] };
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
      buttonHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 24 : 36;
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
    background-color: white;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 50px;
    padding-bottom: 20px;
    border-radius: 5px;
    @media (max-width: 799px) {
      padding: 20px 10px;
    }
    @media (min-width: 960px) and (max-width: 1099px) {
      padding: 30px;
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
    @media (max-width: 960px) {
      font-size: 17px;
      line-height: 20px;
    }
    @media (max-width: 600px) {
      font-size: 10px;
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
    @media (max-width: 600px) {
      margin-top: 15px;
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
    margin-top: 24px;
    border: none !important;
    @media (max-width: 960px) {
      margin-top: 12px;
    }
    @media (max-width: 600px) {
      margin-top: 5px;
    }
  }
</style>
