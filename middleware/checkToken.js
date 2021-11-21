import {API_V1} from "../services/config/main-axios"
export default ({app , store , $axios}) => {
  app.$cookies.set('access_token' , 'toekn example')
  let token = app.$cookies.get('access_token')

  store.dispatch('modules/auth/SET_TOKEN', token)

  app.$axios.setHeader('dddd' , 'dddd')
  console.log(API_V1)
  // API_V1.setHeader('dddd' , 'dfsdfsd')
  // API_V1.setHeader('dddd' , 'dddd')
  console.log({app: $axios})
}
