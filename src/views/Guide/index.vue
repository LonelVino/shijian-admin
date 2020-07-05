<template>
  <div class="panel-material panel-dev">
    <div id="board" class="board">
      <p class="title">
        所有资料下载
      </p>
      <pager ref="refresh" :page-size="8" :request-func="getList" :error-msg="'无法获取'">
        <el-table
          slot-scope="props"
          border
          :data="props.list"
          class="material-board"
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            sortable
            label="标题"
          ></el-table-column>
          <el-table-column prop="create_time" label="上传时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="下载资料" placement="top">
                <el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  class="button-lists-button"
                  @click="handleDownload(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除资料" placement="top">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  class="button-lists-button"
                  type="danger"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pager>
    </div>
    <div class="upload">
      <p class="upload-title">
        上传区
      </p>
      <el-input v-model="params.title" class="upload-input" placeholder="请输入资料标题"></el-input>
      <el-upload
        ref="uploader"
        class="upload-demo"
        drag
        action="/api/admin/guide"
        :data="uploadData"
        :limit="1"
        :file-list="fileList"
        :auto-upload="false"
        :on-error="onError"
        :on-success="onSuccess"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
          <br>（一次最多上传一个文件）
        </div>
        <div slot="tip" class="el-upload__tip">
          文件长度不能超过8MB
        </div>
      </el-upload>
      <el-button class="upload-button" type="primary" @click="commit">
        上传文件
      </el-button>
      <el-button class="upload-button" type="primary" @click="checkMine">
        我的上传
      </el-button>
      <el-dialog v-dialogDrag title="我的上传" :visible.sync="dialogTableVisible" :fullscreen="isPhone">
        <el-table
          v-loading="loading"
          v-dialogDrag
          border
          :data="myMaterials"
          class="material-board"
          style="width: 100%"
        >
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="create_time" label="上传时间" width="180"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="下载资料" placement="top">
                <el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  class="button-lists-button"
                  @click="handleDownload(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除资料" placement="top">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  class="button-lists-button"
                  type="danger"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pager from '@/components/ArtPager'
import { showAsynConfirm } from '@/utils/messageBox'
import { getAllGuide, deleteOneGuide } from '@/api/guide'
import { DeviceType, AppModule } from '@/store/modules/app';
import { UserModule } from '../../store/modules/user';


export default {
  name: 'PanelMaterial',
  components: {
    Pager
  },
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      materials: [],
      myMaterials: [],
      params: {
        title: ''
      },
      fileList: []
    }
  },
  methods: {
    async _getAllGuides() {
      this.loading = true
      try {
        const data = await getAllGuide()
        this.materials = data.data
        this.loading = false
      } catch (message) {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    // 分页器获取方法
    getList: getAllGuide,
    // 删除某个文件
    handleDelete(row) {
      showAsynConfirm(
        '该操作不可撤销，确定删除该资料？',
        '删除已取消',
        done => {
          this._handleDelete(row.guide_id, done)
        }
      )
    },
    // async样式的删除请求
    async _handleDelete(id, done) {
      const delete_id = id.toString()
      try {
        const data = await deleteOneGuide(id)
        this.$message({
          type: 'success',
          message: '已删除！'
        })
        done()
        this.changePages(1)
      } catch (message) {
        done()
        this.$message({
          type: 'error',
          message: '删除失败！'
        })
      }
      this._getAllGuides()
    },
    // 提交上传
    commit() {
      if (this.params.title == '') {
        this.$message({
          type: 'warning',
          message: '上传失败，资料不可以没有标题！'
        })
      } else {
        showAsynConfirm('您确定要上传该资料？', '已取消上传', done => {
          this._commit(done)
        })
      }
    },
    _commit(done) {
      // TODO 检查大小以及自动清空列表
      if (this.params.title == '') {
        this.$message({
          type: 'error',
          message: '上传失败，请完整填写信息！'
        })
      } else {
        this.$refs.uploader.submit()
      }
      done()
    },
    // 上传失败时
    onError(err) {
      this.$message({
        type: 'error',
        message: '上传失败！'
      })
    },
    // 上传成功时
    onSuccess(response) {
      if (response.success) {
        this.changePages(1)
        this.fileList = []
        this.params.title = null
        this.$message({
          type: 'success',
          message: '上传成功！'
        })
      } else {
        this.$message({
          type: 'error',
          message: response.err_msg
        })
      }
    },
    async checkMine() {
      this.dialogTableVisible = true
      this.myMaterials = []
      try {
        let data = await getAllGuide()
        const total = data.data.total
        data = data.data.data
        for (let i = 0; i < total; i++) {
          if (data[i].author_id == UserModule.user_id) {
            this.myMaterials.push({
              guide_id: data[i].guide_id,
              create_time: data[i].create_time,
              author_id: data[i].author_id,
              title: data[i].title,
              update_time: data[i].update_time
            })
          }
        }
      this.$message({
          type: 'success',
          message: '获取成功'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    changePages(i) {
      this.$refs.refresh.turn(i)
    }
  },
  computed: {
    isPhone() {
      return this.device === DeviceType.Mobile
    },
    uploadData() {
      return {
        title: this.params.title
      }
    }
  }
}
</script>

 <style lang="scss" scoped>
.panel-material {
  .upload-title,
  .title {
    display: flex;
    justify-content: flex-start;
    width: 10vw;
    line-height: 46px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-bottom: 10px;
  }

  .material-board {
    margin: 1em 0;
  }

  .button-lists-button {
    margin: 0 0.5em 0 1em;
  }

  .upload {
    width: 40%;
    margin-top: 2em;
    overflow: hidden;
    margin-left: -6vw;
    .upload-title{
      margin-left: 6vw;
    }
    .switch {
      margin: 1em 0;
    }
    .title {
      margin: 1em 0 0 2em;
    }
    .upload-demo {
      margin: 1em 0;
    }
    .upload-input {
      width: 350px;
    }
  }

  .edit-title {
    margin-bottom: 1em;
  }
}
@media screen and (max-width: 940px) {
 .panel-material{
   .title,
   .upload-title,
   .upload-input {
      font-size: 13px;
    }
    .upload-input,
    .upload-demo {
      transform: scale(0.80,0.80);
    }
    .upload-title {
      margin-left: 5vw;
    }
    .upload {
      margin: -2vw 0 0 -8vw;
    }
    .upload-input {
      margin-left: 22px;
    }
    .upload-button {
      margin-left: 60px;
    }
 }
}

@media screen and (max-width: 540px) {
  .panel-material{
    .title,
    .upload-title,
    .upload-input {
      font-size: 12px;
    }
    .upload-button {
      transform: scale(0.80,0.80);
      margin: 20px 0 0 20px;
      position: relative;
      top: -20px;
    }
  }
}
</style>

<style lang="scss">
.el-table__row
{
  .cell {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
@media screen and (max-width: 1000px) {
  .panel-dev{
    .title-line {
      font-size: 16px;
      .title {
        width: 80px;
        font-size: 16px;
        margin-left: 12px;
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
}

@media screen and (max-width: 700px) {
  .panel-dev{
    .title-line {
      font-size: 14px;
      .title {
        width: 80px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .el-table th > .cell {
      font-size: 14px;
    }
    .el-table .cell {
      font-size: 14px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
    }
  }
}

@media screen and (max-width: 410px) {
  .panel-dev{
    .title-line {
      font-size: 12px;
      .title {
        width: 70px;
        font-size: 12px;
        margin-left: 6px;
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
  }
}
</style>
