import axios from "axios";
import { Message, Loading } from "element-ui";
import QS from "qs";
import router from "./router";

import urlPrefix from "../server";

let domain = window.location.host.split(":")[0];
console.log(domain);
axios.defaults.baseURL = urlPrefix.dev;

sessionStorage.setItem("baseUrl", urlPrefix.dev);

// if (domain == "localhost" || domain == "127.0.0.1") {
//   console.log("本地运行！");

//   axios.defaults.baseURL = urlPrefix.dev;
//   Vue.prototype.domain = urlPrefix.dev;
//   sessionStorage.setItem("baseUrl", urlPrefix.dev);
// } else {
//   console.log("读取/server.json");
//   let getDomain = "";
//   //获取获取服务器的域名1

//   (async () => {
//     getDomain = await new Promise((resolve, reject) => {
//       axios
//         .get(
//           //"http://conf.p1000y.com/?app=zhanshen",
//           "./server.json"
//         )
//         .then(response => {
//           resolve(response.data);
//         });
//     });
//     axios.defaults.withCredentials = true;
//     getDomain = getDomain.os_server;

//     sessionStorage.setItem("baseUrl", getDomain);

//     axios.defaults.baseURL = getDomain;
//     Vue.prototype.domain = getDomain;
//   })();

//   console.log(".....");
//   console.log(getDomain);
// }

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

let loading;
//开始加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "数据加载中...",
    background: "rgba(0,0,0,0,7)"
  });
}
//结束加载动画
function endLoading() {
  loading.close();
}

//请求拦截
axios.interceptors.request.use(
  request => {
    request.withCredentials = true;
    //加载动画
    startLoading();

    if (localStorage.eleToken) {
      //设置统一的请求头
      request.headers.Authorization = localStorage.eleToken;
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  response => {
    //结束动画
    endLoading();

    let data = response.data;

    if (data.code == 400) {
      Message.error("Session 失效，请重新登录");

      console.log(data.msg);
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.$router.push("/login");
      window.location.reload();
    }
    if (data.code == 500) {
      Message.error(data.msg);
      console.log(data.msg);
    }

    return response.data;
  },
  error => {
    //结束动画
    endLoading();
    Message.error(error.resonse.msg);

    //获取错误状态码
    const { code } = error.response;
    if (code == 401) {
      Message.error("Token 失效，请重新登录！");
      //清除token
      localStorage.removeItem("eleToken");
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axios;
