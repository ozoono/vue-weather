<template>
	<li>
	    <span class="fc-date">{{ item.date | dayWeek(datetime) }}</span>
	    <span class="fc-icon"><img :src='item.day.condition.icon' :alt='item.day.condition.text' :title='item.day.condition.text'></span>
	    <span v-if="scale == 'C'" class="fc-maxmin" ><strong>{{ item.day.maxtemp_c }}&deg;</strong> {{ item.day.mintemp_c }}&deg;</span>
      <span v-else class="fc-maxmin" ><strong>{{ item.day.maxtemp_f }}&deg;</strong> {{ item.day.mintemp_f }}&deg;</span>
	</li>
</template>

<script>
import moment from 'moment'

export default {

  name: 'ForecastItem',
  props: ['item', 'datetime', 'scale'],
  filters:{
    dayWeek(value, today) {
      if (value){
        if (value <= today) return 'TODAY';
        else return moment(String(value)).format('ddd').toUpperCase();
      }
    }
  }  

}
</script>

<style lang="css" scoped>
li{
  margin: 0;
  border-right: 1px dotted #505d64;
  padding: 0 1em;
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

}
</style>