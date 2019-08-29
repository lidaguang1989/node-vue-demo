import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dateFormat', (val, type) => {
  if (!val) return '';

  return dayjs(val).format(type)
})