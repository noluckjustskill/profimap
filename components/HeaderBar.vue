<template>
  <v-layout
    v-if="!$vuetify.breakpoint.mdAndDown"
    row
    wrap
    align-center
    justify-start
    class="header-layout"
  >
    <v-flex xs3>
      <nuxt-link to="/">
        <v-img
          :src="require('~/assets/logo.png')"
          :height="48"
          :max-width="125"
          class="ml-2"
        />
      </nuxt-link>
    </v-flex>
    <v-flex xs9>
      <v-tabs
        v-model="tab"
        :color="$vuetify.theme.themes.light.primary"
        :centered="centered"
        :fixed-tabs="fixed"
        height="88"
      >
        <v-tab
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="tab"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-flex>
  </v-layout>
  <div v-else>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      hide-overlay
    >
      <div>
        <v-btn icon right @click="drawer = !drawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      centered: {
        type: Boolean,
        default: () => false,
      },     
      fixed: {
        type: Boolean,
        default: () => false,
      },
    },
    data: () => ({
      tab: '/',
      drawer: false,
      overlay: false
    }),
  };
</script>


<style scoped>
  .header-layout {
    max-width: 100%;
    margin: 0;
  }
  .tab {
    line-height: 15px;
    letter-spacing: 0.4px;
    text-transform: none;
    font-size: 18px;
    font-weight: 500;
  }
</style>
