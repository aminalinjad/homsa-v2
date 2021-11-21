import axios from "axios";
import Vue from "vue";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  'Accept-Language': 'fa',
};
const API_V1 = axios.create({
  // baseURL: "https://new-homsa-dev.ernyka.com/api/website/v1",
  baseURL: "http://homsa.test/api/website/v1",
  headers: headers
});

API_V1.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    setTimeout(() => {
      if ($nuxt.$loading.loading) {
        $nuxt.$loading.finish()
      }
    }, 100)


    if (error && error.response.config.method !== "get") {
      Vue.$toast.clear();
      if (error.response.data.errors && Object.entries(error.response.data.errors).length > 0) {
        Object.values(error.response.data.errors).forEach(value => {
          Vue.$toast.error(value[0]);
        });
      } else if (
        !error.response.data.errors ||
        error.response.data.errors.length === 0
      ) {
        Vue.$toast.error(error.response.data.message);
      }
    }
    return Promise.reject(error.response);
  },
);

export {API_V1};


