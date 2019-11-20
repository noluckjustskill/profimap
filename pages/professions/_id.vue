<template>
  <div>
    <h2 class="display-1 page-title">
      Описание профессии
    </h2>
    <v-layout
      row
      wrap
      align-start
      justify-start
      class="list ma-0"
    >
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <v-img 
          :src="profession.image" 
          max-height="280"
          max-width="460"
          class="picture"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <div class="block">
          <h3 class="title main">
            {{ profession.name }}
          </h3>
          <h4 class="text big">
            {{ profession.smallDescr }}
          </h4>
        </div>
      </v-flex>
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <div>
          <div v-if="profession.fullDescr" class="block">
            <h3 class="title sub">
              Задачи
            </h3>
            <h4 class="text small">
              {{ profession.fullDescr }}
            </h4>
          </div>
          <div v-if="profession.education" class="block">
            <h3 class="title sub">
              Образование
            </h3>
            <h4 class="text small">
              {{ profession.education }}
            </h4>
          </div>
        </div>
      </v-flex>
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <div>
          <div v-if="profession.requirements" class="block">
            <h3 class="title sub">
              Особенности
            </h3>
            <h4 class="text small">
              {{ profession.requirements }}
            </h4>
          </div>
          <div v-if="profession.dangerous" class="block">
            <h3 class="title sub">
              Недостатки
            </h3>
            <h4 class="text small">
              {{ profession.dangerous }}
            </h4>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios, params, redirect }) {
      const profession = await $axios.$get(`getProfession?id=${params.id}`).catch(() => null);
      if (profession) {
        return { profession };
      } else {
        redirect('/');
      }
    },
  };
</script>

<style scoped lang="scss">
  .list {
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
  }
  .row {
    max-width: 100%;
    margin: 0 auto;
  }
  .page-title {
    padding-left: 10px;
    margin-top: 35px;
    margin-bottom: 15px;
  }
  .page-title.second-title {
    margin-top: 50px;
  }
  .block-wrap {
    padding: 10px;
    box-sizing: border-box;
  }
  .block {
    border: none;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .text {
    color: rgba(0, 0, 0, 0.6);
    font-weight: normal;
  }
  .text.big {
    font-size: 20px;
  }
  .text.small {
    font-size: 16px;
  }
  .title {
    font-weight: 500;
    color: black;
  }
  .title.main {
    font-size: 24px;
  }
  .title.sub {
    font-size: 18px;
  }
  .picture {
    border-radius: 27px;
  }
</style>
