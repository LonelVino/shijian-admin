import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import store from "@/store";

export interface UserState {
  token: string;
  name: string;
  has_login: number;
  role: string;
  user_id: number;
  org: number;
  net_id: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserState {
  public token = "";
  public name = "";
  public role = "";
  public has_login = 0;
  public user_id = 0;
  public org = 0;
  public net_id = "";

  @Action({ commit: "SET_TOKEN" })
  public async FedLogOut() {
    removeToken();
    this.REMOVE_TOKEN();
    console.log(this.token);
    return "";
  }

  @MutationAction({ mutate: ["role", "name", "has_login", "token"] })
  public async GetInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error("GetInfo: token is undefined");
    }
    const { data } = await getInfo(token);
    if (data.role && data.role.length > 0) {
      return {
        role: data.role,
        name: data.user.userinfo.username,
        has_login: data.has_login,
        token,
      };
    } else {
      throw Error("GetInfo: roles must be a non-null array!");
    }
  }

  @MutationAction({ mutate: ["token", "role"] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error("LogOut: token is undefined!");
    }
    await logout();
    removeToken();
    return {
      token: "",
      role: "",
    };
  }

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private REMOVE_TOKEN() {
    this.token = "";
  }

  @Mutation
  public GetUserInfo(data: any) {
    this.role = data.role;
    this.name = data.data.user.userinfo.username;
    this.has_login = data.data.has_login;
  }

  @Mutation
  public GetLoggedUserInfo(data: any) {
    if (data.success === 1) {
      const log_data = data.data;
      this.role = log_data.role;
      this.net_id = log_data.net_id;
      this.has_login = 1;
      this.user_id = log_data.user_id;
      this.org = log_data.org;
    }
  }
}

export const UserModule = getModule(User);
