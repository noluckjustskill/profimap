<template>
  <v-card
    v-if="items.length"
    class="elevation-0 recomendation"
    tile
  >
    <v-list>
      <v-subheader class="subtitle">
        Вас может заинтересовать:
      </v-subheader>
      <v-list-item-group>
        <v-list-item 
          v-for="(item, i) in computedItems" 
          :key="i" 
        >
          <v-list-item-avatar>
            <v-img :src="item.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-truncate" v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
        <v-btn 
          class="link"
          text
          small 
          color:accent
          @click="showMore=!showMore"
        > 
          {{ showMore ? 'Скрыть' : 'Все рекомендации' }} 
        </v-btn>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        showMore: false,
        items: []
      };
    },
    computed: {
      computedItems: function() {
        if (this.showMore) {
          return this.items;
        } else {
          return this.items.slice(0, 2);
        }
      }
    },
    mounted() {
      this.$axios.$get('recommendations').then(response => {
        this.items = response;
      });
    },
  };
</script>

<style scoped>
.link {
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
