import Vue from 'vue';
import Vuex from 'vuex';
import { config } from './config';

Vue.use(Vuex);

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?';

export default new Vuex.Store({
  state: {
    weather: { lastWeatherForCity: {}, lastWeatherForCoords: {} },
  },
  mutations: {
    setWeatherForCoords: (state, { weather }) => {
      Vue.set(state.weather, 'lastWeatherForCoords', weather);
    },
    setWeatherForCity: (state, { weather }) => {
      Vue.set(state.weather, 'lastWeatherForCity', weather);
    },
  },
  actions: {
    getForecastByCoords: async (context, position) => {
      const searchParams = new URLSearchParams({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        appid: process.env.VUE_APP_apiKey,
      }).toString();
      const response = await fetch(`${apiURL}${searchParams}`);
      const weather = await response.json();
      context.commit('setWeatherForCoords', { weather });
    },
    getForecastByCity: async (context, city) => {
      const searchParams = new URLSearchParams({
        q: city,
        appid: config.apiKey,
      });
      const response = await fetch(`${apiURL}${searchParams}`);
      const weather = await response.json();
      context.commit('setWeatherForCity', { weather });
    },
  },
  getters: {
    lastWeatherForCity: state => state.weather.lastWeatherForCity,
    lastWeatherForCoords: state => state.weather.lastWeatherForCoords,
  },
});
