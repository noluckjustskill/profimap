<template>
  <div>
    <h2 class="display-1 page-title">
      Направления в IT, которые вам подходят:
    </h2>
    <v-layout
      row
      wrap
      align-start
      justify-start
      class="list ma-0"
    >
      <template v-if="!emptyResults">
        <div class="info">
          <v-list class="legend">
            <v-list-item
              v-for="item in data"
              :key="item.id"
            >
              <v-list-item-icon>
                <v-icon :color="item.color">
                  mdi-circle
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div class="accuracy">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div class="progress-bar" v-on="on">
                  <v-progress-circular
                    :value="getProgress"
                    :color="getColor"
                    :size="60"
                    :width="10"
                    :rotate="-90"
                  >
                    {{ getProgress }}%
                  </v-progress-circular>
                  <h4 class="caption mt-1">
                    Точность расчетов
                  </h4>
                </div>
              </template>
              <p class="text-center ma-0">
                Точность зависит от<br>количества пройденных тестов
              </p>
            </v-tooltip>
          </div>
        </div>
        <div class="rank__board">
          <Preloader v-if="!myChart && !noData" :width="loaderSize" :height="loaderSize" />
          <canvas 
            ref="canvas" 
            height="100" 
            width="100" 
          />
        </div>
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
          <v-list-item-title class="subline mb-2">
            Образовательные курсы по данному направлению:
          </v-list-item-title>
          <v-list-item-subtitle class="mb-3">
            <img :src="item.course1" class="course-image">
            <img :src="item.course2" class="course-image">
            <img :src="item.course3" class="course-image">
          </v-list-item-subtitle>
          <v-list-item-title class="subline mb-2">
            Факультеты в ВУЗах, связанные с направлением:
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
  import Chart from 'chart.js';
  import ChartLabels from 'chartjs-plugin-labels';
  import Preloader from '../components/Preloader';
  Chart.plugins.unregister(ChartLabels);

  export default {
    components: {
      Preloader,
    },
    async asyncData({ $axios, params, redirect }) {
      const recommendations = await $axios.$get('recommendations').catch(() => null);
      if (recommendations) {
        const [ first = {}, second = {}, third = {} ] = recommendations;
        first.color = '#E23B3B';
        second.color = '#FFD037';
        third.color = '#66BAED';
        const data = [first, second, third];
        const sum = data.reduce((a, b) => a + b.result, 0);
        data.forEach(profession => {
          profession.result = Math.round(profession.result / sum * 100);
        });
        return { first, second, third, emptyResults: !recommendations.length, data };
      } else {
        redirect('/');
      }
    },
    data() {
      return {
        myChart: null,
        noData: false,
        config: {
          type: 'pie',
        },
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
      getProgress() {
        const count = Object.values(this.$store.state.profileProgress).filter(Boolean).length;
        return count*25;
      },
      getColor() {
        if (this.getProgress <= 25) return 'red';
        else if (this.getProgress <= 50) return 'orange';
        else if (this.getProgress <= 75) return 'yellow';
        else return 'green';
      },
      loaderSize() {
        return this.$vuetify.breakpoint.smAndDown ? 160 : 250;
      },
    },
    mounted() {
      this.setChart();
    },
    methods: {
      setChart() {
        const ctx = this.$refs.canvas;

        const config = !this.noData ? {
          ...this.config, 
          data: {
            labels: this.data.map(v => v.name),
            datasets: [{
              data: this.data.map(v => v.result),
              backgroundColor: [this.first.color, this.second.color, this.third.color]
            }],
          },
          plugins: [ChartLabels],
          options: {
            plugins: {
              labels: {
                render: 'value',
                fontColor: '#fff',
                fontSize: 30,
              }
            },
            legend: {
              display: false,
            }
          }
        } : {
          ...this.config, 
          data: { 
            datasets: [{
              data: [0, 0, 0],
            }]
          },
        };
        this.myChart = new Chart(ctx, config);
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
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .legend {
        max-width: 80%;
        .v-list-item {
          padding: unset;
          min-height: unset;
          &__icon {
            margin: 5px 20px 5px 0;
          }
          &__content {
            padding: unset;
          }
          &__title {
            font-size: 20px;
            font-weight: 500;
            opacity: 0.8;
            @media (max-width: 800px) {
              font-size: 16px;
            }
            @media (max-width: 420px) {
              font-size: 12px;
            }
          }
        }
      }
      .accuracy {
        max-width: 70px;
        .progress-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
    }

    .rank__board {
      margin: 0 auto;
      height: 400px;
      max-height: 100%;
      width: 400px;
      max-width: 100%;
      overflow: hidden;
      margin-top: -30px;
      margin-bottom: 50px;
      @media (max-width: 420px) {
        height: 100vw;
        margin-top: 20px;
        margin-bottom: 0;
        order: -1;
      }
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
  .v-application {
    .info {
      background-color: #fff !important;
    }
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
