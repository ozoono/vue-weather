<template>
  <ul v-if="forecastWeather.length > 0" class="w-forecast-list">
    <ForecastListItem 
        v-for="(item, index) in forecastWeather" 
        :key="index" 
        :pos="index"
        :item="item" 
        :scale="scale" 
    >
    </ForecastListItem>
  </ul> 
</template>

<script>
import ForecastListItem from '@/components/ForecastListItem'
import { mapState } from 'vuex'

export default {
  name: 'ForecastList',
  components: {
    ForecastListItem
  },
  computed: {
    ...mapState([
      'forecastWeather',
      'scale'
    ])
  }
}

</script>
<style lang="css" scoped>
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
.w-forecast-list li{
  box-sizing: border-box;
  width: 20%
}
</style>