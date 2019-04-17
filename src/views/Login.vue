<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">商户管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="iconfont thr-iconuser"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="iconfont thr-iconpassword"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import routes from "@/auto_router";
import { truncate, truncateSync } from "fs";
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.clearUserInfo();
  },
  methods: {
    clearUserInfo() {
      localStorage.clear();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = qs.stringify(this.ruleForm);
          this.$http(
            "/admin/login/" +
              this.ruleForm.username +
              "/" +
              this.ruleForm.password +
              "/"
          )
            .then(res => {
              let userInfo = res.data.result[0];
              localStorage.setItem("username", userInfo.username);
              localStorage.setItem("level", userInfo.level);
              this.$store.commit("isAuth", userInfo.auth);

              this.$store.commit("isToken", (Math.random() + "").slice(2));

              this.autoAddRoutes();
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    autoAddRoutes() {
      let auth = this.$store.state.auth;

      if (auth == "all") {
        this.$router.addRoutes(routes);
        // this.$router不是响应式的，所以手动将路由元注入路由对象
        this.$router.options.routes.push(routes);
      } else {
        auth = auth.split(",");

        auth = [1];

        for (let i = 0; i < routes.length; i++) {
          let index = 0;

          let children = routes[i].children.filter(function(val) {
            return auth.indexOf(val.meta.tag) == -1 ? false : true;
          });

          if (children.length == 0) {
            routes.splice(i, 1);
          } else {
            routes[i].children = children;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>