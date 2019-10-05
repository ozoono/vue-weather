import {API, key} from '@/services/api'

export default {
  getCurrentWeather (params) {
    return API.get(`current?key=${key}&city=${params.city}&country=${params.country}`)
  },
  getForecastWeather (params) {
    return API.get(`forecast/daily?key=${key}&city=${params.city}&country=${params.country}&days=${params.days}`)
  }
}