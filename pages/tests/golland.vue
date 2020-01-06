<template>
  <div>
    <InviteForm
      :opened="showInviteForm || !userCanContinue"
      :persistent="!userCanContinue"
      @close="showInviteForm = false"
    />
    <h2 class="display-1 page-title font-weight-medium">
      Тест "Профессиональный тип личности"
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
              В этом тесте ты разберешься, с кем тебе интересно работать и какого типа задачи выполнять. 
              Выбери те, которые тебе нравятся больше всего.
              <!-- Вам будут предложены 43 пары профессий.
              Из каждой пары вам нужно будет выбрать один вариант, который вам больше нравится и лучше всего подходит,
              но не с точки зрения престижности, а с точки зрения содержания работы и вашего отношения к тому,
              что необходимо делать. Вам нужно определить,
              можете ли вы успешно заниматься данным видом деятельности и хотите ли вы этим заниматься. -->
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
              class="progress"
              color="primary"
              height="25"
              reactive
            >
              <template v-slot="{ value }">
                <span class="font-weight-light white--text">{{ current }}/{{ professions.length }}</span>
              </template>
            </v-progress-linear>
            <h3 class="my-4 font-weight-regular">
              Выберите одну из профессий:
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
                  class="item-card"
                  color="primary"
                  @click="next(i)"
                >
                  <v-img
                    :src="item.image"
                    :height="cardImageHeight"
                    class="white"
                  />
                  <div
                    v-if="hover && !isMobile"
                    :style="{ height: `${cardImageHeight}px`}"
                    class="hint subtitle-1 white--text"
                  >
                    {{ item.descr }}
                  </div>
                  <v-card-title class="card-title subtitle-1 white--text text-truncate">
                    {{ item.name }}
                  </v-card-title>
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
          <p v-if="description" class="body-2 descr">
            {{ description }}
          </p>
          <h4 v-if="recommendations && recommendations.length" class="subtitle-2 mt-10">
            Профессии, которые вам подходят:
          </h4>
          <v-layout row :justify-center="isMobile" class="mt-3 mb-3">
            <v-card
              v-for="(item, i) in recommendations"
              :key="`rcmd${i}`"
              :elevation="1"
              width="200"
              class="rcmd-card mr-3 mb-3"
              color="primary"
              @click="popupClick(item)"
            >
              <v-img
                :src="item.image"
                height="90"
                class="white"
              />
              <v-card-title class="small-title white--text text-truncate">
                {{ item.name }}
              </v-card-title>
            </v-card>
            <v-dialog
              v-model="popup"
              width="500"
              height="500"
              :fullscreen="isMobile"
              :hide-overlay="isMobile"
            >
              <v-card>
                <v-img
                  :src="image"
                  height="300"
                  width="500"
                  class="white"
                />
                <v-btn
                  color="primary"
                  :elevation="0"
                  fab 
                  dark
                  small
                  absolute
                  class="mt-7 close text-center"
                  @click="popup = false"
                >
                  <v-icon small>
                    mdi-close
                  </v-icon>
                </v-btn>
                <v-card-title 
                  class="subtitle-1 mt-4 font-weight-medium"
                >
                  {{ name }}
                </v-card-title>
                <v-card-text class="body-2">
                  {{ descr }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <nuxt-link :to="`/professions/${id}`" class="nuxtLink" target="_blank">
                    <v-btn
                      :block="isMobile"
                      color="primary"
                    >
                      Подробнее
                    </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
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
  import { isEmpty, get } from 'lodash';
  import InviteForm from '../../components/InviteForm';
  import AllTests from '../../components/AllTests';

  const testName = 'golland';

  export default {
    components: {
      InviteForm,
      AllTests,
    },
    head () {
      return {
        title: 'Профессиональный тип личности',
        meta: [{
          hid: 'description',
          name: 'description',
          content: 'В этом тесте ты разберешься, с кем тебе интересно работать и какого типа задачи выполнять.',
        }],
      };
    },
    data: () => ({
      testName,
      hasResult: false,

      startTest: false,
      current: 0,
      result: [],
      popup: false,

      name: null,
      image: null, 
      descr: null,
      id: null,

      calculated: null,
      recommendations: null,
      description: null,

      userCanContinue: true,
      showInviteForm: false,
    }),
    computed: {
      cardImageHeight() {
        return this.$vuetify.breakpoint.xsOnly ? 170 : 275;
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
      const [result, professions] = await Promise.all([
        $axios.$get('gollandProfile').catch(() => ({})),
        $axios.$get('getGolland').catch(() => ([]))
      ]);

      return {
        professions,
        userCanContinue: !error || store.state.guestFirstTest === testName,
        hasResult: !isEmpty(result),
        calculated: get(result, 'name'),
        recommendations: get(result, 'recommendations'),
        description: get(result, 'description'),
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
        this.$axios.$post('postGolland', {
          result: this.result,
        }).then(response => {
          const { name, recommendations = [], description } = response;
          
          if (!name) {
            throw new Error('Can not fetch name');
          }

          this.hasResult = true;
          this.calculated = name;
          this.recommendations = recommendations;
          this.description = description;

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
      popupClick({ id, name, image, smallDescr }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.descr = smallDescr;
        this.popup = true;
      }
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
  .item-card, .rcmd-card {
    border-radius: 27px;
  }
  .text {
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
  .descr {
    line-height: 30px;
    max-width: 590px;
    color:rgba(0, 0, 0, 0.7);
  }
  .item-card {
    cursor: pointer;
    width: 49%;
    max-width: 450px;
    overflow: hidden;

    @media (max-width: 599px) {
      width: 100%;
      max-width: unset;
      margin-bottom: 10px;
    }
  }
  .rcmd-card {
    max-width: 165px;
    height: 125px;
  }
  @keyframes fadeIn{
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  .close {
    top: -20px;
    right: 5px;
  }
  .hint {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    animation: fadeIn ease-in .3s;
  }
  .card-title {
    padding: 10px;
    justify-content: center;
  }
  .caption {
    vertical-align: middle;
  }
  .nuxtLink {
    text-decoration: none;
  }
  .title {
    font-size: 24px;
  }
  .small-title {
    font-size: 14px;
    padding: 0;
    justify-content: center;
  }
</style>
