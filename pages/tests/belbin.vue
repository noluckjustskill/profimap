<template>
  <div>
    <h2 class="display-1 page-title">
      Тест Белбина
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
              Для определения естественной для сотрудника роли в коллективе, 
              а также тех ролей, от выполнения которых он предпочитает отказываться.
            </p>
            <v-btn :disabled="!tasks || !tasks.length" color="primary" @click="startTest = true">
              Начать тест
            </v-btn>
          </template>
          <template v-else>
            <v-progress-linear
              :value="Math.round(current/tasks.length * 100)"
              color="accent"
              height="25"
              reactive
            >
              <template v-slot="{ value }">
                <span class="font-weight-light white--text">{{ current }}/{{ tasks.length }}</span>
              </template>
            </v-progress-linear>
            <h3 class="mt-4 mb-0 subtitle-1 font-weight-regular">
              Необходимо распределисть 10 баллов между вопросами.
              Если Вы согласны с каким-либо утверждением на все 100%,
              Вы можете отдать ему все 10 очков. Если же совсем не согласны, то можно выставить 0 баллов.
            </h3>
            <h4 class="mt-1 mr-2 subtitle-2 text-right">
              Осталось баллов: {{ 10 - stepCounter() }}
            </h4>
            <v-layout
              row
              align-center
              justify-space-around
              class="mb-5 mt-3"
            >
              <v-flex
                v-for="(item, i) in tasks[current]"
                :key="i"
                md3
                sm6
                xs12
              >
                <v-card
                  :elevation="3"
                  color="primary"
                  class="card ma-2"
                >
                  <v-card-title 
                    class="card-title subtitle-1 white--text text-center pa-2"
                    v-text="item"
                  />
                  <v-card-actions class="actions">
                    <v-spacer />
                    <v-btn :disabled="!canMinus(i)" icon @click="minus(i)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    {{ counter(i) }}
                    <v-btn :disabled="!canPlus(i)" icon @click="plus(i)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 md4 class="text-center">
                <v-btn
                  :disabled="!current"
                  color="accent"
                  class="mt-6 white--text"
                  @click="back"
                >
                  <v-icon left dark>
                    mdi-arrow-left
                  </v-icon>
                  Назад
                </v-btn>
                <v-btn
                  :disabled="!nextStep"
                  color="accent"
                  class="mt-6 white--text"
                  @click="next"
                >
                  {{ canNext ? 'Далее' : 'Готово' }}
                  <v-icon right dark>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </v-flex>
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
          <p v-if="description" class="body-2">
            {{ description }}
          </p>
          <p v-if="func" class="body-2">
            {{ func }}
          </p>
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
      result: {},

      calculated: null,
      description: null,
      func: null,
    }),
    computed: {
      cardImageHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 120 : 200;
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
      canNext() {
        return this.current < this.tasks.length - 1;
      },
      nextStep() {
        return this.stepCounter() === 10;
      },
    },
    async asyncData({ $axios }) {
      const result = await $axios.$get('belbinResults').catch(() => ({}));
      const tasks = await $axios.$get('getBelbin').catch(() => ([]));

      return {
        tasks,
        hasResult: !isEmpty(result),
        calculated: get(result, 'name'),
        description: get(result, 'descr'),
        func:get(result, 'func'),
      };
    },
    methods: {
      counter(num) {
        return this.result[this.current * 10 + num] || 0;
      },
      stepCounter() {
        return Object.keys(this.result)
          .filter(key => {
            return (
              Number(key) >= this.current * 10 &&
              Number(key) <= this.current * 10 + this.tasks[this.current].length
            );
          }).reduce((acc, curr) => {
            acc += this.result[curr];
            return acc;
          }, 0);
      },
      canMinus(num) {
        return Boolean(this.result[this.current * 10 + num]);
      },
      canPlus() {
        return this.stepCounter() < 10;
      },
      plus(num) {
        const pos = this.current * 10 + num;
        this.result = { // Cuz need call setter
          ...this.result,
          [pos]: (this.result[pos] || 0) + 1,
        };
      },
      minus(num) {
        const pos = this.current * 10 + num;
        this.result = { // Cuz need call setter
          ...this.result,
          [pos]: (this.result[pos] || 0) - 1,
        };
      },
      back() {
        this.current--;
        const from = this.current * 10;
        for (let i = from; i < from + 10; i++) {
          this.result[i] = 0;
        }
      },
      next() {
        if (this.current === this.tasks.length - 1) {
          this.end();
          return;
        }
        this.current++;
      },
      end() {
        this.$axios.$post('postBelbin', {
          result: this.result,
        }).then(response => {
          const { name, descr, func } = response;
          
          if (!name) {
            throw new Error('Can not fetch name');
          }

          this.hasResult = true;
          this.calculated = name;
          this.description = descr;
          this.func = func;
        }).catch(err => {
          console.error(err);
        });
      },
      restart() {
        this.hasResult = false;

        this.startTest = true;
        this.current = 0;
        this.result = {};
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
  .card {
    cursor: default;
  }
  .actions {
    background: white;
  }
  .card-title {
    height: 200px;
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
