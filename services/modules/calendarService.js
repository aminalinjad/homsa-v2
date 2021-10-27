import {API_V1} from "/services/config/main-axios";

class calendarService {
  calendar(monthNumber) {
    return API_V1.get(`/calendar?month_number=${monthNumber}`)
  }
}

export default new calendarService();
