<template>
  <div>
    <h2 class="display-1 page-title">
      Тест Климова
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
        <div v-if="!hasResult" class="block second-block">
          <template v-if="!startTest">
            <h4 class="title">
              Что это?
            </h4>
            <p class="my-2 font-weight-light">
              Предположим, что после соответствующего обучения Вы сможете выполнить любую работу.
              Но если бы Вам пришлось выбирать только из двух возможностей, что бы Вы предпочли?
            </p>
            <v-btn :disabled="!professions || !professions.length" color="primary" @click="startTest = true">
              Начать тест
            </v-btn>
          </template>
          <template v-else-if="result.length < professions.length">
            <v-progress-linear
              :value="Math.round(current/professions.length * 100)"
              color="accent"
              height="25"
              reactive
            >
              <template v-slot="{ value }">
                <span class="font-weight-light white--text">{{ current }}/{{ professions.length }}</span>
              </template>
            </v-progress-linear>
            <h3 class="my-4 font-weight-regular">
              Выберите предпочитаемый род занятий:
            </h3>
            <v-layout
              row
              align-center
              justify-space-around
              class="my-5"
            >
              <v-hover v-for="(item, i) in professions[current]" :key="i" v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 8 : 3"
                  class="item-card mb-5"
                  color="primary"
                  @click="next(i)"
                >
                  <v-card-title 
                    class="card-title title white--text text-center pa-6"
                    v-text="item.name"
                  />
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
        </div>
        <div v-else class="block second-block">
          <h4 class="title">
            Поздравляем!
          </h4>
          <h4 class="subtitle-1 mt-4 font-weight-medium">
            Ваш результат - 
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
          <!-- eslint-disable-next-line -->
          <p v-if="description" class="body-2" v-html="description" />
          <v-btn
            :block="isMobile"
            color="accent"
            class="mt-2 mr-1"
            @click="restart"
          >
            <v-icon left>
              mdi-cached
            </v-icon>
            Пройти заново
          </v-btn>
          <v-btn
            :block="isMobile"
            to="/tests"
            color="primary"
            class="mt-2"
          >
            Выбрать другой тест
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { isEmpty, get } from 'lodash';

  export default {
    data: () => ({
      hasResult: false,

      startTest: false,
      current: 0,
      result: [],

      calculated: null,
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
      const result = await $axios.$get('klimovResults').catch(() => ({}));
      const professions = await $axios.$get('getKlimov').catch(() => ([]));

      return {
        professions,
        hasResult: !isEmpty(result),
        calculated: get(result, 'name'),
        description: get(result, 'fullText'),
      };
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
        this.$axios.$post('postKlimov', {
          result: this.result,
        }).then(response => {
          const { name, fullText } = response;
          
          if (!name) {
            throw new Error('Can not fetch name');
          }

          this.hasResult = true;
          this.calculated = name;
          this.description = fullText;
        }).catch(err => {
          console.error(err);
        });
      },
      restart() {
        this.hasResult = false;

        this.startTest = true;
        this.current = 0;
        this.result = [];
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
    background: white;
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
    width: 100%;
  }
  .card-title {
    height: 100px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.2;
    word-break: break-word;

    @media (max-width: 599px) {
      height: 150px;
      font-size: 0.9rem !important;
    }
  }
  .caption {
    vertical-align: middle;
  }
</style>
