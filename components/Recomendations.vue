<template>
  <v-card
    v-if="items.length"
    class="elevation-0 recomendation"
    tile
  >
    <v-list>
      <v-subheader class="subtitle-1 font-weight-bold">
        Вас может заинтересовать:
      </v-subheader>
      <v-layout row wrap class="list ma-0">
        <v-flex
          v-for="(item, n) in computedItems"
          :key="n"
          xs6
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="item.image" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="caption" v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <v-flex xs12>
          <v-btn 
            class="link"
            text
            small
            color:accent
            @click="showMore=!showMore"
          > 
            {{ showMore ? 'Скрыть' : 'Все рекомендации' }} 
          </v-btn>
        </v-flex>
      </v-layout>
    </v-list>
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
    data() {
      return {
        showMore: false,
      };
    },
    computed: {
      computedItems: function() {
        console.log(this.items);
        if (this.showMore) {
          return this.items;
        } else {
          return this.items.slice(0, 4);
        }
      }
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
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}

.caption {
  color: #1782FF !important;
}

.subtitle-1 {
  color: black;
}

</style>
