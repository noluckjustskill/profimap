<template>
  <v-card
    class="elevation-0 profile-progress"
    tile
  >
    <v-list>
      <v-subheader class="title">
        Прогресс профиля:
      </v-subheader>
      <v-stepper
        :value="stepperValue"
        class="elevation-0"
        @change="nextStep"
      >
        <v-stepper-header class="step-header">
          <template v-for="(step, i) in steps">
            <v-stepper-step
              :key="`step${i}`"
              :step="i + 1"
              :complete="stepperValue > i"
              :editable="stepperValue <= i"
              :style="{ width: `${Math.floor(100 / steps.length)}%` }"
              class="pa-4 step"
            >
              <span class="step-caption text-center pt-2 mx-auto">
                {{ step.text }}
              </span>
            </v-stepper-step>

            <v-divider v-if="i < steps.length - 1" :key="`d${i}`" />
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        initialSteps: [{
          name: 'golland',
          text: 'Тип личности',
          link: '/tests/golland',
        }, {
          name: 'klimov',
          text: 'Проф. область',
          link: '/tests/klimov',
        }, {
          name: 'belbin',
          text: 'Роль в команде',
          link: '/tests/belbin',
        }, {
          name: 'disk',
          text: 'Хар-ка личности',
          link: '/tests/disk',
        }],
      };
    },
    computed: {
      steps() {
        const compareValue = ({ name }) => {
          return this.$store.state.profileProgress[name] ? 1 : 0;
        };

        // To avoid side effect
        return [...this.initialSteps].sort((a, b) => {
          return compareValue(b) - compareValue(a);
        });
      },
      stepperValue() {
        const val = this.initialSteps
          .filter(({ name }) => this.$store.state.profileProgress[name])
          .length;

        return val;
      },
    },
    methods: {
      nextStep(num) {
        this.$router.push(this.steps[num - 1].link);
      },
    },
  };
</script>

<style lang="scss">
.profile-progress {
  border: 1px solid #E5E5E5 !important;
  border-radius: 5px;

  .title {
    font-weight: 500;
    font-size: 20px;
    color: black;
  }

  .step-header {
    height: auto;
    box-shadow: none;
  }

  .v-stepper__label {
    display: flex !important;
  }

  .step {
    display: block;
    text-align: center;

    .step-caption {
      text-shadow: none;
      font-size: 0.75rem;
      font-weight: 500;
      max-width: 100%;
      box-sizing: border-box;
      padding-right: 8px;

      @media only screen and (max-width: 959px) {
        padding-right: 0;
      }

      @media only screen and (max-width: 450px) {
        font-size: 0.70rem;
      }
    }
  }
}

</style>
