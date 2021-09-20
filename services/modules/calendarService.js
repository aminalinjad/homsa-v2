import {API_V1} from "/services/config/main-axios";

class calendarService {
  calendar(data) {
    return API_V1.post("/search")
  }

}

export default new calendarService();
