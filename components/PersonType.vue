<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results pb-4"
    tile
  >
    <v-card-title class="title">
      Тип личности
    </v-card-title>
    <v-list-item v-if="info.name" class="pl-7">
      <v-list-item-avatar>
        <v-img 
          min-width="55"
          min-height="55"
          :src="info.image" 
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="type">
          {{ info.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="description">
          {{ info.descr }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div v-else class="no-data text-center">
      <h3 class="headline">
        Мы Вас не знаем...
      </h3>
      <nuxt-link to="/tests/klimov" class="link">
        <h4 class="subtitle-1 mt-2">
          Пройдите тест Климова,
          чтобы наша система смогла определить Ваш тип личности
        </h4>
      </nuxt-link>
    </div>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        loaded: false,
      };
    },
    mounted() {
      this.$axios.$get('klimovResults').then(response => {
        this.loaded = true;

        this.info.name = response.name;
        this.info.descr = response.shortText;
        this.info.image = response.image;
      });
    },
  };
</script>

<style scoped>
.no-data {
  margin: 50px 0;
}

.link {
  text-decoration: none;
}

.subtitle-1 {
  color: #1782FF;
  line-height: 1.3rem;
}

.results {
  border: 1px solid #E5E5E5;
  border-radius: 5px;
}

.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: black;
}

.type {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: black;
}
.description {
  margin-top: 6px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  white-space: normal;
}
</style>
