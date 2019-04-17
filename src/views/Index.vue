<template>
  <div class="index">
    <el-container>
      <el-header class="header">
        <vheader/>
      </el-header>
      <el-container>
        <el-aside class="aside" :style="menuWidth">
          <navmenu></navmenu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu";
import Header from "@/components/Header";
export default {
  name: "index",
  components: {
    navmenu: NavMenu,
    vheader: Header
  },
  data: function() {
    return {
      menuWidth: "width:250px"
    };
  },
  computed: {
    getIsCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  watch: {
    getIsCollapse(val) {
      if (val == false) {
        this.menuWidth = "width:250px";
      } else {
        this.menuWidth = "width:65px";
      }
    }
  }
};
</script>
<style>
.header {
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
}
.aside {
  height: 100vh;
}
</style>
