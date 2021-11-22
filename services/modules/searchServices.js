import {API_V1} from "/services/config/main-axios";

class SearchServices {
  searchResults(data) {
    return API_V1.post("/search", data)
  }
  destinationSuggestions(destination) {
    return API_V1.get(`/search/suggestions` , {
      params: {
        term: destination.term
      }
    })
  }

}

export default new SearchServices();
