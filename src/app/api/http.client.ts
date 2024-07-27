import axios from 'axios';
import * as config from '../config';

export enum HttpClientType {
  DEFAULT = "DEFAULT",
  RECOMMENDER = "RECOMMENDER"
}

// https://www.npmjs.com/package/nock#axios
// axios.defaults.adapter = require('axios/lib/adapters/http');

export const axiosInstance = axios.create({
  baseURL: config.MOVIE_DB_BASE_URL,
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: 'en-US',
  },
});

const defaultAxiosConfig = {
  baseURL: config.MOVIE_DB_BASE_URL,
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: 'en-US',
  }
};

const recommenderAxiosConfig = {
  baseURL: config.RECOMMENDER_API_BASE_URL,
};

export const getAxiosInstance = (clientType: HttpClientType = HttpClientType.DEFAULT)=> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let httpConfig = defaultAxiosConfig as any;
  if(clientType === HttpClientType.RECOMMENDER){
    httpConfig = recommenderAxiosConfig;
  }

  return axios.create(httpConfig);

}
