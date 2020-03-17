<template>
  <div class="list">
    <v-img :src="require('~/assets/businessmen.png')" :max-width="400" class="mx-auto" />
    <h2 class="my-2 display-1 text-center">
      Теперь тебе доступны карьерные рекомендации!
    </h2>
    <h3 class="headline text-center font-weight-light">
      Сейчас ты будешь перенаправлен на страницу профиля
    </h3>
  </div>
</template>

<script>
  export default {
    async asyncData({ store, redirect }) {
      if (store.$auth.user.paid) {
        redirect('/career');
      }
    },
    created() {
      if (!this.$store.state.auth.user.paid) {
        this.$axios.get('refresh-token').then(({ data }) => {
          if (!data || !data.token) {
            return Promise.reject('No token');
          }
          return new Promise((resolve, reject) => setTimeout(
            () => this.$auth.setUserToken(data.token).then(resolve).catch(reject),
            3000,
          ));
        }).catch(err => {
          console.error(err);
          this.$router.push('/failed-pay');
        });
      }
    },
    middleware: 'authenticated',
  };
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
    background-color: white;
    margin-top: 40px;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 50px;
    padding-bottom: 40px;
    border-radius: 5px;
    @media (max-width: 799px) {
      padding: 10px;
    }
    @media (min-width: 800px) and (max-width: 1099px) {
      padding: 30px;
    }

    & .headline {
      color: #919191;
    }
  }
</style>
