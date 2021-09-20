import axios from "axios";

// const headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };
const API_V1 = axios.create({
  baseURL: "https://new-homsa-dev.ernyka.com/api/website/v1",
//   headers: headers
});

API_V1.interceptors.response.use(
    response => {
      return response;
    },
    async function(error) {
      return Promise.reject(error.response);
    }
  );

export { API_V1 };


