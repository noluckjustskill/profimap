<template>
  <div v-if="!$vuetify.breakpoint.mdAndDown">
    <v-layout
      row
      wrap
      align-center
      justify-start
    >
      <v-flex xs3>
        <img :src="require('~/assets/logo.png')" width="125" class="logo-img">
      </v-flex>
      <v-flex xs9>
        <v-tabs
          v-model="tab"
          :color="$vuetify.theme.themes.light.accent"
          :centered="centered"
          :fixed-tabs="fixed"
          icons-and-text
        >
          <v-tab v-for="(item, i) in items" :key="i" :to="item.to">
            {{ item.title }}
            <v-icon>{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
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
      tab: 0,
      drawer: false,
      overlay: false
    }),
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.mdAndDown;
      }
    }
  };
</script>


<style scoped>
  .logo-img {
    vertical-align: middle;
  }
</style>
