<template>
  <v-card
    class="elevation-0 recomendation mt-2"
    tile
  >
    <v-list v-if="items.length">
      <v-subheader class="title">
        Направления в IT, которые вам подходят:
      </v-subheader>
      <v-layout 
        row 
        wrap 
        class="list ma-0"
      >
        <v-flex
          v-for="(item, n) in items"
          :key="n"
          sm6
          xs12
        >
          <nuxt-link :to="`professions/${item.id}`" class="nuxtLink">
            <v-list-item>
              <v-list-item-avatar class="mr-3">
                <v-img :src="item.image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="caption" v-text="item.name" />
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-flex>
      </v-layout>
      <div class="text-center">
        <v-btn 
          class="link"
          text
          small
          color:accent
          to="career"
        > 
          {{ 'Подробнее' }} 
        </v-btn>
      </div>
    </v-list>
    <v-layout 
      v-else
      row 
      wrap 
      class="list ma-0 pb-4"
    >
      <v-card-title>Для Вас пока нет рекомендаций</v-card-title>
      <v-card-subtitle class="pb-2">
        Для получения рекомендаций пройдите тесты
      </v-card-subtitle>
      <v-card-text class="text-center py-0">
        <v-btn 
          class="link"
          text
          small
          color:accent
          to="tests"
        > 
          {{ 'К тестам' }} 
        </v-btn>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped lang="scss">
.list {
  width: 100%;

  .v-card {
    border: 0;
  }
}
.link {
  text-decoration: none;
  font-size: 12px;
  line-height: 14px;
  margin-left: 16px;
  color: #1782FF;
}

.recomendation {
  border: 1px solid #E5E5E5;
  border-radius: 5px;
}

.caption {
  color: #1782FF !important;
}

.title {
  font-weight: 500;
  font-size: 20px;
  color: black;
}

.nuxtLink {
  text-decoration: none;
}

</style>
