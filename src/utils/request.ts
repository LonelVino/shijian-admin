import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
import { UserModule } from "@/store/modules/user";

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.success !== 1 && res.code !== 200) {
      Message({
        message: "未知错误" + res.message,
        type: "error",
        duration: 10 * 1000,
      });
      if (res.code === 508 || res.code === 512 || res.code === 500) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          UserModule.FedLogOut().then(() => {
            location.reload(); // To prevent bugs from vue-router
          });
        });
      }
      return Promise.reject("error with code: " + res.code);
    } else {
      return response.data;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 10 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
