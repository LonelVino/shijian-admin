import router from './router'
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user.ts';
import Nprogress from 'nprogress';

Nprogress.configure({ showSpinner: false });

const whiteList = ['/login', '/login/callback'];

router.beforeEach((to: Route, from: Route, next: any) => {
  Nprogress.start();
  const token = localStorage.getItem('token')
  if (token == 'shijian-admin') { 
    UserModule.SET_TOKEN(token)
  }
  console.log(token)
  console.log(UserModule.token);
  if (UserModule.token != '') {
    if (to.path === '/login') {
      next({ path: '/' });
      Nprogress.done();
    } else {
      // if (UserModule.role === '') {
      //   UserModule.GetInfo().then(() => {
      //     next();
      //   }).catch((err) => {
      //     UserModule.FedLogOut().then(() => {
      //       Message.error(err || 'Veridication failed, please login again');
      //       next({ path: '/' });
      //     });
      //   });
      // } else {
      //   next();
      // }
      next();
    }
  } else {
    console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) { //要检索的字符串值没有出现，则该方法返回 -1
      next();
    } else {
      next(`/login?redirect=${to.path}`); // Redirect to login page
    }
  }
});


router.afterEach(() => { 
  Nprogress.done();
})
