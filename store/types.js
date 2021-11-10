// structure
export const structure = {
    getters: {
      GET_MAP_LAYOUT: "GET_MAP_LAYOUT"
    },

    mutations: {
      MUTATE_MAP_LAYOUT: "MUTATE_MAP_LAYOUT"
    },

    actions: {
      SET_MAP_LAYOUT: "SET_MAP_LAYOUT"
    }
  };

// search
export const search = {
    getters: {
      GET_SEARCH_RESULTS: "GET_SEARCH_RESULTS",
      GET_HOVERED_ITEM: "GET_HOVERED_ITEM",
    },

    mutations: {
      MUTATE_SEARCH_RESULTS: "MUTATE_SEARCH_RESULTS",
      MUTATE_HOVERED_ITEM: "MUTATE_HOVERED_ITEM",
    },

    actions: {
      SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
      SET_HOVERED_ITEM: "SET_HOVERED_ITEM",
    }
  };

// filters
export const filters = {
    getters: {
      GET_FILTERS: "GET_FILTERS",
      GET_HISTOGRAM_PRICES: "GET_HISTOGRAM_PRICES",
      GET_APPLIED_FILTER: "GET_APPLIED_FILTER",
    },

    mutations: {
      MUTATE_FILTERS: "MUTATE_FILTERS",
      MUTATE_HISTOGRAM_PRICES: "MUTATE_HISTOGRAM_PRICES",
      MUTATE_APPLIED_FILTER: "MUTATE_APPLIED_FILTER",
      MUTATE_UPDATE_APPLIED_FILTER: "MUTATE_APPLIED_FILTER"
    },

    actions: {
      SET_FILTERS: "SET_FILTERS",
      SET_HISTOGRAM_PRICES: "SET_HISTOGRAM_PRICES",
      SET_APPLIED_FILTER: "SET_APPLIED_FILTER",
      SET_UPDATE_APPLIED_FILTER: "SET_APPLIED_FILTER"
    }
  };

// currencies
export const currencies = {
    getters: {
      GET_CURRENCIES: "GET_CURRENCIES"
    },

    mutations: {
      MUTATE_CURRENCIES: "MUTATE_CURRENCIES"
    },

    actions: {
      SET_CURRENCIES: "SET_CURRENCIES"
    }
  };

// requestData
export const requestData = {
  getters: {
    GET_REQUEST_DATA: "GET_REQUEST_DATA"
  },

  mutations: {
    MUTATE_REQUEST_DATA: "MUTATE_REQUEST_DATA"
  },

  actions: {
    SET_REQUEST_DATA: "SET_REQUEST_DATA"
  }
};
