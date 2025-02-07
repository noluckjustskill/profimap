<template>
  <v-card
    class="mx-auto elevation-0 card"
  >
    <h2 class="display-1 font-weight-medium profile">
      Мой профиль
    </h2>
    <v-list-item class="pa-0 profile-content">
      <v-list-item-avatar :size="avatarSize" :color="avatarColor" class="avatar">
        <v-img v-if="user.picture" :src="user.picture" />
        <span v-else class="display-1 font-weight-light white--text ma-0">{{ userInitials }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline font-weight-medium">
          {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="font-italic">
          {{ userGender }}
          {{ userGender && userAge ? ', ' : '' }}
          {{ userAge }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  import { initials } from '../utils/userUtils';

  export default {
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
      userInitials() {
        return initials(this.user.name);
      },
      userGender() {
        const genderDict = {
          M: 'мужчина',
          F: 'женщина',
        };
        return this.$store.state.auth.user.gender ? genderDict[this.$store.state.auth.user.gender] : null;
      },
      userAge() {
        if (this.$store.state.auth.user.dateOfBirth) {
          const ageDifMs = Date.now() - new Date(this.$store.state.auth.user.dateOfBirth).getTime();
          const ageDate = new Date(ageDifMs);

          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          const lastNumeral = age.toString().slice(-1);
          const lastTwoNumerals = age.toString().slice(-2);
          const postfixMap = {
            'лет': ['0', '5', '6', '7', '8', '9'],
            'год': ['1'],
            'года': ['2', '3', '4'],
          };

          const postfix = ['11', '12', '13', '14'].includes(lastTwoNumerals)
            ? 'лет'
            : Object.keys(postfixMap).find(p => postfixMap[p].includes(lastNumeral));
          if (!postfix) {
            return null;
          }

          return `${age} ${postfix}`;
        }
        return null;
      },
      avatarColor() {
        return this.$dynamicColor(this.user.name);
      },
      avatarSize() {
        return this.$vuetify.breakpoint.mdAndDown ? 90: 120;
      },
    },
  };
</script>

<style scoped lang="scss">
  .profile {
    margin-bottom: 16px;

    @media (max-width: 960px) {
      margin-bottom: 5px;
    }
  }
  .profile-content {
    @media (max-width: 960px) {
      margin-bottom: 10px;
    }
  }
  .card {
    background-color: transparent !important;
  }
  .display-1 {
    letter-spacing: -0.1rem !important;
  }
  .font-weight-light {
    font-size: 12px;
    margin-top: 5px;
  }
  .avatar {
    justify-content: center;
  }
</style>
