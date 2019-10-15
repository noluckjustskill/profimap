<template>
  <div>
    <h2 class="tree-wrap">
      Дерево карьеры
    </h2>
    <client-only>
      <CareerChart />
    </client-only>
  </div>
</template>

<script>
  import CareerChart from '../components/Charts/CareerChart';

  export default {
    middleware: 'auth',
    components: {
      CareerChart,
    },
  };
</script>

<style>
  .tree-wrap {
    font-weight: 500;
    font-size: 40px;
    line-height: 30px;
    letter-spacing: 0.15px;
    margin-top: 40px;
    margin-bottom: 15px;
    color: #000000;
  }
</style>
