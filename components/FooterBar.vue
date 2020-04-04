<template>
  <v-bottom-navigation
    v-model="value"
    color="primary"
  >
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
    >
      <span>{{ item.title }}</span>
      <v-badge
        :value="showHint(item.hint)"
        color="primary"
        offset-x="-5"
        offset-y="5"
        dot
      >
        <v-icon v-if="item.icon">
          {{ item.icon }}
        </v-icon>
        <v-img
          v-else-if="item.image"
          :src="item.image"
          max-width="24"
          max-height="24"
        />
      </v-badge>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      },
    },
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
      }
    },
  };
</script>
