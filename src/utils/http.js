import axios from "axios";
import auth from "../utils/auth";

const accessToken = auth.getToken("access_token");

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8848/api/",
  headers: {
    authorization: auth.getToken("access_token"),
    user_id: auth.getUserDetails("id")
  }
});

axiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const data = {
        id: auth.getUserDetails("id"),
        refreshToken: auth.getToken("refresh_token")
      };

      const res = await post("auth/refresh/", data);
      // let res = await axios({
      //   method: "post",
      //   url: "http://127.0.0.1:8848/api/auth/refresh",
      //   data: {
      //     id: auth.getUserDetails("id"),
      //     refreshToken: auth.getToken("refresh_token")
      //   }
      // });

      console.log(res);
      auth.setNewTokens(res.data);
      originalRequest.headers.authorization = auth.getToken("access_token");
      originalRequest.headers.user_id = auth.getUserDetails("id");

      return axios(originalRequest);
    }
  }
);

export function get(url, params) {
  return axiosInstance({
    method: "get",
    url,
    params
  });
}

export function post(url, data) {
  return axiosInstance({
    method: "post",
    url,
    data
  });
}
