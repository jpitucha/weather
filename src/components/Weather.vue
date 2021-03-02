<template>
  <div class="main">
    <div class="info-card">
        <div>
            <div class="font-size-xxl">{{ currentDay }}</div>
            <div class="font-size-m">{{ formattedDate }}</div>
            <div class="location">
              <img src="../../assets/pin.png" alt="" height="60" width="60">
              <div>{{ currentWeatherLocation }}</div>
            </div>
        </div>
        <div>
            <description-icon :category="currentWeatherDesc"></description-icon>
            <div class="font-size-l">{{ currentWeatherTemp }} °C</div>
            <div class="font-size-xl">{{ currentWeatherDesc }}</div>
        </div>
    </div>

    <div class="card">
      <div class="padding-wrapper">
        <div class="search-bar">
            <input class="rounded-input" type="text" v-model="city">
            <button class="search-btn" @click="searchByCity">Search</button>
            <button class="search-btn" @click="searchByCoords = true">Current Location</button>
        </div>
        <div v-if="currentTab === 0" class="results">
          <div class="row">
            <div class="spacing">
            <div class="row">
              <div>{{ currentWeatherPressure }} hPa</div>
              <img src="../../assets/barometer.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Pressure</div>
          </div>
          <div class="spacing">
            <div class="row">
              <div>{{ currentWeatherHumidity }} %</div>
              <img src="../../assets/humidity.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Humidity</div>
          </div>
          </div>
          <div class="row">
            <div class="spacing">
            <div class="row">
              <div>{{ currentWeatherTempFelt }} °C</div>
              <img src="../../assets/thermometer.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Feels like</div>
          </div>
          <div class="spacing">
            <div class="row">
              <div>{{ currentWeatherClouds }} %</div>
              <img src="../../assets/clouds-and-sun.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Cloudy</div>
          </div>
          </div>
        </div>
        <div v-else-if="currentTab === 1" class="results">
          <div>
            <div class="row">
              <div>{{ currentWeatherWindSpeed }} m/s</div>
              <img src="../../assets/speedometer.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Wind speed</div>
          </div>
          <div>
            <div class="row">
              <div>{{ currentWeatherWindDir }} deg</div>
              <img src="../../assets/directional-sign.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Wind direction</div>
          </div>
        </div>
        <div v-else-if="currentTab === 2" class="results">
          <div>
            <div class="row">
              <div>{{ currentWeatherSunrise }}</div>
              <img src="../../assets/sunrise.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Sunrise</div>
          </div>
          <div>
            <div class="row">
              <div>{{ currentWeatherSunset }}</div>
              <img src="../../assets/sunset.png" alt="" height="50" class="img-margin">
            </div>
            <div class="description">Sunset</div>
          </div>
        </div>
        <div class="tabs">
          <button class="btn" @click="toggleView(0)">General</button>
          <button class="btn" @click="toggleView(1)">Wind</button>
          <button class="btn" @click="toggleView(2)">Sun</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import descriptionIcon from './DescriptionIcon';
import { currentDay, currentMonth } from '../dateUtils';

