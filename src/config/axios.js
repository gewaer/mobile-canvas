import axios from "axios";
import { API_KEY } from "react-native-dotenv";
import getStore from "../store/store";

const store = getStore();

let instance = axios.create({
    baseURL: API_KEY
})

instance.interceptors.request.use(function (config) {
    if(!config.url.includes('auth')){
      const token = store.getState().session.token;
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
  //DO SOMETHING
  return response;
}, function (error) {

  return Promise.reject(error);
});

module.exports = instance;
