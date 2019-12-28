<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results pb-4"
    tile
  >
    <v-card-title class="title">
      Тип личности
    </v-card-title>
    <v-layout justify-space-between align-center class="px-4">
      <v-flex
        v-for="type in typesResult"
        :key="type.id"
        xl3
        sm2
        class="text-center"
      >
        <v-tooltip dark bottom open-on-click>
          <template v-slot:activator="{ on }">
            <v-badge>
              <template v-slot:badge>
                <span v-if="hasResult" class="caption">
                  {{ `${Math.round(type.result * 100)}%` }}
                </span>
              </template>
              <v-img
                :src="type.image"
                width="40"
                height="40"
                v-on="on"
              />
            </v-badge>
          </template>
          <div class="text-center hint">
            <h3 class="subtitle-2">
              {{ type.name }}
            </h3>
            <v-divider />
            <span class="caption">{{ type.shortText }}</span>
          </div>
        </v-tooltip>
      </v-flex>
    </v-layout>
    <div v-if="!hasResult" class="mt-3 text-center">
      <nuxt-link to="/tests/klimov" class="link">
        <h4 class="subtitle-1">
          Узнать свой тип личности
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
        hasResult: false,
        typesResult: [],
      };
    },
    created() {
      this.$axios.$get('klimovResults').then(response => {
        this.loaded = true;
        this.hasResult = (response || []).some(t => t.result);
        this.typesResult = (response || []).sort((a, b) => b.result - a.result);

        if (this.hasResult) {
          this.$store.commit('updateProfileProgress', 'klimov');
        }
      });
    },
  };
</script>

<style scoped>
.results {
  border: 1px solid #E5E5E5;
  border-radius: 5px;
}

.hint {
  max-width: 250px;
}

.link {
  text-decoration: none;
}

.subtitle-1 {
  color: #1782FF;
  line-height: 1.3rem;
}
</style>
