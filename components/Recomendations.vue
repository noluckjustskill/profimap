<template>
  <v-card
    v-if="items.length"
    class="elevation-0 recomendation mt-2"
    tile
  >
    <v-list>
      <v-subheader class="title">
        Вас может заинтересовать:
      </v-subheader>
      <v-layout row wrap class="list ma-0">
        <v-flex
          v-for="(item, n) in computedItems"
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
        <v-flex v-if="items.length > listCount" xs12>
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
      listCount() {
        return this.$vuetify.breakpoint.smAndDown ? 2 : 4;
      },
      computedItems: function() {
        if (this.showMore) {
          return this.items;
        } else {
          return this.items.slice(0, this.listCount);
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
