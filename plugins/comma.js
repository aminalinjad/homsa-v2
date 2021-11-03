import Vue from 'vue'

export default function () {
  Vue.filter('comma', (val) => {
    if (val == null) return ''
    val = val.toString()
    if (val.split('.').length > 1) {
      return (
        val.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '.' +
        val.split('.')[1]
      )
    }
    // let num = (Math.round(val * 100) / 100).toFixed(2);
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  })
}
