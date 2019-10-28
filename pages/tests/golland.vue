<template>
  <div>
    <h2 class="display-1 page-title">
      Тест Голланда
    </h2>
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
        <div class="block second-block">
          <template v-if="!startTest">
            <h4 class="title">
              Что это?
            </h4>
            <p class="my-2 font-weight-light">
              Вам будут предложены 43 пары профессий.
              Из каждой пары вам нужно будет выбрать один вариант, который вам больше нравится и лучше всего подходит,
              но не с точки зрения престижности, а с точки зрения содержания работы и вашего отношения к тому,
              что необходимо делать. Вам нужно определить,
              можете ли вы успешно заниматься данным видом деятельности и хотите ли вы этим заниматься.
            </p>
            <v-btn :disabled="!professions || !professions.length" color="primary" @click="startTest = true">
              Начать тест
            </v-btn>
          </template>
          <template v-else-if="result.length < professions.length">
            <v-progress-linear
              :value="Math.round(current/professions.length * 100)"
              color="primary"
              height="25"
              reactive
            >
              <template v-slot="{ value }">
                <span class="font-weight-light white--text">{{ current }}/{{ professions.length }}</span>
              </template>
            </v-progress-linear>
            <v-layout
              row
              align-center
              justify-space-around
              class="my-5"
            >
              <v-hover v-for="(item, i) in professions[current]" :key="i" v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 8 : 3"
                  class="item-card"
                  color="primary"
                  @click="next(i)"
                >
                  <v-img
                    :src="`img/${item.image}`"
                    :height="cardImageHeight"
                    contain
                    class="white"
                  />
                  <v-card-title class="card-title subtitle-1 white--text text-truncate">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-hover>
              <v-btn
                :disabled="!current"
                color="accent"
                class="mt-6 white--text"
                @click="back"
              >
                <v-icon left dark>
                  mdi-arrow-left
                </v-icon>
                Предыдущий вопрос
              </v-btn>
            </v-layout>
          </template>
          <template v-else>
            <h4 class="title">
              Поздравляем!
            </h4>
            <h4 class="subtitle-1 mt-4 font-weight-medium">
              Ваш тип личности - 
              <template v-if="calculated">
                {{ calculated }}
              </template>
              <template v-else>
                <span class="caption font-weight-light gray">Загружаем</span>
                <v-progress-circular
                  indeterminate
                  size="16"
                  width="2"
                  class="ml-1"
                />
              </template>
            </h4>
            <p v-if="description" class="body-2">
              {{ description }}
            </p>
            <h4 v-if="recommendations && recommendations.length" class="subtitle-2 mt-3">
              Профессии, которые вам подходят:
            </h4>
            <v-layout row :justify-center="isMobile" class="mt-1 mb-3">
              <v-card
                v-for="(item, i) in recommendations"
                :key="`rcmd${i}`"
                width="200"
                class="mr-3 mb-3"
                color="primary"
              >
                <v-img
                  :src="`img/${item.image}`"
                  :height="cardImageHeight / 1.5"
                  contain
                  class="white"
                />
                <v-card-title class="card-title subtitle-2 white--text text-truncate">
                  {{ item.name }}
                </v-card-title>
              </v-card>
            </v-layout>
            <v-btn
              :block="isMobile"
              to="/tests"
              color="primary"
              class="mt-2"
            >
              Выбрать другой тест
            </v-btn>
          </template>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      startTest: false,
      current: 0,
      result: [],
      calculated: null,
      recommendations: null,
      description: null,
    }),
    computed: {
      cardImageHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 120 : 200;
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
    },
    async asyncData({ $axios }) {
      const professions = await $axios.$get('getGolland').catch(() => ([]));
      return { professions };
    },
    methods: {
      next(index) {
        this.result.push(index);
        this.current++;

        if (this.current === this.professions.length) {
          this.end();
        }
      },
      back() {
        if (!this.current) {
          return;
        }

        this.current--;
        this.result.pop();
      },
      end() {
        this.$axios.$post('postGolland', {
          result: this.result,
        }).then(response => {
          const { name, recommendations = [], description } = response;
          
          if (!name) {
            throw new Error('Can not fetch name');
          }

          this.calculated = name;
          this.recommendations = recommendations;
          this.description = description;
        }).catch(err => {
          console.error(err);
        });
      },
    },
  };
</script>

<style scoped lang="scss">
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
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    padding: 45px 125px;
    box-sizing: border-box;
  }
  .block.second-block {
    padding: 50px;
    
    @media (max-width: 599px) {
      padding: 10%;
    }
  }
  .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
  }
  .h-type {
    margin: 35px 0 10px;
    font-weight: 600 !important;
  }
  .h-discr {
    font-size: 1.1rem;
    line-height: 23px;
    opacity: 0.6;
    font-weight: 400;
  }
  .item-card {
    cursor: pointer;
    width: 45%;
    max-width: 350px;

    @media (max-width: 599px) {
      width: 100%;
      max-width: unset;
      margin-bottom: 10px;
    }
  }
  .card-title {
    padding: 10px;
    justify-content: center;
  }
  .caption {
    vertical-align: middle;
  }
</style>
