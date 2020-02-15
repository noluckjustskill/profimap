<template>
  <div>
    <h2 class="display-1 page-title">
      Рекомендации для вас
    </h2>
    <v-layout
      row
      wrap
      align-start
      justify-start
      class="list ma-0"
    >
      <v-flex
        xs12
        class="block-wrap my-2"
      >
        <div class="rank__board">
          <div class="rank__card">
            <div class="rank__card-head">
              <v-avatar
                color="secondary"
                :width="avatarSize"
                :height="avatarSize"
                class="mb-1"
              >
                <v-img v-if="second.image" :src="second.image" />
                <span v-else class="white--text headline">{{ getInitials(second.name) }}</span>
              </v-avatar>
              <h2 class="body-1">
                {{ second.name }}
              </h2>
            </div>
            <div class="rank__card-body" :class="{ selected: selectedProfession.name === second.name }" @click="select(1)">
              <p class="my-2 mx-0 display-1 white--text">
                2
              </p>
            </div>
          </div>
          <div class="rank__card rank__card--big">
            <div class="rank__card-head">
              <v-avatar
                color="secondary"
                :width="avatarSize"
                :height="avatarSize"
                class="mb-1"
              >
                <v-img v-if="first.image" :src="first.image" />
                <span v-else class="white--text headline">{{ getInitials(first.name) }}</span>
              </v-avatar>
              <h2 class="body-1">
                {{ first.name }}
              </h2>
            </div>
            <div class="rank__card-body" :class="{ selected: selectedProfession.name === first.name }" @click="select(0)">
              <p class="my-2 mx-0 display-1 white--text">
                1
              </p>
            </div>
          </div>
          <div class="rank__card rank__card--small">
            <div class="rank__card-head">
              <v-avatar
                color="secondary"
                :width="avatarSize"
                :height="avatarSize"
                class="mb-1"
              >
                <v-img v-if="third.image" :src="third.image" />
                <span v-else class="white--text headline">{{ getInitials(third.name) }}</span>
              </v-avatar>
              <h2 class="body-1">
                {{ third.name }}
              </h2>
            </div>
            <div class="rank__card-body" :class="{ selected: selectedProfession.name === third.name }" @click="select(2)">
              <p class="my-2 mx-0 display-1 white--text">
                3
              </p>
            </div>
          </div>
        </div>
        <v-divider class="mt-3" />
      </v-flex>
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <v-img 
          :src="selectedProfession.image" 
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
            {{ selectedProfession.name }}
          </h3>
          <h4 class="text big">
            {{ selectedProfession.smallDescr }}
          </h4>
        </div>
      </v-flex>
      <v-flex
        sm6
        xs12
        class="block-wrap"
      >
        <div>
          <div v-if="selectedProfession.fullDescr" class="block">
            <h3 class="title sub">
              Задачи
            </h3>
            <h4 class="text small">
              {{ selectedProfession.fullDescr }}
            </h4>
          </div>
          <div v-if="selectedProfession.education" class="block">
            <h3 class="title sub">
              Образование
            </h3>
            <h4 class="text small">
              {{ selectedProfession.education }}
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
          <div v-if="selectedProfession.requirements" class="block">
            <h3 class="title sub">
              Особенности
            </h3>
            <h4 class="text small">
              {{ selectedProfession.requirements }}
            </h4>
          </div>
          <div v-if="selectedProfession.dangerous" class="block">
            <h3 class="title sub">
              Недостатки
            </h3>
            <h4 class="text small">
              {{ selectedProfession.dangerous }}
            </h4>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { initials } from '../utils/userUtils';

  export default {
    computed: {
      avatarSize() {
        return this.$vuetify.breakpoint.smAndDown ? 48 : 64;
      },
    },
    async asyncData({ $axios, params, redirect }) {
      const recommendations = await $axios.$get('recommendations').catch(() => null);
      if (recommendations) {
        const [ first, second, third ] = recommendations;
        return { first, second, third, selectedProfession: first };
      } else {
        redirect('/');
      }
    },
    methods: {
      getInitials(str) {
        return initials(str);
      },
      select(num) {
        this.selectedProfession = [this.first, this.second, this.third][num];
      }
    },
    middleware: 'authenticated',
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

  .rank__board {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
            flex-direction: row;
    flex-wrap: nowrap;
    -webkit-box-pack: center;
            justify-content: center;
    -webkit-box-align: end;
            align-items: flex-end;
    height: 360px;
    max-height: 100%;
    overflow: hidden;
  }
  .rank__card {
    text-align: center;
  }
  h2.body-1 {
    word-break: break-all;
    width: 100px;

    @media (max-width: 799px) {
      width: 60px;
    }
  }
  .rank__card:not(:last-child) {
    margin-right: 5em;

    @media (max-width: 799px) {
      margin-right: 2em;
    }
  }
  .rank__card--big .rank__card-body {
    height: 200px;
  }
  .rank__card--small .rank__card-body {
    height: 100px;
  }
  .rank__card-head {
    margin-bottom: 1em;
  }
  .rank__card-body {
    background: rgb(236, 69, 69);
    cursor: pointer;
    height: 140px;
    width: 100px;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
            flex-direction: column;
    padding: 0.5em 1em;
    transition: all .4s ease-out;

    @media (max-width: 799px) {
      width: 60px;
    }

    &:hover, &.selected {
      height: 180px;
      filter: contrast(2);

      .rank__card--small & {
        height: 130px;
      }

      .rank__card--big & {
        height: 250px;
      }
    }
  }
  .rank__card-foot {
    background: red;
    padding: 0.5em 1em;
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
  .picture {
    border-radius: 27px;
  }
</style>
