import axios from "axios";
import { VIVOOK_APP_BASE_API_URL } from "./env";
import { Alert } from "react-native";
import getStore from "../store/getStore";

let instance = axios.create({
    baseURL: VIVOOK_APP_BASE_API_URL
})

instance.interceptors.request.use(function (config) {
    if(!config.url.includes('auth')){
        console.log(config)
        const token = getStore().getState().session.token;
        config.headers.Authorization = token;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

module.exports = instance;