import axiosInstance from './axios-service';


const API_URL = "http://127.0.0.1:8000/api/";

class AuthService {
    login(username, password) {
      return axiosInstance
        .post(API_URL + "token/obtain/", { username, password })
        .then(response => {
            if (response.data.access) {
              localStorage.setItem("username", username);
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);
              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token'); 
            }
          return response.data;
        } 
      );
    }
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
    }
  
    register(username, email, password) {
      return axiosInstance.post(API_URL + "users/create/", {
        username,
        email,
        password,
      });
    }

    userLoggedIn() {
      return localStorage.getItem('username');
    }
  }
  
export default new AuthService();