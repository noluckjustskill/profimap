<template>
  <v-card
    class="elevation-0 recomendation mt-2"
    tile
  >
    <v-layout 
      row 
      wrap 
      class="list ma-0 pb-4"
    >
      <v-card-title>Карьерные рекомендации</v-card-title>
      <v-card-subtitle class="pb-2">
        Узнайте, какие профессии вам подходят
      </v-card-subtitle>
      <v-card-text class="text-center py-0">
        <v-btn 
          class="link"
          text
          small
          color:accent
          to="career"
        > 
          {{ 'Посмотреть' }} 
        </v-btn>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

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
