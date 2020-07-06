<template>
  <div>
    <div class="filter">
      <!-- 挂靠单位 -->
      <div class="select-belong">
        <div class="select-display">
          <div v-if="org<=1" class="select-1">
            <FitForm ref="form_belong" :mirrors="mirrors_belongs" />
          </div>
          <div class="select-2">
            <FitForm ref="form_type" :mirrors="mirrors_type" />
          </div>
        </div>
        <div class="select-button">
          <el-button class="belongs-button" type="success" @click="select()">筛选</el-button>
          <el-button class="belongs-button" type="info" @click="resetAll()">恢复默认</el-button>
        </div>
      </div>
      <div class="search">
        <div class="search-name">
          <div class="search-display">
            <p>队伍名</p>
            <el-input v-model="select_name.team_name" placeholder="请输入队伍名" clearable></el-input>
          </div>
          <div class="select-button">
            <el-button class="belongs-button" type="success" @click="getOneTeamByName()">搜索</el-button>
            <el-button class="belongs-button" type="info" @click="resetAll()">恢复默认</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="status" class="table-tab" @tab-click="handleClick">
      <el-tab-pane label="全部项目" name="all"></el-tab-pane>
      <el-tab-pane label="未提交项目" name="0"></el-tab-pane>
      <el-tab-pane label="未审核项目" name="1"></el-tab-pane>
      <el-tab-pane label="已通过项目" name="3"></el-tab-pane>
      <el-tab-pane label="未通过项目" name="2"></el-tab-pane>
    </el-tabs>
    <pager
      ref="refresh"
      :page-size="10"
      :request-func="getList"
      :error-msg="'无法获取'"
      :extra-data="status"
      :belong-data="belongs"
      :type-data="project_types"
    >
      <el-table
        ref="filterTable"
        v-loading="loading"
        slot-scope="props"
        border
        class="table-project"
        :data="props.list"
      >
        <el-table-column label="队伍名称">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.team_name }}</div>
              <div class="line">{{ scope.row.team_name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="projecta_name" label="项目名称">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.project_name }}</div>
              <div class="line">{{ scope.row.project_name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="project_type" label="项目类型">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div
                slot="content"
                v-if="scope.row.project_type <= 2 && !scope.row.project_type==undefined"
              >{{ PRACTICE_TYPES[scope.row.project_type].label }}</div>
              <div
                class="line"
                v-if="scope.row.project_type <= 2 && !scope.row.project_type==undefined"
              >{{ PRACTICE_TYPES[scope.row.project_type].label }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="project_theme" label="实践主题">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div
                slot="content"
                v-if="!isNaN(scope.row.project_theme)"
              >{{ PRACTICE_THEMES[scope.row.project_theme].label }}</div>
              <div
                class="line"
                v-if="!isNaN(scope.row.project_theme)"
              >{{ PRACTICE_THEMES[scope.row.project_theme].label }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="project_form" label="实践形式">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div
                slot="content"
                v-if="!isNaN(scope.row.project_form)"
              >{{ PRACTICE_FORMS[scope.row.project_form].label }}</div>
              <div
                class="line"
                v-if="!isNaN(scope.row.project_form)"
              >{{ PRACTICE_FORMS[scope.row.project_form].label }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.status | statusToReadable }}</div>
              <div class="line">{{ scope.row.status | statusToReadable }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="对该队伍的操作" width="230">
          <template slot-scope="scope">
            <div class="button-lists">
              <el-tooltip class="item" effect="dark" content="通过测验" placement="top">
                <el-button
                  v-show="canPass(scope.row)"
                  icon="el-icon-success"
                  circle
                  type="success"
                  class="button-lists-button"
                  size="small"
                  @click="projectPass(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="不能通过测验" placement="top">
                <el-button
                  v-show="canReject(scope.row)"
                  icon="el-icon-error"
                  circle
                  type="danger"
                  class="button-lists-button"
                  size="small"
                  @click="projectReject(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="给出建议" placement="top">
                <el-button
                  icon="el-icon-edit"
                  circle
                  type="primary"
                  size="small"
                  class="button-lists-button"
                  @click="Suggest(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="队伍详情" placement="top">
                <el-button
                  type="info"
                  class="button-lists-button"
                  icon="el-icon-more"
                  circle
                  size="small"
                  @click="openDialog(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="发回重改" placement="top">
                <el-button
                  v-show="canRemake(scope.row)"
                  icon="el-icon-back"
                  circle
                  type="danger"
                  size="small"
                  class="button-lists-button"
                  @click="projectRemake(scope.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </pager>
    <el-dialog v-dialogDrag :visible.sync="dialogVisible" :fullscreen="isPhone">
      <TeamInfoDisplay :team-info="dialogRow" :teammates-info="teammates" />
      <el-button
        round
        type="success"
        :disabled="!canPass(dialogRow)"
        @click="projectPass(dialogRow)"
      >通过</el-button>
      <el-button
        round
        type="danger"
        :disabled="!canReject(dialogRow)"
        @click="projectReject(dialogRow)"
      >不通过</el-button>
      <el-button
        round
        type="danger"
        :disabled="!canRemake(dialogRow)"
        @click="projectRemake(dialogRow)"
      >发回重改</el-button>
      <el-button round type="success" size="small" @click="Suggest(dialogRow)">给出建议</el-button>
    </el-dialog>
    <el-dialog v-dialogDrag title="给出建议" :visible.sync="suggestDialogVisible" :fullscreen="isPhone">
      <el-input
        v-model="suggestion"
        type="textarea"
        class="suggest-content"
        :rows="4"
        :cols="10"
        placeholder="请填写您要给出的建议"
      ></el-input>
      <el-button class="suggest-button" round type="success" @click="submitSuggestion()">提交</el-button>
      <el-button class="suggest-button" round type="info" @click="suggestDialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Pager from "@/components/ArtPager.vue";
import TeamInfoDisplay from "@/components/TeamInfoDisplay";
import statusMixin from "@/utils/static/status";
import {
  BELONGTOS,
  PRACTICE_TYPES,
  PRACTICE_FORMS,
  PRACTICE_THEMES
} from "@/utils/static/consts.js";
import {
  getTeammateInfo,
  getAdminTeams,
  auditTeam,
  getOneTeamByName,
  withDraw,
  suggestion
} from "@/api/team";
import { showAsynConfirm } from "@/utils/messageBox";
import { TeamModule } from "../../../store/modules/team";
import { DeviceType, AppModule } from "@/store/modules/app";
import FitForm from "@/components/FitForm/FitForm.vue";
import { UserModule } from "../../../store/modules/user";

const mirrors_belongs = [
  {
    type: "select",
    label: "挂靠单位",
    prop: "belongs",
    options: BELONGTOS
  }
];

const mirrors_type = [
  {
    type: "select",
    label: "实践类型",
    prop: "project_types",
    options: PRACTICE_TYPES
  }
];

export default {
  name: "ManageCheck",
  components: {
    Pager,
    TeamInfoDisplay,
    FitForm
  },
  mixins: [statusMixin],
  data() {
    return {
      BELONGTOS: BELONGTOS,
      PRACTICE_TYPES: PRACTICE_TYPES,
      PRACTICE_FORMS: PRACTICE_FORMS,
      PRACTICE_THEMES: PRACTICE_THEMES,
      loading: false,
      // 挂靠单位
      belongs: 0,
      // 实践类型
      project_types: 0,
      // 搜索队伍
      select_name: {
        team_name: ""
      },
      // 建议弹窗以及建议
      suggestion: "",
      suggestDialogVisible: false,
      timelyRow: "",
      // 队伍信息
      dialogVisible: false,
      dialogRow: {},
      teammates: [],
      // table切换时队伍的状态
      status: "all",
      mirrors_belongs,
      mirrors_type
    };
  },
  computed: {
    currentTeamId() {
      return TeamModule.currentTeamId;
    },
    org() {
      return UserModule.org;
    },
    isPhone() {
      return this.device === DeviceType.Mobile;
    }
  },
  methods: {
    // 给pager方法
    getList: getAdminTeams,
    // 搜索单只队伍
    async getOneTeamByName() {
      try {
        const data = await getOneTeamByName(this.select_name);
        this.teams = data.data;
        console.log(this.teams[0]);
        TeamModule.saveCurrentTeamId(this.teams[0].team_id);
        this.$message({
          type: "success",
          message: "查询队伍成功"
        });
        this.openDialog(this.teams[0]);
      } catch (err) {
        this.$message({
          type: "error",
          message: "没有搜索到对应的队伍"
        });
      }
    },
    async getTeammateInfo(team_id) {
      this.loading = true;
      try {
        const data = await getTeammateInfo(team_id);
        this.teammates = data.data.data;
        this.loading = false;
      } catch (message) {
        this.$message({
          type: "error",
          message: "获取该队伍信息失败  " + message
        });
      }
    },
    // 根据belongs筛选
    async select() {
      const form_1 = this.$refs["form_belong"];
      const form_2 = this.$refs["form_type"];
      let data_1 = "";
      if (UserModule.org <= 1) {
        data_1 = form_1.getData();
      }
      const data_2 = form_2.getData();
      console.log(data_1, data_2);
      if (UserModule.org <= 1) {
        this.belongs = data_1.belongs;
      } else {
        this.belongs = 0;
      }
      this.project_types = data_2.project_types;
      this.loading = true;
      setTimeout(() => {
        this.changePages(1);
        this.loading = false;
      }, 500);
    },
    // 重置
    resetAll() {
      const form_1 = this.$refs["form_belong"];
      const form_2 = this.$refs["form_type"];
      let data_1 = "";
      if (UserModule.org <= 1) {
        data_1 = form_1.setData(0);
      }
      const data_2 = form_2.setData(0);
      console.log(data_1, data_2);
      this.belongs = 0;
      this.project_types = 0;
      this.loading = true;
      setTimeout(() => {
        this.changePages(1);
        this.loading = false;
      }, 500);
    },
    // 切换面板时刷新
    handleClick() {
      setTimeout(() => {
        this.changePages(1);
      }, 200);
    },
    // teams详情窗口
    openDialog(row) {
      this.dialogRow = row;
      console.log(row);
      TeamModule.saveCurrentTeamId(row.team_id);
      setTimeout(() => {
        this.getTeammateInfo(row.team_id);
      }, 100);
      setTimeout(() => {
        this.dialogVisible = true;
      }, 300);
    },
    _check(row, msg, boolean) {
      showAsynConfirm(msg, "已取消", done => {
        this._auditTeam(row.team_id, boolean);
        done();
        this.changePages(1);
        setTimeout(() => {
          this.dialogVisible = false;
        }, 300);
      });
    },
    // 审核通过
    projectPass(row) {
      this._check(row, "确认该队伍的审核结果为通过？", 1);
    },
    // 审核不通过
    projectReject(row) {
      this._check(row, "确认该队伍的审核结果为不通过？", 0);
    },
    // 发回重改
    projectRemake(row) {
      showAsynConfirm(
        "确认将该队伍发回重改？队伍状态将转为未提交审核状态",
        "已取消",
        done => {
          this._withDraw(row, done);
        }
      );
    },
    // 执行审核，通过或者不通过
    async _auditTeam(team_id, data) {
      try {
        const return_data = await auditTeam(team_id, data);
        this.changePages(1);
        this.$message({
          type: "success",
          message: "审核完成！"
        });
        setTimeout(() => {
          this.dialogVisible = false;
        }, 300);
      } catch (message) {
        this.$message({
          type: "error",
          message: "审核失败，" + message
        });
      }
    },
    async _withDraw(row, done) {
      done();
      try {
        const data = await withDraw(row.team_id);
        this.changePages(1);
        this.$message({
          type: "success",
          message: "已发回重改！"
        });
      } catch (message) {
        this.$message({
          type: "error",
          message: "撤回失败，" + message
        });
      }
      this.changePages(1);
    },
    canPass(row) {
      return row.status == 1 || row.status == 2;
    },
    // 根据状态判断是否可以不通过
    canReject(row) {
      return row.status == 1 || row.status == 3;
    },
    // 根据状态判断是否可以发回重改
    canRemake(row) {
      return row.status == 2;
    },
    // 给出建议dialog
    Suggest(row) {
      this.suggestDialogVisible = true;
      this.timelyRow = row;
      TeamModule.saveCurrentTeamId(row.team_id);
    },
    submitSuggestion() {
      showAsynConfirm("确认给出该建议？", "已取消", done => {
        this._submitSuggestion(done);
      });
    },
    async _submitSuggestion(done) {
      done();
      try {
        const data = await suggestion(this.currentTeamId, this.suggestion);
        this.$message({
          type: "success",
          message: "成功给出建议！"
        });
        this.suggestDialogVisible = false;
        this.suggestion = "";
        this.changePages(1);
      } catch (message) {
        this.$message({
          type: "error",
          message: "未成功给出建议  " + message
        });
      }
    },
    changePages(i) {
      this.$refs.refresh.turn(i);
    }
  }
};
</script>


<style lang="scss" scoped>
.table-project {
  margin: 0 0 1em 0;
}

.button-lists {
  display: inline-block;
}

.button-lists-button {
  margin: 0.5em;
}
.suggest-button {
  margin-top: 1vw;
}
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0.5vw;
}
.search-name {
  display: flex;
  flex-direction: row;
}
.search-display {
  p {
    white-space: nowrap;
    margin: 0.6vw;
  }
  display: flex;
  width: 56.5%;
  flex-direction: row;
  margin-left: -1vw;
  margin-right: 0.5vw;
}
.select-belong {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 75%;
  min-width: 800px;
  margin: 0.5vw;
  max-height: 60px;
  p {
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb(78, 64, 53);
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-top: 0.3em;
    margin-right: 1em;
  }
  .select-display {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .select-button {
    display: flex;
    flex-direction: row;
    max-height: 39.5px;
    .belongs-button {
      transform: scale(0.9, 0.9);
    }
  }
}
@media screen and (max-width: 1400px) {
  .filter {
    flex-direction: column;
    justify-content: flex-start;
  }
  .search {
    justify-content: flex-start;
    transform: scale(0.9);
    margin: 0.5vw;
    left: -30px;
    position: relative;
  }
  .search-name {
    min-width: 600px;
  }
  .search-display {
    width: 66.5%;
  }
}
@media screen and (max-width: 900px) {
  .select-belong {
    .select-display {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
  }
}
@media screen and (max-width: 700px) {
  .select-belong p {
    font-size: 18px;
  }
  .select-belong {
    flex-direction: column;
    .select-button {
      margin-top: -25px;
      margin-bottom: 20px;
    }
    .belongs-button {
      transform: scale(0.9, 0.9);
    }
  }
}
@media screen and (max-width: 410px) {
  .select-belong {
    p {
      font-size: 15px;
    }
    .belongs-button {
      transform: scale(0.8, 0.8);
    }
  }
}
</style>

<style lang="scss">
.table-content {
  height: 120% !important;
}
.el-col-md-12 {
  width: 100% !important;
}
.el-table__row .cell .line {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media screen and (max-width: 1000px) {
  .table-tab {
    .el-tabs__nav {
      .el-tabs__item {
        font-size: 16px;
      }
    }
  }
  .el-table th > .cell {
    font-size: 15px;
  }
  .el-table .cell {
    font-size: 15px;
  }
  .el-table th,
  .el-table td {
    padding: 8px 0;
  }
}

@media screen and (max-width: 700px) {
  .table-tab {
    .el-tabs__nav {
      .el-tabs__item {
        font-size: 14px;
        padding: 0 10px;
        margin-top: -10px;
      }
    }
  }
  .el-table th > .cell {
    font-size: 14px;
  }
  .el-form--inline .form-field .el-form-item__label {
    width: 100px;
  }
  .el-table .cell {
    font-size: 14px;
  }
  .el-table th,
  .el-table td {
    padding: 6px 0;
  }
}
@media screen and (max-width: 410px) {
  .table-tab {
    .el-tabs__nav {
      .el-tabs__item {
        font-size: 12px;
        padding: 0 5px;
        margin-top: -14px;
      }
    }
  }
  .el-table th > .cell {
    font-size: 12px;
  }
  .el-table .cell {
    font-size: 12px;
  }
  .el-table th,
  .el-table td {
    padding: 4px 0;
  }
  .el-form-item__label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
