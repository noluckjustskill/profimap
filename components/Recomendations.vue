<template>
  <v-card
    class="elevation-0 recomendation"
    tile
  >
    <v-list>
      <v-subheader class="subtitle">
        Вас может заинтересовать:
      </v-subheader>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i" 
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      
        <a class="link" :style="{color: $vuetify.theme.themes.light.accent}" href="#">Все рекомендации</a>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      }
    },
  };
</script>

<style scoped>
.link{
  text-decoration: none;
  font-size: 12px;
  line-height: 14px;
  margin-left: 16px;
  color: #1782FF;
}

.recomendation {
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}

.recomendation.mrg {
  margin-right: 10px !important;
}

.subtitle {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: black;
}
</style>
