<template>
  <div>
    <v-chip
      v-for="(skill, i) in skills"
      :key="i"
      class="chip font-weight-regular"
      color="rgba(0, 0, 0, 0.06)"
      disabled
    >
      <v-icon>mdi-star-circle</v-icon>
      {{ `${randomValue(1, 10)} | ` }}
      {{ skill }}
    </v-chip>
  </div>
</template>

<script>
  export default {
    data: () => ({
      skills: [
        'JavaScript',
        'Typescript',
        'Node.js',
        'MySQL',
        'HTML',
        'HTML5',
        'CSS',
        'CSS3',
        'Веб-программирование',
        'Linux',
        'Git',
        'React',
        'Redux',
        'Sequelize',
        'React-native',
        'Webpack',
        'PHP',
        'Vue',
        'Nuxt',
        'Jenkins',
        'PostgreSQL'
      ]
    }),
    methods: {
      randomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    },
  };
</script>

<style scoped>
  .chip {
    margin: 5px 5px 5px 0;
    opacity: 1;
  }
</style>
