import { VuexModule, Module, Getter, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface TeamState { 
  team: Array<any>;
  currentTeamId: number;
  isEdit: boolean;
}

@Module({ dynamic: true, store, name: 'team' })
class Team extends VuexModule implements TeamState { 
  public team = [];
  public currentTeamId = 0;
  isEdit = false;

  @Getter
  public getCurrentTeamId() {
    return this.currentTeamId;
   }
    
  @Mutation
  public saveCurrentTeamId(currentTeamId: number) {
    this.currentTeamId = currentTeamId;
  }
}

export const TeamModule = getModule(Team)
