import Vue from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import Exporting from 'highcharts/modules/exporting';
import Organization from 'highcharts//modules/organization';
import Sankey from 'highcharts/modules/sankey';

export default () => {
  Sankey(Highcharts);
  Organization(Highcharts);
  Exporting(Highcharts);

  Vue.use(HighchartsVue);
};
