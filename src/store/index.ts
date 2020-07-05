import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './modules/app';
import { UserState } from './modules/user';
import { TeamState } from './modules/team';

Vue.use(Vuex);

export interface RootState {
  app: AppState;
  user: UserState;
  team: TeamState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
