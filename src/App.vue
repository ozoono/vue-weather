<template>
  <div id="app">
    <div class="ui segments">

      <div class="ui inverted segment header">
        <h4><img class="ui middle aligned image logo" src="./assets/logo-vue.png" /> What's the weather like in...?</h4>
      </div>

      <div class="ui grey segment main">
        <Autocomplete :items="items" :value="init.city" @itemSelected="getData"></Autocomplete>  
        <WeatherInfo></WeatherInfo>
      </div>
    </div>

    <div class="footer">
      <button class="ui basic button">
        <a href="https://github.com/ozoono/vue-weather"><i class="github icon black"></i>Repo on Github</a>
      </button>

      <button class="ui basic button"> 
        <a href="http://vuejs.org"><i class="checkmark icon black"></i>Vue 2.x</a>   
      </button>
    </div>    
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete'
import WeatherInfo from './components/WeatherInfo'
import cities from './cities'

export default {
  name: 'app',
  components:{
    Autocomplete,
    WeatherInfo    
  },

  data () {
    return {
      init: {
        city: 'Madrid',
        country: 'Spain'
      },
      items: cities
    }
  },

  mounted: function(){
    this.getData(this.init);
  },

  methods: {
    getData(valueSelected){
      this.$store.dispatch('FETCH_WEATHER', valueSelected)
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
}
.footer {
    margin-top: 50px;
    text-align: center;
}
</style>
