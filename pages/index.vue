<template>
  <v-layout
    row
    wrap
    align-start
    justify-start
  >
    <v-flex 
      xs12 
      class="block-wrap"
    >
      <v-layout
        row
        wrap
        align-start
        justify-space-between
        class="row"
      >
        <v-flex sm5 md7 xs12>
          <UserInfo />
        </v-flex>
        <v-flex md4 xs12>
          <Recomendation :items="dataForRec" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      lg6 
      md6
      xs12
      class="block-wrap"
    >
      <div class="block">
        <div class="text">
          Гибкие качества
        </div>
        <Learning />
      </div>
    </v-flex>
    <v-flex
      lg6
      md6
      xs12
      class="block-wrap"
    >
      <div class="block">
        <div class="text">
          Навыки
        </div>
        <Skills />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import UserInfo from '../components/UserInfo';
  import Skills from '../components/Skills';
  import Learning from '../components/Charts/Learning';
  import Recomendation from '../components/Recomendations';

  export default {
    middleware: 'auth',
    components: {
      UserInfo,
      Skills,
      Learning,
      Recomendation
    },
    data () {
      return {
        dataForBar: {
          labels: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
          datasets: [
            {
              label: 'Часов в день',
              backgroundColor: '#000000',
              data: [3.4, 2.5, 3.1, 1.2, 3.8, 0.5, 2]
            }
          ]          
        },
        dataForCircle: {
          labels: ['Математика', 'Русский язык'],
          datasets: [
            {
              data: [150, 40],
              backgroundColor: ['#000000', '#C0C0C0'],
            }
          ]
        },
        dataForRec: [
          {
            avatar: require('~/assets/stomo.jpg'),
            name: 'Стоматолог-ортопед'
          },
          {
            avatar: require('~/assets/orto.jpg'),
            name: 'Ортодонт'
          }
        ]
      };
    },
  };
</script>

<style>
  .row {
    max-width: 100%;
    margin: 0 auto;
  }
  .block-wrap {
    padding: 10px;
    box-sizing: border-box;
  }
  .block {
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    /* width: 70%;
    min-width: 300px; */
  }
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
  }
</style>
