<template>
  <div class="teaminf">
    <div class="infor-head">
      <el-tag type="primary">队伍详情</el-tag>
    </div>
    <div class="infor-display">
      <el-row class="name-row">
        <el-col :span="12">
          <p>
            <b>团队名称：</b>
            {{ teamInfo.team_name }}
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <b>项目名称：</b>
            {{ teamInfo.project_name }}
          </p>
        </el-col>
      </el-row>
      <el-row class="team-row">
        <el-col :span="12">
          <p>
            <b>队伍编号：</b>
            {{ teamInfo.team_id }}
          </p>
        </el-col>
        <el-col :span="12">
          <p id="team-code">
            <b>队伍口令:</b>
            {{ teamInfo.code }}
          </p>
        </el-col>
      </el-row>
      <el-row class="project-row">
        <el-col :span="12">
          <p>
            <b>实践地点：</b>
            {{ teamInfo.place }}
          </p>
        </el-col>
        <el-col>
          <p>
            <b>实践时间:</b>
            {{ teamInfo.plan_begin_time }} -- {{ teamInfo.plan_end_time }}
          </p>
        </el-col>
      </el-row>
      <el-row class="type-row type-and-form">
        <el-col :span="24">
          <p>
            <b>实践类型：</b>
            {{ PRACTICE_TYPE_LIST[teamInfo.project_type] }}
          </p>
        </el-col>
        <el-col :span="24">
          <p>
            <b>实践主题：</b>
            {{ PRACTICE_THEME_LIST[teamInfo.project_theme] }}
          </p>
        </el-col>
        <el-col :span="24">
          <p>
            <b>实践形式：</b>
            {{ PRACTICE_FORM_LIST[teamInfo.project_form] }}
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="container">
            <p>
              <b>实践背景：</b>
              {{ teamInfo.event_background }}
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="container">
            <p>
              <b>实践目的：</b>
              {{ teamInfo.event_aim }}
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="container">
            <p>
              <b>活动内容：</b>
              {{ teamInfo.event_content }}
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row class="fees">
        <el-col :span="8">
          <p>
            <b>交通费：</b>
            {{ teamInfo.fee_transport }}
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <b>印刷费：</b>
            {{ teamInfo.fee_print }}
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <b>其他费用：</b>
            {{ teamInfo.fee_other }}
          </p>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="teammate">
        <el-tag class="el-tag" type="info" size="mini">队伍成员</el-tag>
        <el-row v-for="(p, i) in teammatesInfo" id="teammate-row" :key="i">
          <el-col :span="8">
            <p>
              <b>姓名：</b>
              {{ p.user_name }}
            </p>
          </el-col>
          <el-col :span="8">
            <p>
              <b>队内职位：</b>
              {{ p.user_id == teamInfo.leader_id ? "队长" : (p.user_name == teamInfo.vice_leader_name ? "副队长" : "组员") }}
            </p>
          </el-col>
          <el-col :span="8">
            <p>
              <b>联系电话：</b>
              {{ p.mobile }}
            </p>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <p>
            <b>挂靠单位：</b>
            {{ BELONGTO_LIST[teamInfo.belong] }}
          </p>
        </el-col>
        <el-col v-if="hasDepartemnt" :span="12">
          <p>
            <b>职能单位：</b>
            {{ teamInfo.department }}
          </p>
        </el-col>
      </el-row>
      <el-row class="declare-row">
        <el-col :span="12">
          <p>
            <b>指导老师：</b>
            {{ teamInfo.teacher_name }}
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <b>是否跟随：</b>
            {{ teamInfo.teacher_follow == "1" ? '是' : '否' }}
          </p>
        </el-col>
      </el-row>
      <div class="el-row status-row">
        <div class="el-col">
          <p>
            <b>队伍当前状态：</b>
            {{ teamInfo.status| statusToReadable }}
          </p>
        </div>
      </div>
      <div v-if="hasSuggestion" class="el-row suggestion-row">
        <div class="el-col">
          <p>
            <b>老师给出的建议：</b>
            {{ teamInfo.suggestion }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import statusMixin from "@/utils/static/status";
import { getByUserId } from "@/api/common";
import {
  BELONGTO_LIST,
  PRACTICE_TYPE_LIST,
  PRACTICE_THEME_LIST,
  PRACTICE_FORM_LIST,
  DECLARATION_TYPE_LIST
} from "@/utils/static/consts";

export default {
  name: "TeamInfDisplay",
  mixins: [statusMixin],
  props: {
    teamInfo: Object,
    teammatesInfo: Array
  },
  data() {
    return {
      leader_name: "",
      BELONGTO_LIST,
      PRACTICE_TYPE_LIST,
      PRACTICE_THEME_LIST,
      PRACTICE_FORM_LIST,
      DECLARATION_TYPE_LIST
    };
  },
  computed: {
    hasSuggestion() {
      if (this.teamInfo.suggestion == null) {
        return false;
      } else {
        return true;
      }
    },
    hasDepartemnt() {
      if (this.teamInfo.department == null) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.getUserName();
    console.log(this.teamInfo);
  },
  methods: {
    async getUserName() {
      try {
        const data = await getByUserId(this.teamInfo.leader_id);
        this.leader_name = data.user_name;
      } catch (e) {
        this.$message({
          type: "error",
          message: "无法获取姓名," + e
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
}

.infor-head {
  margin-top: -4vw;
  display: flex;
  justify-content: flex-start;
}
.info-display p {
  margin: 0.3em;
}
.teaminf {
  margin-top: 40px;
}

.el-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 50px;
  margin-bottom: 20px;
}

#team-code {
  color: red;
}

.infor-display {
  display: flex;
  flex-direction: column;
  margin-top: 2em;
}

.row {
  height: 50px;
}

.teammate {
  margin-top: -1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#teammate-row {
  margin-top: 0.5em;
  margin-bottom: -0.8em;
  margin-left: 0.5em;
}

.info-display .container {
  overflow: hidden;
  word-wrap: break-word;
  width: 800px;
}
.info-display .container p {
  overflow: hidden;
}
@media screen and (max-width: 840px) {
  .el-row {
    height: 50px;
    font-size: 15px;
  }
  .el-col {
    height: 15px;
    width: 300px;
  }
  .teammate {
    margin: 20px 0 50px 0;
    min-width: 200px;
  }
  #teammate-row {
    height: 80px;
    display: flex;
    flex-direction: column;
    .el-col {
      margin: 5px 0;
    }
  }
}
@media screen and (max-width: 540px) {
  .el-row {
    flex-direction: column;
    justify-content: flex-start;
    height: 50px;
    font-size: 12px;
  }
  .el-col {
    height: 15px;
    width: 300px;
  }
  .team-row {
    margin: -20px 0;
  }
  .type-row {
    margin: -30px 0 -8px 0;
  }
  .status-row {
    margin: 0 0 -10px 0;
  }
  .suggestion-row {
    margin-bottom: -50px;
  }
}
@media screen and (max-width: 410px) {
  .el-row {
    flex-direction: column;
    justify-content: flex-start;
    height: 30px;
    font-size: 12px;
  }
  .fees {
    margin-bottom: 20px;
  }
  .teammate {
    margin: 30px 0 30px 0;
    min-width: 200px;
  }
  #teammate-row {
    height: 75px;
  }
  .el-col {
    height: 15px;
    width: 300px;
  }
  .team-row {
    margin: -18px 0 0 0;
  }
  .type-row {
    margin: -18px 0 0 0;
  }
  .declare-row {
    margin: 10px 0 15px 0;
  }
  .status-row {
    margin: 10px 0 0 0;
  }
  .suggestion-row {
    margin-bottom: -30px;
  }
}
</style>

<style lang="scss">
.el-col .el-col-12,
.el-col .el-col-24,
.el-col .el-col-8 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
