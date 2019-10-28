<template>
  <div>
    <Preloader v-if="!myChart && !noData" :width="loaderSize" :height="loaderSize" />
    <canvas ref="canvas" height="250" />
    <div v-if="!myChart && noData" class="no-data text-center">
      <h3 class="headline">
        Для Вас нет статистики :(
      </h3>
      <nuxt-link to="/tests/golland" class="link">
        <h4 class="subtitle-1 mt-2">
          Пройдите тест Голланда,
          чтобы наша система смогла узнать вас получше
        </h4>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import hexToRgba from 'hex-to-rgba';
  import { isEmpty } from 'lodash';

  import Preloader from '../Preloader';

  export default {
    components: {
      Preloader,
    },
    data() {
      return {
        myChart: null,
        noData: false,
        config: {
          type: 'radar',
          options: {
            legend: null,
            title: {
              display: false,
            },
            scale: {
              ticks: {
                beginAtZero: true
              }
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 15,
              }
            },
            tooltips: {
              enabled: true,
              callbacks: { // https://github.com/chartjs/Chart.js/issues/6188#issuecomment-497251833
                label: (tooltipItem, data) => {
                  return 'Уровень : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                }
              },
            },
          }
        },
      };
    },
    computed: {
      bgColor() {
        return hexToRgba(this.$vuetify.theme.themes.light.primary, 0.2);
      },
      loaderSize() {
        return this.$vuetify.breakpoint.smAndDown ? 150 : 200;
      },
    },
    mounted() {
      this.fetchResult();
    },
    methods: {
      async fetchResult() {
        const ctx = this.$refs.canvas;
        const result = await this.$axios.$get('softSkills');
        
        if (isEmpty(result)) {
          this.noData = true;
          ctx.classList.add('d-none');

          return;
        }

        const config = {
          ...this.config, 
          data: {
            labels: Object.keys(result),
            datasets: [{
              backgroundColor: this.bgColor,
              pointBackgroundColor: this.$vuetify.theme.themes.light.primary,
              data: Object.values(result).map(v => v * 100),
            }],
          },
        };

        this.myChart = new Chart(ctx, config);
      },
    },
  };
</script>

<style scoped>
  .no-data {
    margin: 50px 0;
  }
  .link {
    text-decoration: none;
  }
  .subtitle-1 {
    color: #1782FF;
    line-height: 1.3rem;
  }
</style>
