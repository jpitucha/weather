<template>
    <div>
        <img v-if="selectedIcon === 0" src='./../../assets/desc-info/sun.png' height="100" width="100">
        <img v-else-if="selectedIcon === 1" src='./../../assets/desc-info/cloud.png' height="200" width="200">
        <img v-else-if="selectedIcon === 2" src='./../../assets/desc-info/rain.png' height="100" width="100">
        <img v-else-if="selectedIcon === 3" src='./../../assets/desc-info/storm.png' height="100" width="100">
        <img v-else-if="selectedIcon === 4" src='./../../assets/desc-info/snowflake.png' height="100" width="100">
        <img v-else-if="selectedIcon === 5" src='./../../assets/desc-info/foggy.png' height="100" width="100">
    </div>
</template>

<script>
export default {
  name: 'description-icon',
  props: ['category'],
  data() {
    return {
      selectedIcon: null,
    };
  },
  methods: {
    setIcon() {
      if (this.category === 'Thunderstorm') return this.selectedIcon = 3;
      if (this.category === 'Rain' | 'Drizzle') return this.selectedIcon = 2;
      if (this.category === 'Snow') return this.selectedIcon = 4;
      if (this.category === 'Atmosphere') return this.selectedIcon = 5;
      if (this.category === 'Clear') return this.selectedIcon = 0;
      if (this.category === 'Clouds') return this.selectedIcon = 1;
      this.selectedIcon = null;
    },
  },
  watch: {
    category() {
      this.setIcon();
    },
  },
};
</script>
