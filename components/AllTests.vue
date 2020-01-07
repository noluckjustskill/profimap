<template>
  <div>
    <h3 class="title">
      Ещё тесты:
    </h3>
    <v-layout
      row
      wrap
      justify-center
      align-center
      class="layout"
    >
      <v-flex
        v-for="(test, i) in list"
        :key="i"
        lg4
        sm6
        xs12
        class="block-wrap"
      >
        <nuxt-link :to="test.link" class="test-link">
          <div class="block">
            <v-img
              :src="test.icon"
              contain
              width="100%"
              height="120"
            />
            <h3 class="subtitle-2 text-center my-2">
              {{ test.text }}
            </h3>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      curr: {
        type: String,
        required: true,
      },
    },
    computed: {
      list() {
        return [{
          name: 'golland',
          text: 'Тип личности',
          link: '/tests/golland',
          icon: require('~/assets/golland-icon.png'),
        }, {
          name: 'klimov',
          text: 'Проф. область',
          link: '/tests/klimov',
          icon: require('~/assets/klimov-icon.png'),
        }, {
          name: 'belbin',
          text: 'Роль в команде',
          link: '/tests/belbin',
          icon: require('~/assets/belbin-icon.png'),
        }, {
          name: 'disk',
          text: 'Хар-ка личности',
          link: '/tests/disk',
          icon: require('~/assets/disk-icon.png'),
        }].filter(({ name }) => name !== this.curr);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    color: rgb(90, 90, 90);
    padding-left: 10px;
  }
  .layout {
    padding: 10px;
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
    padding: 20px 10%;
    box-sizing: border-box;
    background: white;
  }
  .test-link {
    text-decoration: none;
  }
  .subtitle-2 {
    color: rgba(0, 0, 0, 0.9);
    word-break: break-word;
  }
</style>
