<template>
    <div>
      <div class="loading" v-if="loading">Loading...</div>
      <div class="w-location">
        <h1><i class="marker icon yellow"></i>{{ current.name }} <em>({{ current.country }})</em></h1>
        <p class="w-date">{{ current.datetime | formatDate }}</p>
      </div>
      
      <div v-if="error" class="ui secondary inverted red segment center aligned">
        <i class="warning sign icon"></i>Sorry... data not available!
      </div>   
      <div v-else> 
        <div class="ui mini buttons w-scale">
          <button class="ui mini compact button" :class="{ positive: (scale == 'C') }" v-on:click="changeScale('C')">&deg;C</button>
          <button class="ui mini compact button" :class="{ positive: (scale == 'F') }" v-on:click="changeScale('F')">&deg;F</button>
        </div>         

        <div class="ui basic center aligned segment">
          <div>
            <img :src='current.conditionIcon' class="w-icon"><span v-if="scale == 'C'" class="w-temp">{{ current.tempC }}&deg;</span><span v-else class="w-temp">{{ current.tempF }}&deg;</span>
          </div>
          <div><span class="w-condition">{{ current.conditionText }}</span></div>
        </div>

        <ul v-if="forecast.length > 0" class="w-forecast-list">
          <ForecastItem v-for="(item, index) in forecast" :key="index" :item="item" :datetime="current.datetime" :scale="scale">
          </ForecastItem>
        </ul>        
      </div>

	</div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import ForecastItem from './ForecastItem'

export default {

  name: 'WeatherInfo',

  components: {
    ForecastItem
  },

  data () {
    return {
      scale: 'C'
    }
  },

  computed: {
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'current',
      'forecast',
    ])
  },

  filters:{
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('ddd, MMM DD - HH:mm')
      }
    }
  },

  methods: {
    changeScale(scale){
      this.scale = scale;
    }
  } 
}
</script>

<style lang="css" scoped>
body{
  font-size: 16px;
}
h1{
  margin: 0;
  text-align: left;
  font-size: 2em;
}
h1 em{
  font-size: 1rem;
}
p{
  margin: 0;
}

.loading{
  z-index: 999;
  top: 0;
  right: 0;
  position: absolute;
  padding: 5px;
  color: #fff;
  background-color: #0a0;
}
.w-location{
  margin-top: 1em;
}
.w-date{
  text-align: left;
  text-indent: 3em;
  font-size: .9em;
}
.w-icon{
  vertical-align: top;
}
.w-temp{
  margin-right: .1em;
  font-size: 4.5rem;
  line-height: 4.5rem;
  letter-spacing: -2px;
}
.w-scale{
  position:absolute;
  right: 0;
  top: 100px;
}
.w-condition{
  font-size: 1.3em;
}
.w-forecast-list{
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  margin: 1em 0 0 0;
  padding: 1em 0;
  background-color: #24282a;
}
.mini{
  font-size: 2rem;
}
</style>	