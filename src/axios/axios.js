import axios from 'axios'

const instance = axios.create({
    baseURL:'https://server.getdone.site/',
  });

export default instance;