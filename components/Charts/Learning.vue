<template>
  <div id="chart">
    <canvas ref="canvas" height="300" />
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import hexToRgba from 'hex-to-rgba';

  export default {
    data() {
      return {
        myChart: null,
        config: {
          type: 'radar',
          data: {
            labels: [
              'Коммуникативные навыки',
              'Работа в команде',
              'Менеджмент',
              'Адаптируемость',
              'Стрессоустойчивость',
              'Рабочая этика',
              'Энтузиазм',
              'Креативность',
            ],
            datasets: [{
              label: 'My First dataset',
              backgroundColor: this.bgColor,
              pointBackgroundColor: 'black',
              data: [
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor()
              ]
            }]
          },
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
            tooltips: {
              enabled: true,
              callbacks: { // https://github.com/chartjs/Chart.js/issues/6188#issuecomment-497251833
                label: (tooltipItem, data) => {
                  return 'Развитие : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                }
              },
            },
          }
        },
      };
    },
    computed: {
      bgColor() {
        return hexToRgba(this.$vuetify.theme.themes.light.secondary, 0.2);
      },
    },
    mounted() {
      const ctx = this.$refs.canvas;
      this.myChart = new Chart(ctx, this.config);
    },
    methods: {
      randomScalingFactor() {
        return Math.max(20, Math.round(Math.random() * 100));
      },
    },
  };
</script>

<style>
</style>
