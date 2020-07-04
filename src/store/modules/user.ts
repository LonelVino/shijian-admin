import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators'; 
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';

export interface UserState{ 
  token: string;
  name: string;
  has_login: number;
  role: string;
  user_id: number;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState { 
  public token = '';
  public name = '';
  public role = '';
  public has_login = 0;
  public user_id = 0;

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string; password: string }) { 
    const username = userInfo.username.trim();
    const { data } = await login(username, userInfo.password);
    setToken(data.token);
    return data.token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() { 
    removeToken();
    return '';
  }

  @MutationAction({ mutate: ['role', 'name', 'user_id', 'has_login', 'token'] })
  public async GetInfo() { 
    const token = getToken();
    if (token === undefined) { 
      throw Error('GetInfo: token is undefined');
    }
    const { data } = await getInfo(token);
    if (data.role && data.role.length > 0) {
      return {
        role: data.role,
        name: data.user.userinfo.username,
        has_login: data.has_login,
        user_id: data.user.userid,
        token: token
      }
    } else { 
      throw Error('GetInfo: roles must be a non-null array!');
    }
  }

  @MutationAction({ mutate: ['token', 'role'] })
  public async LogOut() { 
    if (getToken() === undefined) { 
      throw Error('LogOut: token is undefined!');
    }
    await logout();
    removeToken();
    return {
      token: '',
      role: '',
    };
  }

  @Mutation
  private SET_TOKEN(token: string) { 
    this.token = token;
  }

  @Mutation
  public GetUserInfo(data:any) { 
    this.role = data.role;
    this.name = data.data.user.userinfo.username;
    this.has_login = data.has_login;
  }
}

export const UserModule = getModule(User)
