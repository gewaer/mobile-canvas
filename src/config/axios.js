import axios from "axios";
import { API_KEY } from "react-native-dotenv";
import getStore from "../modules/store";

const store = getStore();

let instance = axios.create({
    baseURL: API_KEY
})

instance.interceptors.request.use(function (config) {
    if(!config.url.includes('auth')){
      const token = store.getState().session.token;
      config.headers.Authorization = token;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
  //DO SOMETHING
  return response;
}, function (error) {
  /**
   * TODO: Refreshing token validation
   */
  if (error.response.status === 401 || error.response.status === 403) {

  }
  return Promise.reject(error);
});

module.exports = instance;