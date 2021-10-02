import {API_V1} from "/services/config/main-axios";

class SearchServices {
  searchResults(data) {
    return API_V1.post("/search", {
      q: data.q,
      page: data.page,
      sort: data.sort,
      boundaries: data.boundaries,
      guest: data.guest
    })
  }

  destinationSuggestionsDefault() {
    return API_V1.get(`/search/suggestions/default`)
  }

  destinationSuggestions(destination) {
    return API_V1.get(`/search/suggestions?term=${destination}`)
  }

}

export default new SearchServices();
