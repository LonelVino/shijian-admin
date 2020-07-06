export default {
  filters: {
    statusToReadable(val) {
      const map = {
        0: "队伍信息未提交审核",
        1: "队伍正在等待审核",
        2: "项目审核不通过，请重新修改信息",
        3: "项目审核通过，队伍未出行",
        4: "队伍正在外出",
        5: "队伍已经返回，等待测验",
        6: "项目测验不通过",
        7: "项目测验通过",
        8: "推荐至校级",
      };
      return map[val] || "未知状况";
    },
    typeToReadable(val) {
      const map = {
        1: "普通",
        2: "特别",
        3: "消息",
        4: "紧急",
      };
      return map[val] || "未知状况";
    },
  },
  computed: {
    noticeStatusColor() {
      // 1代表普通，2代特别，3代表消息，4代表紧急
      const map = {
        1: "#000000",
        2: "#ea1e63",
        3: "#4cb050",
        4: "#1976d3",
      };
      return map[this.status] || "grey";
    },
  },
};

//   < !--在双花括号中 -->
//     {{ value | function }}

// < !--在`v-bind` 中-- >
//   <div v-bind: id="rawId | function "></div>
