<template>
  <div>
    <InviteForm
      :opened="showInviteForm || !userCanContinue"
      :persistent="!userCanContinue"
      @close="showInviteForm = false"
    />
    <h2 class="display-1 page-title font-weight-medium">
      Тест "Командные роли"
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
            <p class="mb-2 font-weight-light">
              В современных профессиях важно уметь работать в команде: придумывать и создавать 
              свои проекты, претворять их в жизнь, набирать людей и налаживать общение между 
              сотрудниками или координировать весь процесс. Пройди тест и узнай свою роль в команде!
              <!-- Для определения естественной для сотрудника роли в коллективе, 
              а также тех ролей, от выполнения которых он предпочитает отказываться. -->
            </p>
            <v-btn
              :disabled="!tasks || !tasks.length"
              rounded
              depressed
              color="primary"
              @click="startTest = true"
            >
              <span class="body-2">Начать тест</span>
            </v-btn>
          </template>
          <template v-else>
            <v-progress-linear
              :value="Math.round(current/tasks.length * 100)"
              color="primary"
              height="25"
              reactive
              class="progress"
            >
              <template>
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
                  :elevation="1"
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
              <v-flex xs12 md4 class="text-center mt-2">
                <v-btn
                  :disabled="!current"
                  width="100"
                  color="primary"
                  class="white--text"
                  rounded
                  depressed
                  @click="back"
                >
                  <span class="body-2">Назад</span>
                </v-btn>
                <v-btn
                  :disabled="!nextStep"
                  width="100"
                  color="primary"
                  class="white--text"
                  rounded
                  depressed
                  @click="next"
                >
                  <span class="body-2">{{ canNext ? 'Далее' : 'Готово' }}</span>
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </div>
        <div v-else class="block second-block">
          <AllTestsForm
            :opened="allTests && checkRestart"
          />
          <h4 class="title mb-2 font-weight-medium">
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
          <RecommendationsTestPage />
          <v-btn
            v-if="activeUser"
            :block="isMobile"
            rounded
            depressed
            exact
            to="/"
            color="primary"
            class="mt-2 mr-1"
          >
            <v-icon left>
              mdi-account
            </v-icon>
            <span class="body-2">Вернуться в профиль</span>
          </v-btn>
          <v-btn
            v-if="activeUser"
            :block="isMobile"
            color="primary"
            rounded
            depressed
            exact
            to="/tests"
            class="mt-2 mr-1"
          >
            <span class="body-2">Выбрать другой тест</span>
          </v-btn>
          <v-btn
            v-if="activeUser"
            :block="isMobile"
            outlined
            rounded
            depressed
            color="primary"
            class="mt-2"
            @click="restart"
          >
            <span class="body-2">Пройти заново</span>
          </v-btn>
          <v-btn
            v-if="!activeUser"
            :block="isMobile"
            color="primary"
            rounded
            depressed
            class="mt-2 mr-1"
            @click="showInviteForm = true"
          >
            <span class="body-2">Сохранить результат</span>
          </v-btn>

          <FeedbackForm />
        </div>
      </v-flex>
    </v-layout>
    <AllTests v-if="hasResult" :curr="testName" />
  </div>
</template>

<script>
  import { get } from 'lodash';
  import InviteForm from '../../components/InviteForm';
  import AllTests from '../../components/AllTests';
  import AllTestsForm from '../../components/AllTestsForm';
  import FeedbackForm from '../../components/Feedback/FeedbackForm';
  import RecommendationsTestPage from '../../components/RecommendationsTestPage';

  const testName = 'belbin';

  export default {
    components: {
      InviteForm,
      AllTests,
      AllTestsForm,
      FeedbackForm,
      RecommendationsTestPage,
    },
    async asyncData({ $axios, store }) {
      const { error } = await $axios.$get('can-continue');
      const [results, tasks] = await Promise.all([
        $axios.$get('belbinResults').catch(() => ([])),
        $axios.$get('getBelbin').catch(() => ([])),
      ]);
      const maxResult = (results || []).sort((a, b) => b.result - a.result).shift();

      return {
        tasks,
        userCanContinue: !error || !store.state.guestFirstTest || store.state.guestFirstTest === testName,
        hasResult: results.some(t => t.result),
        calculated: get(maxResult, 'name'),
        description: get(maxResult, 'descr'),
        func: get(maxResult, 'func'),
      };
    },
    data: () => ({
      testName,
      hasResult: false,

      startTest: false,
      current: 0,
      result: {},

      calculated: null,
      description: null,
      func: null,
      
      userCanContinue: true,
      showInviteForm: false,
      checkRestart: false
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
      activeUser() {
        return this.$store.state.auth.user
          && this.$store.state.auth.user.status === 'active';
      },
      allTests() {
        return this.$store.getters.allTestsDone;
      },
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

          if (!this.activeUser) {
            this.$store.commit('updateGuestFirstTest', testName);
          } else { 
            this.$store.commit('updateProfileProgress', testName); 
          }
          this.checkRestart = true;
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
    head () {
      return {
        title: 'Командные роли',
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'В современных профессиях важно уметь работать в команде: придумывать и создавать свои проекты, претворять их в жизнь, набирать людей и налаживать общение между сотрудниками или координировать весь процесс.',
        }],
      };
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
    @media (max-width: 420px) {
      font-size: 28px !important;
    }
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
    border: 1px solid #E5E5E5;
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
  .body-2 {
    text-transform: none;
  }
  .progress {
    border-radius: 27px;
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
