import {API_V1} from "/services/config/main-axios";

class Profile {
  getProfile(data) {
    return API_V1.get("/profile", data)
  }

}

export default new Profile();
