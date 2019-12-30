<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results pb-4"
    tile
  >
    <v-card-title class="title">
      Тип личности
    </v-card-title>
    <template v-if="!hasResult">
      <v-layout 
        justify-space-between 
        align-center 
        class="px-4"
      >
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
      <div class="mt-3 text-center">
        <nuxt-link to="/tests/klimov" class="link">
          <h4 class="subtitle-1">
            Узнать свой тип личности
            <v-icon small>
              mdi-open-in-new
            </v-icon>
          </h4>
        </nuxt-link>
      </div>
    </template>
    <v-list-item v-else>
      <v-list-item-avatar>
        <v-badge>
          <template v-slot:badge>
            <span class="caption">
              {{ `${Math.round(typesResult[0].result * 100)}%` }}
            </span>
          </template>
          <v-img
            :src="typesResult[0].image"
            width="40"
            height="40"
            v-on="on"
          />
        </v-badge>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="type">
          {{ typesResult[0].name }}
        </v-list-item-title>
        <v-list-item-subtitle class="description">
          {{ typesResult[0].shortText }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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

.type {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: black;
  margin-left: 10px;
}

.description {
  margin-top: 6px;
  margin-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  white-space: normal;
}

</style>
