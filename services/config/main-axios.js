import axios from "axios";

// const headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };
const API_V4 = axios.create({
  // baseURL: 'https://api-dev-ex.ernyka.com/api/',
  baseURL: process.env.baseUrl,
//   headers: headers
});

API_V4.interceptors.response.use(
    response => {
      return response;
    },
    async function(error) {
      return Promise.reject(error.response);
    }
  );

export { API_V4 };


