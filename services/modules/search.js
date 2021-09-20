import {API_V1} from "/services/config/main-axios";

class Search {
  searchResults(data) {
    return API_V1.post("/search", {
      q: data.q,
      page: 1,
      sort: "popular"
    })

  }

}

export default new Search();
