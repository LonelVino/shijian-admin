<template>
  <div class="login-container">
    <el-form 
    ref="loginForm" 
    :model="loginForm" 
    :rules="loginRules"
    class="login-form"
    auto-complete="on" label-position="left">
    <h3 class="title">暑期实践后台管理</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username"
        type="text" auto-complete="on" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button 
        :loading="loading" 
        type="primary" 
        style="width:100%;" 
        @click.native.prevent="handleLogin"> 
        <!-- 1.在封装好的组件上使用，所以要加上.native才能click  2.prevent就相当于..event.preventDefault() -->
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { isValidUsername } from '@/utils/validate';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { ElForm } from 'element-ui/types/form';
import { getRedirectUrl } from '@/api/cas';


const validateUsername = (rule: any, value: string, callback: any) => {
  if (!isValidUsername(value)) {
    callback(new Error('请输入正确的用户名'));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于5位数'));
  } else {
    callback();
  }
};
@Component
export default class Login extends Vue {
  private loginForm = {
    username: 'admin',
    password: 'admin',
  };
  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername}],
    password: [{ required: true, trigger: 'blur', validator: validatePass}],
  };
  private loading = false;
  private pwdType = 'password';
  private redirect: string | undefined = undefined;
  @Watch('$route', { immediate: true})
  private OnRouteChange(route: Route) {
    this.redirect = route.query && route.query.redirect as string;
  }
  private showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = '';
    } else {
      this.pwdType = 'password';
    }
  }
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if(valid) {
        this.loading = true;
        this.handlRedirect();
      } else {
        console.log('this is invalid');
        return false;
      }
    });
  }
  private async handlRedirect() {
    try {
      this.$message({
        type: 'info',
        message: '正在登陆中'
      })
      const data:any = await getRedirectUrl()
      location.href = data.data
    } catch (message) {
      this.$message({
        type: 'error',
        message: '无法登录' + message
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    border:1px solid #353535; 
  }
  .el-input {
    display: inline-block;
    width: 85%;
    
  }
  .el-form-item {
    background: #ffffff;
    color: #454545;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin:0 5px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
