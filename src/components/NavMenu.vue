<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu v-for="item in menus" :index="item.path" :key="item.path">
          <template slot="title">
            <!-- <icon :name="item.icon"></icon> -->
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.children" :key="sub.path">
            <el-menu-item :index="sub.path" v-text="sub.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import menu from "@/menu-config";
import menus from "@/auto_router";
export default {
  data() {
    return {
      menu: menu,
      menus: []
    };
  },
  mounted() {
    this.authLoadingMenu();
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