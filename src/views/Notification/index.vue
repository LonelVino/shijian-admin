<template>
  <div class="panel-notification panel-dev">
    <div class="board">
      <p class="title">
        所有（未过期的）实践公告
      </p>
      <pager 
        ref="refresh" 
        :page-size="8" 
        :request-func="getList" 
        :error-msg="'无法获取'"
      >
        <el-table
          v-loading="loading"
          slot-scope="props"
          :data="props.list"
          class="notification-board"
          style="width: 100%"
          border
        >
          <el-table-column prop="title" label="类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type==1" type="primary">
                普通
              </el-tag>
              <el-tag v-if="scope.row.type == 2" type="success">
                特别
              </el-tag>
              <el-tag v-if="scope.row.type == 3" type="info">
                消息
              </el-tag>
              <el-tag v-if="scope.row.type == 4" type="danger">
                紧急
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="overtime" label="公告过期时间" width="180"></el-table-column>
          <el-table-column prop="update_time" label="最新更新时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </pager>
    </div>
    <el-dialog
      v-dialogDrag
      title="修改实践公告"
      :visible.sync="edit.visible"
      :fullscreen="isPhone"
      class="notification-edit-dialog"
    >
      <div class="notification-edit-content">
        <el-input v-model="edit.row.title" class="edit-title" placeholder="请填写新的实践公告信息标题"></el-input>
        <div class="container">
          <el-input
            id="info-notification-mce"
            v-model="edit.row.content"
            v-loading="edit.loading"
            type="textarea"
            :rows="4"
            :cols="10"
            class="editor-content"
            placeholder="请输入新的通知内容"
          ></el-input>
        </div>
        <div class="block">
          <span class="demonstration">
            选择公告过期时间
          </span>
          <el-date-picker
            v-model="edit.row.overtime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <div class="type-radio">
          <span class="demonstration">
            选择公告类型
          </span>
          <el-radio-group v-model="edit.row.type">
            <el-radio-button label="1">
              普通
            </el-radio-button>
            <el-radio-button label="2">
              特别
            </el-radio-button>
            <el-radio-button label="3">
              消息
            </el-radio-button>
            <el-radio-button label="4">
              紧急
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-button type="primary" @click="submitEdit()">
          提交修改
        </el-button>
        <el-button @click="edit.visible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <div class="editor">
      <p class="editor-title">
        创建新的实践公告
      </p>
      <el-input v-model="currentNotification.title" placeholder="请输入通知标题"></el-input>
      <div class="quill-editor">
        <el-card style="height: 610px;">
          <quill-editor
            ref="myQuillEditor"
            v-model="currentNotification.content"
            style="height: 500px;"
            :options="editorOption"
            placeholder="请输入通知内容"
          >
          </quill-editor>
        </el-card>
        <div class="block">
          <span class="demonstration">
            选择公告过期时间
          </span>
          <el-date-picker
            v-model="currentNotification.overtime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <div class="type-radio">
          <span class="demonstration">
            选择公告类型
          </span>
          <el-radio-group v-model="currentNotification.type">
            <el-radio-button label="1">
              普通
            </el-radio-button>
            <el-radio-button label="2">
              特别
            </el-radio-button>
            <el-radio-button label="3">
              消息
            </el-radio-button>
            <el-radio-button label="4">
              紧急
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-button class="submit-button" type="primary" @click="submit()">
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>


<script>
import Pager from '@/components/ArtPager'
import { showAsynConfirm } from '@/utils/messageBox'
import {
  getAllNotification,
  addNotification,
  editNotification,
  deleteNotification,
  getNotification
} from '@/api/notification'
import {
  quillEditor
} from 'vue-quill-editor'
import { DeviceType, AppModule } from '@/store/modules/app';

