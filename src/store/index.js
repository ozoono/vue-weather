import Vue from 'vue'
import Vuex from 'vuex'
import {http, apiKey} from '../config'

Vue.use(Vuex)

const state = {  
  currentWeather: [],
  forecastWeather: [],
  city: '',
  country: '',
  error: false,
  loading: true
}

const mutations = {
  START_LOADING (state, value) {
    state.city = value.city;
    state.country = value.country;    
    state.loading = true;
  },  
  UPDATE_WEATHER (state, { data }) {
    state.currentWeather = data.current;
    state.forecastWeather = data.forecast.forecastday;
    state.error = false;
    state.loading = false;
  },
  FIRE_ERROR (state) {
    state.currentWeather = [];
    state.forecastWeather = [];    
    state.error = true;
    state.loading = false;
  }  
}

const actions = {
  async FETCH_WEATHER ({ commit }, value) {
    commit('START_LOADING', value);

    await http.get('forecast.json', {
      params: {
          key: apiKey,
          days: 5,
          q: value.city
        }
    })
    .then(response => {
      commit('UPDATE_WEATHER', { data: response.data })        
    })
    .catch(e => {
       commit('FIRE_ERROR')      
    })
  }
}

const getters = {
  current: state => {
    return {
      name: state.city,
      country: state.country,
      tempC: state.currentWeather.temp_c,
      tempF: state.currentWeather.temp_f,
      datetime: state.currentWeather.last_updated,
      conditionIcon: state.currentWeather.condition ? state.currentWeather.condition.icon : '',
      conditionText: state.currentWeather.condition ? state.currentWeather.condition.text : ''
    }
  },

  forecast: state => {
    return state.forecastWeather.length > 0 ? state.forecastWeather : []
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
