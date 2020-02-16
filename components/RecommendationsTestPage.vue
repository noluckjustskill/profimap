<template>
  <div>
    <h4 v-if="recommendations && recommendations.length" class="subtitle-2 mt-10">
      Направления в IT, которые вам подходят:
    </h4>
    <v-layout row :justify-center="isMobile" class="mt-3 mb-3">
      <v-card
        v-for="(item, i) in recommendations"
        :key="`rcmd${i}`"
        :elevation="1"
        width="200"
        class="rcmd-card mr-3 mb-3"
        color="primary"
        @click="popupClick(item)"
      >
        <v-img
          :src="item.image"
          height="90"
          class="white"
        />
        <v-card-title class="small-title white--text text-truncate">
          {{ item.name }}
        </v-card-title>
      </v-card>
      <v-dialog
        v-model="popup"
        width="500"
        height="500"
        :fullscreen="isMobile"
        :hide-overlay="isMobile"
      >
        <v-card>
          <v-img
            :src="image"
            height="300"
            width="500"
            class="white"
          />
          <v-btn
            color="primary"
            :elevation="0"
            fab 
            dark
            small
            absolute
            class="mt-7 close text-center"
            @click="popup = false"
          >
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
          <v-card-title 
            class="subtitle-1 mt-4 font-weight-medium"
          >
            {{ name }}
          </v-card-title>
          <v-card-text class="body-2">
            {{ descr }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <nuxt-link :to="`/professions/${id}`" class="nuxtLink" target="_blank">
              <v-btn
                :block="isMobile"
                color="primary"
              >
                Подробнее
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      recommendations: [],
      popup: false,
      name: null,
      image: null, 
      descr: null,
      id: null,
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly;
      },
    },
    mounted() {
      this.$axios.$get('recommendations').then(response => {
        this.recommendations = response;
      }).catch(() => ({}));
    },
    methods: {
      popupClick({ id, name, image, smallDescr }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.descr = smallDescr;
        this.popup = true;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .rcmd-card {
    max-width: 165px;
    height: 125px;
  }
  .close {
    top: -20px;
    right: 5px;
  }
  .nuxtLink {
    text-decoration: none;
  }
  .small-title {
    font-size: 14px;
    padding: 0;
    justify-content: center;
  }
</style>
