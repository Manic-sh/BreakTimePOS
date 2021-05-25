import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

class AuthService {
    login(username, password) {
      return axios
        .post(API_URL + "token/obtain/", { username, password })
        .then(response => {
          if (response.data.access) {
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("username", username);
          }
          return response.data;  
        });
    }
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("username");
    }
  
    register(username, email, password) {
      return axios.post(API_URL + "users/create/", {
        username,
        email,
        password,
      });
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
  
export default new AuthService();