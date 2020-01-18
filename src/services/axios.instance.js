import axios from 'axios'

export const numbers = axios.create({
  baseURL: 'http://numbersapi.com/',
  timeout: 1000,
  headers: {'Accept': 'application/json'}
});