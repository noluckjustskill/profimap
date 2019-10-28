<template>
  <div class="animation" :style="{ width: `${width}px`, height: `${height}px` }">
    <v-img
      :src="require('~/assets/logo-big.png')"
      contain
      class="img"
    />
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 250,
      },
      height: {
        type: Number,
        default: 250,
      },
    },
  };
</script>

<style scoped>
  @keyframes slideInDown {
    0% {
      transform: translate3d(0, -20%, 0);
    }

    50% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(0, -20%, 0);
    }
  }

  .animation {
    padding: 5%;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 100%;
  }

  .animation .img {
    width: 100%;
    height: 100%;
    animation: slideInDown .8s ease-in-out infinite;
  }
</style>