export default {
  name: 'PanelNotification',
  components: {
    Pager,
    quillEditor
  },
  data() {
    return {
      content: null,
      editorOption: {},
      loading: false,
      notifications: [],
      user_name: '',
      currentNotification: {
        id: 0,
        content: '',
        title: '',
        overtime: null,
        type: null
      },
      edit: {
        row: {},
        visible: false,
        content: '',
        loading: false
      }
    }
  },
  computed: {
    isPhone() {
      return this.device === DeviceType.Mobile
    }
  },
  methods: {
    // 分页器获取方法
    getList: getAllNotification,
    submit() {
      if (
        this.currentNotification.overtime == null ||
        this.currentNotification.type == null ||
        this.currentNotification.content == '' ||
        this.currentNotification.title == ''
      ) {
        this.$message({
          type: 'warning',
          message: '公告发布失败，检查是否填写完整'
        })
      } else {
        showAsynConfirm('您确定要提交此公告？', '已取消提交', done => {
          this._submit(done)
        })
      }
    },
    async _submit(done) {
      try {
        const data = await addNotification(this.currentNotification)
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      } catch (message) {
        var error_message = ''
        if (message.indexOf('content') != -1) {
          this.error_message = '内容不能为空！'
        } else if (message.indexOf('title') != -1) {
          this.error_message = '标题不能为空！'
        } else {
          this.error_message = message
        }
        this.$message({
          type: 'warning',
          message: '公告发布失败，' + this.error_message
        })
      }
      this.changePages(1)
      done()
      this.currentNotification.content = ''
      this.currentNotification.title = ''
      this.currentNotification.overtime = ''
      this.currentNotification.type = ''
    },
    parseForm(row) {
      // 直接复制的参数
      const keys = [
        'title',
        'content',
        'overtime',
        'time',
        'type',
        'notification_id'
      ]
      const params = {}
      for (const i in keys) {
        params[keys[i]] = row[keys[i]]
      }
      return params
    },
    async getContent(d) {
      try {
        var data = await getNotification(d)
        console.log(data)
        this.edit.content = data.content
      } catch (e) {
        this.$message({
          type: 'error',
          message: '实践公告获取失败：' + e
        })
      }
    },
    handleEdit(data) {
      this.edit.loading = true;
      (this.edit.visible = true), (this.edit.row = this.parseForm(data))
      this.temp = this.parseForm(data)
      this.getContent(this.edit.row.notification_id)
      setTimeout(() => {
        this.edit.row.content = this.edit.content
        this.edit.loading = false
      }, 1000)
    },
    submitEdit() {
      if (
        this.edit.row.title == this.temp.title &&
        this.edit.row.content == this.temp.content &&
        this.edit.row.type == this.temp.type &&
        this.edit.row.overtime == this.temp.overtime
      ) {
        this.$message({
          type: 'warning',
          message: '您没有修改任何信息！'
        })
      } else if (
        this.edit.row.title == '' ||
        this.edit.row.content == '' ||
        this.edit.row.type == '' ||
        this.edit.row.overtime == ''
      ) {
        this.$message({
          type: 'warning',
          message: '修改的信息不可以为空！'
        })
      } else {
        showAsynConfirm('您确定要修改该实践公告？', '已取消修改', done => {
          this._submitEdit(done)
        })
      }
    },
    async _submitEdit(done) {
      try {
        const data = await editNotification(
          this.edit.row.notification_id,
          this.edit.row
        )
        done()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (message) {
        done()
        this.$message({
          type: 'warning',
          message: message
        })
      }
      this.changePages(1)
      this.edit.visible = false
    },
    // 删除某个文件
    handleDelete(row) {
      showAsynConfirm(
        '该操作不可撤销，确定删除该资料？',
        '删除已取消',
        done => {
          this._handleDelete(row.notification_id, done)
        }
      )
    },
    // async样式的删除请求
    async _handleDelete(id, done) {
      const delete_id = id.toString()
      try {
        const data = await deleteNotification(id)
        done()
        this.$message({
          type: 'success',
          message: '成功删除'
        })
      } catch (message) {
        done()
        this.$message({
          type: 'warning',
          message: message
        })
      }
      this.changePages(1)
    },
    onEditorUploadComplete(res) {
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    set() {
      this.$refs.richText.setContent('设置内容')
    },
    get() {
      console.log(this.$refs.richText.getContent())
    },
    changePages(i) {
      this.$refs.refresh.turn(i)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-notification {
  .editor-title, .title {
    width: 25vw;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-bottom: 10px;
    margin-left: -1.6em;
  }
  .editor-title {
    width: 20vw;
  }
  .notification-board {
    margin: 1em 0;
  }
  .editor {
    margin-top: 2em;
    .new-button {
      margin: 1em 0;
    }
    .label {
      margin: 1em 0;
    }
  }
  .quill-editor {
    margin: 1vw 0 2vw 0;
  }
  .block {
    margin-top: 1vw;
  }
  .line-new {
    padding: 1em 2em;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
.demonstration {
  margin-right: 2.4vw;
}
.type-radio {
  margin-top: 1.2vw;
  margin-bottom: 1.2vw;
}
@media screen and (max-width: 940px) {
 .panel-notification{
   .title,
   .editor {
      font-size: 13px;
    }
 }
}

@media screen and (max-width: 540px) {
  .panel-notification{
    .title,
    .editor {
      font-size: 12px;
    }
    .submit-button {
      margin-top: 10px;
    }
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 1000px) {
  .panel-dev{
    .title-line {
      font-size: 16px;
      .title {
        width: 80px;
        font-size: 16px;
        margin-left: 10px;
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
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 14px;
        }
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
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 12px;
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
  }
}
</style>
