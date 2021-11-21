import {API_V1} from "../services/config/main-axios";

export default function ({app}) {
  console.log(app)
  let token = app.$cookies.get('access_token')
  API_V1.defaults.headers.common = {
    Authorization: `Bearer ${token}`
  }
}
