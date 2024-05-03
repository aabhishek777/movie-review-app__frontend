 import axios from "axios"; 


export const api = axios.create({
    baseURL:'https://movie-review-app-backend-8iqb.onrender.com/api'
  });