export default {
  name: 'weather',
  data() {
    return {
      city: null,
      searchByCoords: true,
      currentTab: 0,
      date: new Date(),
      currentDay: currentDay(new Date().getDay()),
    };
  },
  components: {
    descriptionIcon,
  },
  methods: {
    ...mapActions(['getForecastByCoords', 'getForecastByCity']),
    toggleView(id) {
      this.currentTab = id;
    },
    searchByCity() {
      if (this.city === null | this.city === '') return;
      this.getForecastByCity(this.city);
      this.searchByCoords = false;
    },
  },
  computed: {
    ...mapGetters(['lastWeatherForCity', 'lastWeatherForCoords']),
    forecast() {
      if (this.lastWeatherForCoords && this.searchByCoords) return this.lastWeatherForCoords;
      if (!this.lastWeatherForCity) return '';
      return this.lastWeatherForCity;
    },
    formattedDate() {
      return `${new Date().getDate()} ${currentMonth(new Date().getMonth())} ${new Date().getFullYear()}`;
    },
    currentWeatherDesc() {
      if (!this.forecast) return;
      if (!this.forecast.weather) return;
      return this.forecast.weather[0].main;
    },
    currentWeatherTemp() {
      if (!this.forecast) return;
      if (!this.forecast.main) return;
      return (this.forecast.main.temp - 273.15).toFixed(1);
    },
    currentWeatherTempFelt() {
      if (!this.forecast) return;
      if (!this.forecast.main) return;
      return (this.forecast.main.feels_like - 273.15).toFixed(1);
    },
    currentWeatherPressure() {
      if (!this.forecast) return;
      if (!this.forecast.main) return;
      return this.forecast.main.pressure;
    },
    currentWeatherHumidity() {
      if (!this.forecast) return;
      if (!this.forecast.main) return;
      return this.forecast.main.humidity;
    },
    currentWeatherWindSpeed() {
      if (!this.forecast) return;
      if (!this.forecast.wind) return;
      return this.forecast.wind.speed;
    },
    currentWeatherWindDir() {
      if (!this.forecast) return;
      if (!this.forecast.wind) return;
      return this.forecast.wind.deg;
    },
    currentWeatherClouds() {
      if (!this.forecast) return;
      if (!this.forecast.clouds) return;
      return this.forecast.clouds.all;
    },
    currentWeatherSunrise() {
      if (!this.forecast) return;
      if (!this.forecast.sys) return;
      const hm = new Date(this.forecast.sys.sunrise * 1000);
      return `${hm.getHours()}:${hm.getMinutes()}`;
    },
    currentWeatherSunset() {
      if (!this.forecast) return;
      if (!this.forecast.sys) return;
      const hm = new Date(this.forecast.sys.sunset * 1000);
      return `${hm.getHours()}:${hm.getMinutes()}`;
    },
    currentWeatherLocation() {
      if (!this.forecast) return;
      return this.forecast.name;
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getForecastByCoords);
    }
  },
};
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    perspective: 1000px;
    align-items: center;
    font-family: 'Open Sans';
}
.info-card {
    height: 35vw;
    width: 23vw;
    background: linear-gradient(150deg, rgba(10,131,226,1) 0%, rgba(126,30,97,1) 100%);
    transform: rotateY(15deg);
    border-radius: 50px;
    position: relative;
    left: 60px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card {
    height: 30vw;
    width: 33vw;
    background-color: rgb(33, 41, 50);
    border-radius: 50px;
    display: flex;
    flex-grow: 1;
}
.search-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.results {
    /* padding: 30px 50px 30px 100px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.padding-wrapper {
  padding: 30px 50px 30px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 42px;
}
.column {
  display: flex;
  flex-direction: column;
}
.description {
  text-align: center;
  font-size: 20px;
}
.img-margin {
  margin-left: 5px;
}
.tabs {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  outline: none;
    height: 30px;
    width: 100px;
    border-radius: 50px;
    background: linear-gradient(150deg, rgba(10,131,226,1) 0%, rgba(126,30,97,1) 100%);
    border-style: none;
    cursor: pointer;
    font-size: 16px;
}
.search-btn {
  outline: none;
    height: 30px;
    width: 140px;
    border-radius: 50px;
    background: linear-gradient(150deg, rgba(10,131,226,1) 0%, rgba(126,30,97,1) 100%);
    border-style: none;
    cursor: pointer;
    font-size: 16px;
}
.location {
  display: flex;
  align-items: center;
  font-size: 36px;
  margin-top: 15px;
}
.location img {
  margin-right: 15px;
}
.font-size-m {
  font-size: 50px;
}
.font-size-l {
  font-size: 60px;
}
.font-size-xl {
  font-size: 70px;
}
.font-size-xxl {
  font-size: 80px;
}
.rounded-input {
    border: 0px;
    border-radius: 50px;
    outline: none;
}
.spacing {
  padding-left: 15px;
  padding-right: 15px;
}
@media (max-width: 768px) {
  .info-card {
    height: 65vw;
    width: 35vw;
  }
  .card {
    height: 60vw;
    width: 55vw;
  }
  .search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .search-bar button {
    margin: 5px;
  }
  .row {
    font-size: 26px;
  }
  .description {
    font-size: 14px;
  }
  .font-size-xxl {
    font-size: 60px;
  }
  .font-size-xl {
    font-size: 50px;
  }
  .font-size-l {
    font-size: 40px;
  }
  .font-size-m {
    font-size: 30px;
  }
  .location {
    font-size: 25px;
  }
}
@media (max-width: 1024px) {
  .info-card {
    height: 60vw;
    width: 35vw;
  }
  .card {
    height: 50vw;
    width: 55vw;
  }
}
@media (max-width: 1200px) {
  .info-card {
    height: 60vw;
    width: 35vw;
  }
  .card {
    height: 50vw;
    width: 55vw;
  }
}
</style>
