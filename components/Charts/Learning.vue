<template>
  <v-card
    class="elevation-0 skills pb-4"
    tile
  >
    <v-card-title class="title">
      Тип личности
    </v-card-title>
    <Preloader v-if="!myChart && !noData" :width="loaderSize" :height="loaderSize" />
    <canvas ref="canvas" height="250" class="px-4" />
    <div v-if="myChart && noData" class="my-3 text-center">
      <nuxt-link to="/tests/golland" class="link">
        <h4 class="subtitle-1">
          Узнать свой тип личности
          <v-icon small>
            mdi-open-in-new
          </v-icon>
        </h4>
      </nuxt-link>
    </div>
  </v-card>
</template>

<script>
  import Chart from 'chart.js';
  import hexToRgba from 'hex-to-rgba';

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
                title: (tooltipItems, data) => {
                  return data.labels[tooltipItems[0].index];
                },
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
        return this.$vuetify.breakpoint.smAndDown ? 160 : 250;
      },
    },
    mounted() {
      this.fetchResult();
    },
    methods: {
      async fetchResult() {
        const ctx = this.$refs.canvas;
        const result = await this.$axios.$get('gollandResults');
        
        this.noData = !Object.values(result).every(Boolean);

        if (!this.noData) {
          this.$store.commit('updateProfileProgress', 'golland');
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
  .skills {
    border: 1px solid #E5E5E5;
    border-radius: 5px;
  }
  .link {
    text-decoration: none;
  }
  .subtitle-1 {
    color: #1782FF;
    line-height: 1.3rem;
  }
</style>
