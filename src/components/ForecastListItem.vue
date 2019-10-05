<template>
	<li>
      <div class="fc-date">{{ item.datetime | dayWeek(pos) }}</div>
      <div class="fc-icon"><img :src='icon' :alt='item.weather.condition' :title='item.weather.condition'></div>
      <div class="fc-maxmin" ><span><strong>{{ item.max_temp | tempScale(scale) }}&deg;</strong></span> <span>{{ item.min_temp | tempScale(scale) }}&deg;</span></div>
	</li>
</template>

<script>
import dayjs from 'dayjs'
import { baseImg } from '@/config'
import { weatherMixins } from '@/mixins/weatherMixins'

export default {
  name: 'ForecastListItem',
  mixins: [weatherMixins],  
  props: ['pos', 'item', 'scale'],
  data () {
    return {
      baseImg
    }
  },  
  computed: {
    icon(){
      return `${this.baseImg}${this.item.weather.icon}.png`
    }
  },
  filters:{
    dayWeek(value, pos) {
        return (pos == 0) ? 'TODAY' : dayjs(value).format('ddd').toUpperCase();
    }
  }  

}
</script>

<style lang="css" scoped>
li{
  margin: 0;
  border-right: 1px dotted #505d64;
  text-align: center;
  font-size: .9rem;
  
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column wrap;
  flex-flow: column wrap;
  flex-grow: 1;
  justify-content: center;
}

li:last-child{
  border: none;
}

.fc-icon img{
  width: 50px;
  height: 50px;
}
.fc-maxmin span{
  padding: 0 .2em;
}
.fc-maxmin  strong{
  color: #f7c523
}

@media all and (max-width: 480px) {

  .fc-icon img{
    width: 32px;
    height: 32px;
  }

}  

@media all and (max-width: 400px) {

  li{
    padding: 0 .5em;
  }  
  em {
    display: none
  }
  .fc-maxmin span{
    display: block;
  }
}
</style>