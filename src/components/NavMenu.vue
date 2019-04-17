<template>
  <el-row class="tac">
    <el-col>
      <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >-->

      <el-menu
        style="height:100vh;"
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <el-submenu v-for="item in menus" :index="item.path" :key="item.path">
          <template slot="title">
            <i class="iconfont thr-iconpassword"></i>
            <span v-text="item.name" style="margin-left:10px"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.children" :key="sub.path">
            <el-menu-item :index="sub.path" v-text="sub.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 300px;
  min-height: 400px; */
  height: 100%;
}
</style>

<script>
import menus from "@/auto_router";
export default {
  data() {
    return {
      isCollapse: false,

      menus: []
    };
  },
  mounted() {
    this.authLoadingMenu();
  },
  computed: {
    getIsCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  watch: {
    getIsCollapse(val) {
      if (val == false) {
      }
      this.isCollapse = val;
    }
  },
  methods: {
    authLoadingMenu() {
      let auth = this.$store.state.auth;
      if (auth == "all") {
        this.menus = menus;
      } else {
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>