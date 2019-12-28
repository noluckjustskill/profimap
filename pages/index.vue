<template>
  <v-layout
    row
    wrap
    align-start
    justify-start
    class="mt-5"
  >
    <v-flex 
      xs12 
      class="block-wrap"
    >
      <v-layout
        row
        wrap
        align-end
        justify-space-between
        class="row"
      >
        <v-flex md6 xs12>
          <UserInfo />
        </v-flex>
        <v-flex md6 xs12 class="progress">
          <ProfileProgress />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      lg6 
      md6
      xs12
      class="block-wrap"
    >
      <Learning />
      <CharacterType />
    </v-flex>
    <v-flex
      lg6
      md6
      xs12
      class="block-wrap"
    >
      <!-- <Skills> -->
      <PersonType />
      <TeamRole />
      <Recomendation :items="recomendations" />
    </v-flex>
  </v-layout>
</template>

<script>
  import UserInfo from '../components/UserInfo';
  import ProfileProgress from '../components/ProfileProgress';
  //import Skills from '../components/Skills';
  import PersonType from '../components/PersonType';
  import TeamRole from '../components/TeamRole';
  import Learning from '../components/Charts/Learning';
  import Recomendation from '../components/Recomendations';
  import CharacterType from '../components/CharacterType';

  export default {
    components: {
      UserInfo,
      ProfileProgress,
      //Skills,
      PersonType,
      TeamRole,
      Learning,
      Recomendation,
      CharacterType,
    },
    async asyncData({ $axios }) {
      const recomendations = await $axios.$get('recommendations').catch(() => ([]));
      return { recomendations };
    },
    middleware: 'authenticated',
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
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
  }
  .progress {
    padding-left: 10px;
    @media (max-width: 959px) {
      padding: 0;
    }
  }
</style>
