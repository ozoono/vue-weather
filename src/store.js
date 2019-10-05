import Vue from 'vue'
import Vuex from 'vuex'
import AppServices from '@/services/AppServices'

Vue.use(Vuex)

const state = {  
  currentWeather: null,
  forecastWeather: [],
  city: '',
  country: '',
  scale: 'C'
}

const getters = {
  temp: state => (state.currentWeather != null) ? state.currentWeather.temp : null,
  datetime: state => (state.currentWeather != null) ? state.currentWeather.ob_time : '',
  weather: state =>  (state.currentWeather != null) ? state.currentWeather.weather : null
}

const mutations = {
  START_SEARCHING (state, value) {
    state.city = value.city;
    state.country = value.country;    
  },  
  UPDATE_WEATHER (state, { current, forecast }) {
    Vue.set(state, 'currentWeather', current)
    Vue.set(state, 'forecastWeather', forecast)
  },  
  UPDATE_SCALE (state, scale) {
    state.scale = scale
  },  
  FIRE_ERROR (state) {
    Vue.set(state, 'currentWeather', {})
    Vue.set(state, 'forecastWeather', [])
  }  
}

const actions = {
  SET_SCALE({ commit }, scale){
    commit('UPDATE_SCALE', scale);
  },
  async FETCH_WEATHER ({ commit }, value) {
    commit('START_SEARCHING', value);

    let current = null;
    let forecast = [];
 
    if (value.key != '') {
      try{
        const currentWeather = await AppServices.getCurrentWeather({
          city: value.city,
          country: value.key
        })
  
        current = (currentWeather.data != '') ? currentWeather.data.data[0] : null;
      }
      catch (e){
        current = null
      }
  
      try{    
        const forecastWeather = await AppServices.getForecastWeather({
          days: 5,
          city: value.city,
          country: value.key
        })
  
        forecast = (forecastWeather.data != '') ? forecastWeather.data.data : [];
      }
      catch (e){
        forecast = []
      }
    }

    commit('UPDATE_WEATHER', { current, forecast })  
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
