import {API_V4} from "/services/config/main-axios";

class SearchServices {
  searchResults(data) {
    return API_V4.post("/search", {
      q: data.q,
      page: 1,
      sort: "popular"
    })

  }

}

export default new SearchServices();
