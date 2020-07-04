<template>
  <div v-loading="loading">
    <slot :list="list"></slot>
    <el-pagination
      class="art-pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="current"
      prev-text=" "
      next-text=" "
      @current-change="turn"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: Number,
    requestFunc: Function,
    extraData: String,
    belongData: Number,
    typeData: Number,
    recruitData: String,
    messageData: String,
    errorMsg: String
  },
  data() {
    return {
      total: 0,
      current: 1,
      list: [],
      loading: false
    }
  },
  async mounted() {
    // 该组件加载完成后自动进行一次请求（第一页）
    await this.turn(1)
  },
  methods: {
    async turn(page) {
      // 翻页时发送请求
      this.loading = true // 开始请求
      const temp = this.extraData
      const belongTemp = this.belongData
      const typeTemp = this.typeData
      const recruitTemp = this.recruitData
      var form = {
        page,
        limit: this.pageSize,
        status: temp,
        org: belongTemp,
        project_type: typeTemp,
        recruit_type: recruitTemp
      }
      try {
        var d = await this.requestFunc(form)
        if (page > 1 && d.data.length <= 0) {
          // 若翻页超出范围则退至第一页
          this.current = 1
          form.page = 1
          d = await this.requestFunc(form)
        }
        console.log(d.data)
        this.total = d.data.total // 更新总条数
        this.list = d.data.data // 请求成功更新数组
      } catch (msg) {
        this.$message({
          type: 'error',
          message: this.errorMsg + '：' + msg
        }) // 请求失败显示失败信息
      }
      this.loading = false // 结束请求
    }
  }
}
</script>

<style lang="scss">
.art-pagination {
  margin-top: 0.5em;
}

.art-pagination.el-pagination {
  text-align: right;
}

.art-pagination.el-pagination button,
.art-pagination.el-pagination li {
  background-color: transparent !important;
}

.art-pagination.el-pagination li:hover,
.art-pagination.el-pagination .active {
  font-weight: bold;
}

.art-pagination.el-pagination li {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  transform: scale(0.94, 1.08);
}

.art-pagination.el-pagination .btn-prev span,
.art-pagination.el-pagination .btn-next span {
  height: 21px;
  width: 12px;
  min-width: 12px;
  margin-top: 4px;
}

.art-pagination.el-pagination .btn-prev span {
  // background-image: url(~@/assets/ui/lft.png);
  background-repeat: no-repeat;
}

.art-pagination.el-pagination .btn-next span {
  // background-image: url(~@/assets/ui/rt.png);
  background-repeat: no-repeat;
}

@media screen and (max-width: 830px) {
  .art-pagination.el-pagination {
    transform: scale(0.75,0.75);
    margin-left: 150px;
  }
}

@media screen and (max-width: 540px) {
  .art-pagination.el-pagination {
    transform: scale(0.70,0.70);
    margin-left: 0px;
  }
}

@media screen and (max-width: 410px) {
  .art-pagination.el-pagination {
    transform: scale(0.55,0.55);
    margin-left: 0px;
  }
}
</style>
