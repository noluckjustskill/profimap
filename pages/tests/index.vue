<template>
  <div>
    <h2 class="display-1 font-weight-medium page-title">
      Тестирование
    </h2>
    <v-layout
      row
      wrap
      align-start
      justify-start
    >
      <v-flex
        lg6 
        md6
        xs12
        class="block-wrap"
      >
        <nuxt-link to="tests/golland" class="test-link">
          <div class="block">
            <v-img
              :src="require('~/assets/golland-icon.png')"
              contain
              width="100%"
              height="174"
            />
            <h3 class="headline font-weight-medium text-center mt-8 mb-2">
              Тест "Профессиональный тип личности"
            </h3>
          </div>
        </nuxt-link>
      </v-flex>
      <v-flex
        lg6
        md6
        xs12
        class="block-wrap"
      >
        <nuxt-link to="tests/klimov" class="test-link">
          <div class="block">
            <v-img
              :src="require('~/assets/klimov-icon.png')"
              contain
              width="100%"
              height="174"
            />
            <h3 class="headline font-weight-medium text-center mt-8 mb-2">
              Тест<br>"Профессиональная область"
            </h3>
          </div>
        </nuxt-link>
      </v-flex>
      <v-flex
        lg6
        md6
        xs12
        class="block-wrap"
      >
        <nuxt-link to="tests/belbin" class="test-link">
          <div class="block">
            <v-img
              :src="require('~/assets/belbin-icon.png')"
              contain
              width="100%"
              height="174"
            />
            <h3 class="headline font-weight-medium text-center mt-8 mb-2">
              Тест<br>"Командные роли"
            </h3>
          </div>
        </nuxt-link>
      </v-flex>
      <v-flex
        lg6
        md6
        xs12
        class="block-wrap"
      >
        <nuxt-link to="tests/disk" class="test-link">
          <div class="block">
            <v-img
              :src="require('~/assets/disk-icon.png')"
              contain
              width="100%"
              height="174"
            />
            <h3 class="headline font-weight-medium text-center mt-8 mb-2">
              Тест<br>"Характеристика личности"
            </h3>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: 'Тестирование',
      };
    },
    middleware: 'authenticated',
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
    padding: 45px 15%;
    box-sizing: border-box;
    background: white;
  }
  .block.second-block {
    padding: 50px;

    @media (max-width: 599px) {
      padding: 10%;
    }
  }
  .test-link {
    text-decoration: none;
  }
  .headline {
    color: rgba(0, 0, 0, 0.9);
  }
</style>
