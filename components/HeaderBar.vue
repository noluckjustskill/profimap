<template>
  <div>
    <v-btn
      v-if="canBack()"
      icon
      small
      color="gray"
      class="back-button hidden-md-and-up"
      @click="$router.back()"
    >
      <v-img
        :src="require('~/assets/back.png')"
        height="20"
        contain
      />
    </v-btn>
    <v-layout
      row
      wrap
      align-center
      justify-start
      class="header-layout hidden-sm-and-down"
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
          <v-tabs-slider />
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            class="tab"
          >
            <v-badge
              :value="showHint(item.hint)"
              color="primary"
              offset-x="-5"
              dot
            >
              {{ item.title }}
            </v-badge>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
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
    methods: {
      showHint(hint) {
        if (!hint || !this.$store.state.auth.user.paid) return false;

        const cookieName = `hint_${hint.id}`;
        const showHint = this.$cookies.isKey(cookieName);
        if (!showHint) {
          this.$cookies.set(cookieName, true);
          return true;
        }

        return false;
      },
      canBack() {
        return this.$router.currentRoute.path !== '/';
      }
    },
  };
</script>

<style scoped>
  .header-layout {
    max-width: 100%;
    margin: 0;
  }
  .tab {
    position: relative;
    line-height: 15px;
    letter-spacing: 0.4px;
    text-transform: none;
    font-size: 18px;
    font-weight: 500;
  }
  .back-button {
    opacity: 0.7;
  }
</style>
