import axios from "axios";

// const instance = axios.create();

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  rejectUnauthorized: false,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(
  res => res,
  err => {
    throw new Error(err.response.data.message);
  }
);

export default instance;
