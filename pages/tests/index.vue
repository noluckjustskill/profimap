<template>
  <div>
    <h2 class="display-1 page-title">
      Тестирование
    </h2>
    <!-- <v-layout
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
        <div class="block">
          <v-img
            :src="require('~/assets/gear.png')"
            contain
            width="100%"
            height="174"
          />
          <h3 class="headline text-center h-type">
            Hard skills
          </h3>
          <h2 class="text-center h-discr">
            Оцените свои технические навыки
          </h2>
        </div>
      </v-flex>
      <v-flex
        lg6
        md6
        xs12
        class="block-wrap"
      >
        <div class="block">
          <v-img
            :src="require('~/assets/heart.png')"
            contain
            width="100%"
            height="174"
          />
          <h3 class="headline text-center h-type">
            Soft skills
          </h3>
          <h2 class="text-center h-discr">
            Узнайте о своих социальных навыках
          </h2>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="display-1 page-title second-title">
      Другие тесты
    </h2> -->
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
        <nuxt-link to="tests/golland" class="test-link">
          <div class="block second-block">
            <h3 class="headline test-name">
              Тест Голланда
            </h3>
            <h4 class="subtitle-1 test-descr">
              Оценка профессиональных предпочтений,
              опросник позволяет соотнести склонности, способности, интеллект с различными профессиями.
            </h4>
          </div>
        </nuxt-link>
      </v-flex>
      <v-flex
        xs12
        class="block-wrap"
      >
        <nuxt-link to="tests/klimov" class="test-link">
          <div class="block second-block">
            <h3 class="headline test-name">
              Тест Климова
            </h3>
            <h4 class="subtitle-1 test-descr">
              В основу данного теста положена идея
              о делении всех существующих профессий на 5 типов
              по признаку предмета или объекта, с которым взаимодействует человек в процессе труда.
            </h4>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </div>
</template>

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
    padding: 45px 21%;
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
  .test-link {
    text-decoration: none;
  }
  .test-name {
    color: #1782FF;
  }
  .test-descr {
    color: rgba(0, 0, 0, 0.3);
  }
</style>
