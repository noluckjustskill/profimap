<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results pb-4 mt-2"
    tile
  >
    <v-card-title class="title">
      Роль в команде
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
    <v-divider v-if="disk.name" class="px-4 py-2" />
    <v-list-item v-if="disk.name" class="pl-7">
      <v-list-item-avatar>
        <v-img 
          min-width="55"
          min-height="55"
          :src="disk.image" 
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="type">
          Тип {{ disk.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="description">
          {{ disk.text }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div v-else class="no-data text-center">
      <nuxt-link to="/tests/belbin" class="link">
        <h4 class="subtitle-1 mt-2">
          Пройдите тест Белбина,
          чтобы узнать Вашу роль в команде
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
        disk: {},
        loaded: false,
      };
    },
    mounted() {
      this.$axios.$get('belbinResults').then(response => {
        this.loaded = true;
        this.info = response;
      });
      this.$axios.$get('diskResults').then(response => {
        this.disk = response;
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
  border: 1px solid #c0c0c0;
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
