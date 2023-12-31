import axios from 'axios'
import cookie from "js-cookies"

const instance = axios.create({
    baseURL:'https://server.getdone.site',
  });

  instance.interceptors.request.use(
    (config) => {

    if (cookie.getItem('token')) {
      config.headers['Authorization'] = cookie.getItem('token');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  })

export default instance;