<template>
  <div>
    <h2 class="display-1 page-title">
      {{ paidUser ? 'Профессии в IT, которые вам подходят:' : 'Что ждет тебя после тестирования?' }}
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
        <h2 class="mt-6 mb-6" style="margin: 0 auto">
          ТОП-3 профессии
        </h2>
        <v-layout 
          row
          wrap
          align-end
          justify-space-between
          class="graphs px-7"
        >
          <v-flex
            v-for="(item, i) in chartProfessions"
            :key="item.id" 
            xs4
            class="graphs__item"
            style="flex-basis: 0"
          >
            <v-progress-circular
              rotate="-90"
              :size="chartSize(i)"
              :value="item.chartResult"
              color="black"
              :width="chartWidth"
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
          v-for="item in professions"
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
          professions.slice(0, 3);
          professions.forEach(profession => {
            profession.chartResult = Math.round((profession.result - min) * 100 / (max - min));
          });
        }
        return { emptyResults: !professions.length, professions: professions.slice(0, 3), chartProfessions: [professions[1], professions[0], professions[2] ] };
      } else {
        redirect('/');
      }
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
          return index === 1 ? 70 : 60; 
        } else if (this.$vuetify.breakpoint.smOnly) {
          return index === 1 ? 165 : 150;
        }
        return index === 1 ? 220 : 200;
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
      padding: 10px;
    }
    @media (min-width: 800px) and (max-width: 1099px) {
      padding: 30px;
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
  .percents {
    font-weight: 500;
    font-size: 29px;
    line-height: 32px;
    @media (max-width: 420px) {
      font-size: 9px;
      line-height: 32px;
    }
  }
  .label {
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    text-align: center;
    min-height: 87px;
    @media (max-width: 420px) {
      font-size: 10px;
      line-height: 12px;
      min-height: 36px;  
    }
  }
</style>
