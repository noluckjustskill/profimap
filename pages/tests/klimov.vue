<template>
  <div>
    <InviteForm
      :opened="showInviteForm || !userCanContinue"
      :persistent="!userCanContinue"
      @close="showInviteForm = false"
    />
    <h2 class="display-1 page-title font-weight-medium">
      Тест "Профессиональная область"
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
              В какой сфере тебе лучше работать? В этом тесте ты разберешься в своих склонностях к 
              конкретным профессиям. Выбери те, которые привлекают тебя больше всего.
              <!-- Предположим, что после соответствующего обучения Вы сможете выполнить любую работу.
              Но если бы Вам пришлось выбирать только из двух возможностей, что бы Вы предпочли? -->
            </p>
            <v-btn
              :disabled="!professions || !professions.length"
              rounded
              depressed
              color="primary"
              @click="startTest = true"
            >
              <span class="body-2">Начать тест</span>
            </v-btn>
          </template>
          <template v-else-if="result.length < professions.length">
            <v-progress-linear
              :value="Math.round(current/professions.length * 100)"
              color="primary"
              height="25"
              reactive
              class="progress"
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
                  :elevation="hover ? 3 : 1"
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
            </v-layout>
            <div class="mt-6 text-center">
              <v-btn
                :disabled="!current"
                color="primary"
                class="white--text"
                rounded
                depressed
                @click="back"
              >
                <span class="body-2">Предыдущий вопрос</span>
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
          <p v-if="description" class="descr body-2" v-html="description" />
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
    <AllTests v-if="!activeUser && hasResult" :curr="testName" />
  </div>
</template>

<script>
  import { get } from 'lodash';
  import InviteForm from '../../components/InviteForm';
  import AllTests from '../../components/AllTests';

  const testName = 'klimov';

  export default {
    components: {
      InviteForm,
      AllTests,
    },
    head () {
      return {
        title: 'Профессиональная область',
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'В какой сфере тебе лучше работать? В этом тесте ты разберешься в своих склонностях к конкретным профессиям.',
        }],
      };
    },
    data: () => ({
      testName,
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
    async asyncData({ $axios, store }) {
      const { error } = await $axios.$get('can-continue');
      const [results, professions] = await Promise.all([
        $axios.$get('klimovResults').catch(() => ([])),
        $axios.$get('getKlimov').catch(() => ([])),
      ]);
      const maxResult = (results || []).sort((a, b) => b.result - a.result).shift();

      return {
        professions,
        userCanContinue: !error || store.state.guestFirstTest === testName,
        hasResult: results.some(t => t.result),
        calculated: get(maxResult, 'name'),
        description: get(maxResult, 'fullText'),
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

          if (!this.activeUser) {
            this.$store.commit('updateGuestFirstTest', testName);
          }
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
    border-radius: 43px;
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
  .descr {
    line-height: 30px;
    max-width: 590px;
    color:rgba(0, 0, 0, 0.7);
  }
</style>
