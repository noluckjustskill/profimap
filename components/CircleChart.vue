<script>
  import { Pie, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default { 
    extends: Pie,
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
          cutoutPercentage: 90,
        }
      };
    },
    mounted () {
      this.renderChart(this.chartData, this.options);
    }
  };
</script>

