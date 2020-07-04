import router from './router'
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { Route } from 'vue-router';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user.ts';
import Nprogress from 'nprogress';

Nprogress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
  Nprogress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      Nprogress.done();
    } else {
      if (UserModule.role === '') {
        UserModule.GetInfo().then(() => {
          next();
        }).catch((err) => {
          UserModule.FedLogOut().then(() => {
            Message.error(err || 'Veridication failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
  } else {
    console.log(to.path)
    console.log(UserModule.name)
    if (whiteList.indexOf(to.path) !== -1) { //要检索的字符串值没有出现，则该方法返回 -1
      next();
    } else {
      next(); // Redirect to login page
    }
  }
});


router.afterEach(() => { 
  Nprogress.done();
})
