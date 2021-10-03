import {API_V1} from "/services/config/main-axios";

class SearchServices {
  searchResults(data) {
    return API_V1.post("/search", {
      q: data.q,
      page: data.page,
      sort: data.sort,
      boundaries: data.boundaries,
      guests: data.guest,
      slugs: data.slugs,
      checkin: data.checkin,
      checkout: data.checkout
    })
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
