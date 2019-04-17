import axios from "axios";
import { Message, Loading } from "element-ui";
import router from "./router";

axios.defaults.baseURL = "http://h5.020db9fb810c.com/cps/";

axios.defaults.withCredentials = true;

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
    if (data.code == 200) {
      Message.success(data.msg);
    }

    if (data.code == 500) {
      Message.error(data.msg);
      console.log(data.msg);
    }

    return response;
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
