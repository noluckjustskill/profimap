<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results mt-2"
    :class="{'pb-2': hasBelbinResult}"
    tile
  >
    <v-card-title class="title pb-2">
      Роль в команде
    </v-card-title>
    <v-hover
      v-for="type in belbinTypesResult"
      :key="type.id" 
      v-slot:default="{ hover }"
    >
      <v-list-item 
        class="pl-7 pr-7"
      >
        <v-list-item-avatar tile>
          <v-img :src="type.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="type">
            {{ type.name }}
            <template v-if="hasBelbinResult">
              — {{ `${Math.round(type.result * 100)}%` }}
            </template>
          </v-list-item-title>
          <v-list-item-subtitle class="type-text description" :class="{ 'text-truncate': !hover, expand: hover }">
            {{ type.descr }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-hover>
    <div v-if="!hasBelbinResult" class="my-3 text-center">
      <nuxt-link to="/tests/belbin" class="link">
        <h4 class="subtitle-1">
          Узнать свою роль в команде
          <v-icon small>
            mdi-open-in-new
          </v-icon>
        </h4>
      </nuxt-link>
    </div>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        hasBelbinResult: false,
        belbinTypesResult: [],
      };
    },
    created() {
      this.$axios.$get('belbinResults').then(response => {
        this.loaded = true;
        this.hasBelbinResult = (response || []).some(t => t.result);
        this.belbinTypesResult = (response || []).sort((a, b) => b.result - a.result);

        if (this.hasBelbinResult) {
          this.$store.commit('updateProfileProgress', 'belbin');
        }
      });
    },
  };
</script>

<style lang="scss" scoped>
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

.type-text {
  overflow: hidden;
  margin-top: 6px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  text-align: justify;
  white-space: normal;

  &.description {
    white-space: nowrap;
    height: auto;
    max-height: 16px;
    transition: max-height 2.5s ease-out;

    &.expand {
      max-height: 400px;
      white-space: normal;
    }
  }
}
</style>
