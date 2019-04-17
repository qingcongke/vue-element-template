<template>
  <el-row>
    <el-col :span="24">
      <i class="iconfont thr-iconpassword" @click="onOffNav()"></i>
      <span style="font-size:20px">商户管理系统</span>
      <el-dropdown style="float:right" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">账号管理</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data: function() {
    return {
      username: localStorage.getItem("username")
    };
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      switch (command) {
        case "account":
          this.$router.push("/account");
          break;
        case "logout":
          window.localStorage.clear();
          window.sessionStorage.clear();
          this.$router.push("/login");
          window.location.reload();
          break;
        default:
          this.$message("位置的指令:" + command);
      }
    },
    onOffNav() {
      this.$store.commit(
        "switchNav",
        this.$store.state.isCollapse == false ? true : false
      );
    }
  }
};
</script>


<style scoped>
.iconfont {
  width: 100px;
  height: 100px;
  font-size: 30px;
}

.head-wrap {
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
