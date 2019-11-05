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
        <v-flex md6 xs12>
          <UserInfo />
        </v-flex>
        <v-flex md6 xs12 class="recommendation">
          <Recomendation :items="recomendations" />
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
          Soft skills
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
      <!-- <Skills> -->
      <PersonType />
    </v-flex>
  </v-layout>
</template>

<script>
  import UserInfo from '../components/UserInfo';
  //import Skills from '../components/Skills';
  import PersonType from '../components/PersonType';
  import Learning from '../components/Charts/Learning';
  import Recomendation from '../components/Recomendations';

  export default {
    components: {
      UserInfo,
      //Skills,
      PersonType,
      Learning,
      Recomendation
    },
    async asyncData({ $axios }) {
      const recomendations = await $axios.$get('recommendations').catch(() => ([]));
      return { recomendations };
    },
  };
</script>

<style scoped lang="scss">
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
    background: white;
  }
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
  }
  .recommendation {
    padding-left: 10px;
    @media (max-width: 959px) {
      padding: 0;
    }
  }
</style>
