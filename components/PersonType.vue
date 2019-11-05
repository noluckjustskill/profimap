<template>
  <v-card
    class="elevation-0 results"
    tile
  >
    <v-card-title class="title">
      Тип личности
    </v-card-title>
    <v-list-item class="pl-7">
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
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          name: '',
          descr: '',
          image: ''
        }
      };
    },
    mounted() {
      this.$axios.$get('klimovResults').then(response => {
        this.info.name = response.name;
        this.info.descr = response.description.short;
        this.info.image = response.description.image;
      });
    },
  };
</script>

<style scoped>
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
