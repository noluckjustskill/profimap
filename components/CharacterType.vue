<template>
  <v-card
    v-if="loaded"
    class="elevation-0 results mt-2"
    :class="{'pb-2': hasDiskResult}"
    tile
  >
    <v-card-title class="title pb-2">
      Склад характера
    </v-card-title>
    <template v-if="!hasDiskResult">
      <v-list-item
        v-for="type in diskTypesResult"
        :key="type.id"
        class="pl-7 pr-7"
      >
        <v-list-item-avatar tile>
          <v-img :src="type.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="type">
            {{ `Тип ${type.name}` }}
          </v-list-item-title>
          <v-list-item-subtitle class="type-text">
            {{ type.text }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="my-3 text-center">
        <nuxt-link to="/tests/disk" class="link">
          <h4 class="subtitle-1">
            Узнать свой склад характера
            <v-icon small>
              mdi-open-in-new
            </v-icon>
          </h4>
        </nuxt-link>
      </div>
    </template>
    <v-list-item
      v-else
      class="pl-7 pr-7"
    >
      <v-list-item-avatar tile>
        <v-img :src="diskTypesResult[0].image" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="type">
          {{ `Тип ${diskTypesResult[0].name}` }}
          <template>
            — {{ `${Math.round(diskTypesResult[0].result * 100)}%` }}
          </template>
        </v-list-item-title>
        <v-list-item-subtitle class="type-text">
          {{ diskTypesResult[0].text }}
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
        hasDiskResult: false,
        diskTypesResult: [],
      };
    },
    created() {
      this.$axios.$get('diskResults').then(response => {
        this.loaded = true;
        this.hasDiskResult = (response || []).some(t => t.result);
        this.diskTypesResult = (response || []).sort((a, b) => b.result - a.result);

        if (this.hasDiskResult) {
          this.$store.commit('updateProfileProgress', 'disk');
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
