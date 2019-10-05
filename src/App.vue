<template>
  <div id="app">
    <div class="ui segments">

      <Header></Header>

      <div class="ui grey segment main">
        <div class="loading" v-if="loading">Loading...</div>
        <Autocomplete 
          :items="items" 
          :value="init.city" 
          @item-selected="getData"
        ></Autocomplete>  
        <WeatherInfo 
          :loading="loading" 
          @change-scale="setScale"
        ></WeatherInfo>
        <ForecastList></ForecastList> 
      </div>

    </div>

    <Footer></Footer>   
  </div>
</template>

<script>
import Header from '@/components/Header'
import Autocomplete from '@/components/Autocomplete'
import WeatherInfo from '@/components/WeatherInfo'
import ForecastList from '@/components/ForecastList'
import Footer from '@/components/Footer'
import { initCity, cities } from '@/config'

export default {
  name: 'app',
  components:{
    Header,
    Autocomplete,
    WeatherInfo,
    ForecastList,
    Footer    
  },
  data () {
    return {
      init: initCity,
      items: cities,
      loading: true
    }
  },
  mounted: function(){
    this.getData(this.init);
  },
  methods: {
    async getData(valueSelected){
      this.loading = true
      await this.$store.dispatch('FETCH_WEATHER', valueSelected)
      this.loading = false
    },
    setScale(scale){
      this.$store.dispatch('SET_SCALE', scale)
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  margin: 1em auto;  
  max-width: 500px;    
  color: #fff;
}
.header{
  background-color: #131517 !important;
}
.logo{
  width: 25px;
  height: 25px;
}
.main{
  background-color: #1b1f21 !important;  
  min-height: 190px;
}
.footer {
    margin-top: 50px;
    text-align: center;
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
</style>
