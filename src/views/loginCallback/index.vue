<template>
  <el-container
    v-loading="true"
    class="main-container"
    element-loading-text="正在登陆中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { runCallback } from "../../api/cas";
import { UserModule } from "../../store/modules/user";
import { Message } from "element-ui";
import { getToken, setToken } from "@/utils/auth";

@Component
export default class LoginCallback extends Vue {
  async mounted() {
    // 当用户输入完用户名密码后，会跳转到这个地址  这个时候URL中带有guid参数  需要开启vue-router的history模式
    // 第一步：从URL中获取guid参数
    const { guid } = this.$route.query;
    try {
      const data: any = await runCallback(guid);
      UserModule.GetUserInfo(data);
      this.$message({
        type: "success",
        message: "登陆成功"
      });
      UserModule.SET_TOKEN("shijian-admin");
      localStorage.setItem("token", "shijian-admin");
    } catch (message) {
      this.$message({
        type: "error",
        message: "登陆失败"
      });
    }
    setTimeout(() => {
      this.$router.push("/");
    }, 500);
  }
}
</script>

<style lang="scss">
.el-container {
  height: 100%;
}
</style>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.main-container {
  height: 100%;
}
</style>
