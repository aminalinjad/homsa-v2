import { API_V4 } from "/services/config/main-axios";

class CurrencyService {
    currencyLists() {
        return API_V4.get("/v4/core/currencies");
      }

}

export default new CurrencyService();