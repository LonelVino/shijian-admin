<template>
  <div>
     <el-tabs v-model="status" class="table-tab" @tab-click="handleClick">
      <el-tab-pane label="全部项目" name="all"></el-tab-pane>
      <el-tab-pane label="已出行队伍" name="4"></el-tab-pane>
      <el-tab-pane label="已返回未测验队伍" name="5"></el-tab-pane>
      <el-tab-pane label="已通过测验项目" name="7"></el-tab-pane>
      <el-tab-pane label="未通过测验项目" name="6"></el-tab-pane>
      <el-tab-pane label="校级答辩项目" name="8"></el-tab-pane>
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
      :data="props.list">
      <el-table-column label="队伍名称" >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.team_name }}
              </div>
              <div class="line">
                {{ scope.row.team_name }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="projecta_name"
          label="项目名称"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.project_name }}
              </div>
              <div class="line">
                {{ scope.row.project_name }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_type"
          label="项目类型"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content" v-if="scope.row.project_type <= 2 && !scope.row.project_type==undefined">
                {{ PRACTICE_TYPES[scope.row.project_type].label }}
              </div>
              <div class="line" v-if="scope.row.project_type <= 2 && !scope.row.project_type==undefined">
                {{ PRACTICE_TYPES[scope.row.project_type].label }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_theme"
          label="实践主题"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content" v-if="!isNaN(scope.row.project_theme)">
                {{ PRACTICE_THEMES[scope.row.project_theme].label }}
              </div>
              <div class="line" v-if="!isNaN(scope.row.project_theme)">
                {{ PRACTICE_THEMES[scope.row.project_theme].label }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_form"
          label="实践形式"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content" v-if="!isNaN(scope.row.project_form)">
                {{ PRACTICE_FORMS[scope.row.project_form].label }}
              </div>
              <div class="line" v-if="!isNaN(scope.row.project_form)">
                {{ PRACTICE_FORMS[scope.row.project_form].label }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.status | statusToReadable }}
              </div>
              <div class="line">
                {{ scope.row.status | statusToReadable }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="对该队伍的操作" width="230">
          <template slot-scope="scope">
            <div class="button-lists">
              <el-tooltip
              class="item"
              effect="dark"
              content="通过测验"
              placement="top"
            >
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
            <el-tooltip
              class="item"
              effect="dark"
              content="推荐至校级答辩"
              placement="top"
            >
              <el-button
                v-show="canRecommon(scope.row)"
                icon="el-icon-arrow-up"
                circle
                type="success"
                class="button-lists-button"
                size="small"
                @click="projectRecommon(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="不能通过测验"
              placement="top"
            >
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
            <el-tooltip
              class="item"
              effect="dark"
              content="取消校级答辩资格"
              placement="top"
            >
              <el-button
                v-show="canRecRej(scope.row)"
                icon="el-icon-arrow-down"
                circle
                type="danger"
                class="button-lists-button"
                size="small"
                @click="projectRecRej(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="给出建议"
              placement="top"
            >
              <el-button
                icon="el-icon-edit"
                circle
                type="primary"
                size="small"
                class="button-lists-button"
                @click="Suggest(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="队伍详情"
              placement="top"
            >
              <el-button
                type="info"
                class="button-lists-button"
                icon="el-icon-more"
                circle
                size="small"
                @click="openDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </pager>
    <el-dialog v-dialogDrag title="给出建议" :visible.sync="suggestDialogVisible" :fullscreen="isPhone">
      <el-input
        v-model="suggestion"
        type="textarea"
        class="suggest-content"
        :rows="4"
        :cols="10"
        placeholder="请填写您要给出的建议"
      ></el-input>
      <el-button round class="suggest-button" type="success" @click="submitSuggestion()">
        提交
      </el-button>
      <el-button round class="suggest-button" type="info" @click="suggestDialogVisible = false">
        取消
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Pager from '@/components/ArtPager.vue';
import statusMixin from '@/utils/static/status';
import { BELONGTOS, PRACTICE_TYPES, PRACTICE_FORMS, PRACTICE_THEMES } from '@/utils/static/consts.js';
import { 
  getTeammateInfo,
  getAdminTeams,
  teamIsPass,
  suggestion,
  getOneTeamByName,
  toSchoolLevel,
  cancelToSchool } from '@/api/team'
import { showAsynConfirm } from '@/utils/messageBox';
import { TeamModule } from '../../../store/modules/team';
import { DeviceType, AppModule } from '@/store/modules/app';

const mirrors_belongs = [
  {
    type: 'select',
    label: '挂靠单位',
    prop: 'belongs',
    options: BELONGTOS
  }
]

const mirrors_type = [
  {
    type: 'select',
    label: '实践类型',
    prop: 'project_types',
    options: PRACTICE_TYPES
  }
]


export default {
  name: 'ManageCheck',
  components: {
    Pager
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
        team_name: ''
      },
      // 建议弹窗以及建议
      suggestion: '',
      suggestDialogVisible: false,
      timelyRow: '',
      // 队伍信息
      dialogVisible: false,
      dialogRow: {},
      teammates: [],
      // table切换时队伍的状态
      status: 'all', 
      mirrors_belongs,
      mirrors_type,
    }
  },
  computed: {
    currentTeamId(){
      return TeamModule.currentTeamId;
    },
    isPhone() {
      return this.device === DeviceType.Mobile
    }
  },
  methods: {
    saveCurrentTeamId: TeamModule.saveCurrentTeamId,
    // 给pager方法
    getList: getAdminTeams,
    // 搜索单只队伍
    async getOneTeamByName() {
      try {
        const data = await getOneTeamByName(this.select_name)
        this.teams = data
        this.saveCurrentTeamId(data[0].team_id)
        this.openDialog(data[0])
      } catch (err) {
        this.$message({
          type: 'error',
          message: '没有搜索到对应的队伍'
        })
      }
    },
    async getTeammateInfo(team_id) {
      this.loading = true
      try {
        const data = await getTeammateInfo(team_id)
        this.teammates = data.data
        this.loading = false
      } catch (message) {
        this.$message({
          type: 'error',
          message: '获取该队伍信息失败  ' + message
        })
      }
    },
    // 根据belongs筛选
    async select() {
      const form_1 = this.$refs['form_belong']
      const form_2 = this.$refs['form_type']
      const data_1 = form_1.getData()
      const data_2 = form_2.getData()
      console.log(data_1, data_2)
      this.belongs = data_1.belongs
      this.project_types = data_2.project_types
      this.loading = true
      setTimeout(() => {
        this.changePages(1)
        this.loading = false
      }, 500)
    },
    // 重置
    resetAll() {
      const form_1 = this.$refs['form_belong']
      const form_2 = this.$refs['form_type']
      const data_1 = form_1.setData(0)
      const data_2 = form_2.setData(0)
      console.log(data_1, data_2)
      this.belongs = 0
      this.project_types = 0
      this.loading = true
      setTimeout(() => {
        this.changePages(1)
        this.loading = false
      }, 500)
    },
    // 切换面板时刷新
    handleClick() {
      setTimeout(() => {
        this.changePages(1)
      }, 200)
    },
    // teams详情窗口
    openDialog(row) {
      this.dialogRow = row
      console.log(row)
      this.saveCurrentTeamId(row.team_id)
      setTimeout(() => {
        this.getTeammateInfo(row.team_id)
      }, 100)
      setTimeout(() => {
        this.dialogVisible = true
      }, 300)
    },
    // 执行审核，通过或者不通过
    async _teamIsPass(team_id, data) {
      try {
        const return_data = await teamIsPass(team_id, data)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    async _toSchoolLevel(team_id) {
      try {
        const return_data = await toSchoolLevel(team_id)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '成功推荐到校级答辩'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    async _cancelToSchool(team_id) {
      try {
        const return_data = await cancelToSchool(team_id)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '已取消校级答辩的资格'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    _check(row, msg, boolean) {
      showAsynConfirm(msg, '已取消', (done) => {
        this._teamIsPass(row.team_id, boolean)
        done()
        this.changePages(1)
      })
    },
    _checkRec(row, msg, boolean) {
      showAsynConfirm(msg, '已取消', (done) => {
        if (boolean) {
          this._toSchoolLevel(row.team_id)
        } else if (!boolean) {
          this._cancelToSchool(row.team_id)
        }
        done()
        this.changePages(1)
      })
    },
    // 审核通过
    projectPass(row) {
      this._check(row, '确认要通过该队伍的审核？', 1)
    },
    // 审核不通过
    projectReject(row) {
      this._check(row, '确认不通过该队伍的审核？', 0)
    },
    // 推荐到校级
    projectRecommon(row) {
      this._checkRec(row, '确认推荐该队伍到校级答辩？', 1)
    },
    // 取消推荐到校级
    projectRecRej(row) {
      this._checkRec(row, '确认取消该队伍校级答辩的资格？', 0)
    },
    // 根据状态判断是否可以通过
    canPass(row) {
      return row.status == 5 || row.status == 6
    },
    // 根据状态判断是否可以不通过
    canReject(row) {
      return row.status == 5 || row.status == 7
    },
    canRecommon(row) {
      return row.status == 7
    },
    canRecRej(row) {
      return row.status == 8
    },
    // 给出建议dialog
    Suggest(row) {
      this.suggestDialogVisible = true
      this.timelyRow = row
      this.saveCurrentTeamId(row.team_id)
    },
    submitSuggestion() {
      showAsynConfirm('确认给出该建议？', '已取消', done => {
        this._submitSuggestion(done)
      })
    },
    async _submitSuggestion(done) {
      done()
      try {
        const data = await suggestion(this.currentTeamId, this.suggestion)
        this.$message({
          type: 'success',
          message: '成功给出建议！'
        })
        this.suggestDialogVisible = false
        this.suggestion = ''
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '未成功给出建议  ' + message
        })
      }
    },
    changePages(i) {
      this.$refs.refresh.turn(i)
    }
  }
}
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
  .el-table th, .el-table td {
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
  .el-table th, .el-table td {
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
  .el-table th, .el-table td {
    padding: 4px 0;
  }
  .el-form-item__label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden
  }
}
</style>
