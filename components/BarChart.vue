<script>
  import { Bar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default { 
    extends: Bar,
    mixins: [reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              barThickness: 9
            }],
          }
        }
      };
    },
    mounted () {
      this.renderChart(this.chartData, this.options);
    }
  };
</script>

