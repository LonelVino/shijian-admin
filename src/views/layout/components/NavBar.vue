<template>
  <div class="navbar">
    <Hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <el-dropdown class="avatar-container" trigger="click">   
      <div class="avatar-wrapper">
        <div class="navbar-text">
          <p>{{ username }}</p>
        </div>
        <i id="icon-user" class="el-icon-user-solid"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="handleLogin">LogIn</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Hamburger from '@/components/Hamburger/index.vue';
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { UserModule } from '@/store/modules/user';
import { getRedirectUrl } from '../../../api/cas';

@Component({
  components: {
   Hamburger,
  },
})
export default class Navbar extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get username() {
    return UserModule.name;
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  mounted() {
    console.log(this.username);
  }

  private async handleLogin() {
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

  private logout() {
    UserModule.LogOut().then(() => {
      location.reload();  // 为了重新实例化vue-router对象 避免bug
    });
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center; 
      cursor: pointer;
      position: relative;
      line-height: initial;
      height: 100%;
      .navbar-text {
        p {
          height: 0.8vw;
          margin: auto;
          font-size: 0.8vw;
        }
      }
      i {
       transform: scale(2)
      }
      #icon-user {
        margin-left: 2vw;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

