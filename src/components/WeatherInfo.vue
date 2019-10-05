<template>
    <div>
      <div class="w-location">
        <h1><i class="marker icon yellow"></i>{{ city }} <em>({{ country }})</em></h1>
        <p class="w-date">{{ datetime | formatDate }}</p>
      </div>
      
      <div v-if="error" class="ui secondary inverted red segment center aligned">
        <i class="warning sign icon"></i>Sorry... data not available!
      </div>   
      <div v-else> 
        <div class="ui mini buttons w-scale">
          <button class="ui mini compact button" :class="{ positive: (scale == 'C') }" @click="changeScale('C')">&deg;C</button>
          <button class="ui mini compact button" :class="{ positive: (scale == 'F') }" @click="changeScale('F')">&deg;F</button>
        </div>         

        <div class="ui basic center aligned segment" v-if="weather != null">
          <div>
            <img :src='icon' class="w-icon" :alt='description' ><span class="w-temp">{{ temp | tempScale(scale) }}&deg;</span>
          </div>
          <div><span class="w-condition">{{ description }}</span></div>
        </div>
        
      </div>

	</div>
</template>

<script>
import dayjs from 'dayjs'
import { baseImg } from '@/config'
import { mapState, mapGetters } from 'vuex'
import { weatherMixins } from '@/mixins/weatherMixins'

export default {

  name: 'WeatherInfo',
  mixins: [weatherMixins],
  props:['loading'],
  data () {
    return {
      baseImg
    }
  },
  computed: {
    ...mapState([
      'city',
      'country',
      'scale'
    ]), 
    ...mapGetters([
      'temp',
      'datetime',
      'weather'
    ]),       
    icon(){
      return (this.weather != null) ? `${this.baseImg}${this.weather.icon}.png` : '#'
    },
    description(){
      return (this.weather != null) ? this.weather.description : ''
    },
    error(){
      return (!this.loading && this.temp == null)
    }
  },

  filters:{
    formatDate(value) {
      return (value) ? dayjs(value).format('dddd, MMM D - HH:mm') : ''
    }
  },

  methods: {
    changeScale(scale){
      this.$emit('change-scale', scale)
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


.w-location{
  margin-top: 1em;
}
.w-date{
  text-align: left;
  text-indent: 3em;
  font-size: .9em;
}
.w-icon{
  width: 50px;
  height: 50px;
  vertical-align: text-bottom;
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
.mini{
  font-size: 2rem;
}
</style>	