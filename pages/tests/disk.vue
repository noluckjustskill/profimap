<template>
  <div>
    <InviteForm
      :opened="showInviteForm || !userCanContinue"
      :persistent="!userCanContinue"
      @close="showInviteForm = false"
    />
    <h2 class="display-1 page-title font-weight-medium">
      Тест "Характеристика личности"
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
              Этот тест проходят для того, чтобы узнать, чем отличается твой характер от остальных, 
              как ты мыслишь и как принимаешь решения. Выбирай наиболее близкие для тебя решения.
              <!-- Определите, как распределить роли в коллективе между сотрудниками, чтобы сделать 
              компанию более эффективной. -->
            </p>
            <v-btn
              :disabled="!questions || !questions.length"
              rounded
              depressed
              color="primary"
              @click="startTest = true"
            >
              <span class="body-2">Поехали!</span>
            </v-btn>
          </template>
          <template v-else-if="result.length < questions.length">
            <v-progress-linear
              :value="Math.round(current/questions.length * 100)"
              color="primary"
              height="25"
              reactive
              class="progress"
            >
              <template v-slot="{ value }">
                <span class="font-weight-light white--text">{{ current }}/{{ questions.length }}</span>
              </template>
            </v-progress-linear>
            <h3 class="my-4 font-weight-regular">
              {{ questions[current].name }}
            </h3>
            <v-layout
              row
              align-center
              justify-center
              class="my-5"
            >
              <v-hover v-for="(item, i) in questions[current].tasks" :key="i" v-slot:default="{ hover }">
                <v-flex
                  xs12
                  sm6
                  lg3
                  class="pa-2"
                >
                  <v-card
                    :elevation="hover ? 3 : 1"
                    class="item-card"
                    color="primary"
                    @click="next(i)"
                  >
                    <v-card-title 
                      class="card-title subtitle-2 white--text text-center pa-6"
                      v-text="item"
                    />
                  </v-card>
                </v-flex>
              </v-hover>
            </v-layout>
            <div class="text-center">
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
            </div>
          </template>
        </div>
        <div v-else class="block second-block">
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
          <!-- eslint-disable-next-line -->
          <p v-if="description" class="body-2" v-html="description" />
          <v-btn
            v-if="activeUser"
            :block="isMobile"
            color="primary"
            rounded
            depressed
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
        </div>
      </v-flex>
    </v-layout>
    <AllTests v-if="!activeUser && hasResult" :curr="'disk'" />
  </div>
</template>

<script>
  import { get } from 'lodash';
  import InviteForm from '../../components/InviteForm';
  import AllTests from '../../components/AllTests';

  export default {
    components: {
      InviteForm,
      AllTests,
    },
    head () {
      return {
        title: 'Характеристика личности',
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'Этот тест проходят для того, чтобы узнать, чем отличается твой характер от остальных, как ты мыслишь и как принимаешь решения.',
        }],
      };
    },
    data: () => ({
      hasResult: false,

      startTest: false,
      current: 0,
      result: [],

      calculated: null,
      description: null,
      
      userCanContinue: true,
      showInviteForm: false,
    }),
    computed: {
      cardImageHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 120 : 200;
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
      activeUser() {
        return this.$store.state.auth.user
          && this.$store.state.auth.user.status === 'active';
      }
    },
    async asyncData({ $axios }) {
      const { error } = await $axios.$get('can-continue');
      const [results, questions] = await Promise.all([
        $axios.$get('diskResults').catch(() => ([])),
        $axios.$get('getDisk').catch(() => ([])),
      ]);
      const maxResult = (results || []).sort((a, b) => b.result - a.result).shift();

      return {
        questions,
        userCanContinue: !Boolean(error),
        hasResult: results.some(t => t.result),
        calculated: get(maxResult, 'name'),
        description: get(maxResult, 'text'),
      };
    },
    methods: {
      next(index) {
        this.result.push(index);
        this.current++;

        if (this.current === this.questions.length) {
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
        this.$axios.$post('postDisk', {
          result: this.result,
        }).then(response => {
          const { name, text } = response;
          
          if (!name) {
            throw new Error('Can not fetch name');
          }

          this.hasResult = true;
          this.calculated = name;
          this.description = text;
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
  .item-card {
    cursor: pointer;
    width: 100%;
  }
  .card-title {
    height: 250px;
    justify-content: center;
    line-height: 1.35;
    word-break: break-word;

    @media (max-width: 959px) {
      font-size: 1.1rem !important;
    }

    @media (max-width: 599px) {
      font-size: 0.95rem !important;
      height: 220px;
    }
  }
  .caption {
    vertical-align: middle;
  }
</style>
