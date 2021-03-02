<template>
  <div class="home">
    <weather></weather>
    <credits></credits>
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';
import Credits from '../components/Credits.vue';

export default {
  name: 'home',
  components: {
    Weather,
    Credits,
  },
};
</script>

<style>
.home {
  display: flex;
}
</style>
