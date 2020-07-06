<template>
  <div class="panel-note panel-dev note-all">
    <div class="board">
      <p class="title">所有留言</p>
      <pager ref="refresh" :page-size="24" :request-func="getList" :error-msg="'无法获取'">
        <el-table
          v-loading="loading"
          slot-scope="props"
          border
          :data="props.list"
          class="note-board"
          style="width: 100%"
        >
          <el-table-column label="内容" width="60" type="expand">
            <template slot-scope="props">
              <NoteInfo :info="props.row" />
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1">已回复</el-tag>
              <el-tag v-if="scope.row.status == 0" type="warning">未回复</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑留言" placement="top">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  class="button-lists-button"
                  type="primary"
                  @click="handleEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="回复留言" placement="top">
                <el-button
                  v-if="scope.row.status == 0"
                  size="mini"
                  icon="el-icon-message"
                  circle
                  class="button-lists-button"
                  type="success"
                  @click="handleReply(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看回复" placement="top">
                <el-button
                  v-if="scope.row.status == 1"
                  size="mini"
                  type="info"
                  icon="el-icon-view"
                  circle
                  class="button-lists-button"
                  @click="handleReply(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除留言" placement="top">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  class="button-lists-button"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pager>
    </div>
    <el-dialog v-dialogDrag title="回复留言" :visible.sync="dialogReplyVisible" :fullscreen="isPhone">
      <div class="dialog-details">
        <p v-if="reply.row.status == 1" class="warn">
          <b>当前操作将覆盖上次的回复</b>
        </p>
        <p>留言标题：{{ reply.row.title }}</p>
        <p>留言学生：{{ reply.row.user_name }}</p>
        <p>留言内容：{{ reply.row.content }}</p>
        <p>留言时间：{{ reply.row.create_time }}</p>
        <p v-if="reply.row.status == 1" class="reply">上次回复：{{ reply.row.reply }}</p>
        <p v-if="reply.row.status == 1" class="reply">回复时间：{{ reply.row.reply_time }}</p>
      </div>
      <el-input
        v-if="reply.row.status == 0"
        v-model="reply.content"
        type="textarea"
        class="edit-content"
        :rows="4"
        placeholder="请输入针对该留言的回复"
      ></el-input>
      <el-input
        v-else
        v-model="reply.content"
        type="textarea"
        class="edit-content"
        :rows="4"
        placeholder="请输入修改后的回复"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReplyVisible = false">取 消</el-button>
        <el-button
          v-if="reply.row.status == 0"
          type="primary"
          :loading="reply.loading"
          @click="submitReply()"
        >确 定</el-button>
        <el-button v-else type="primary" :loading="reply.loading" @click="submitReply()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="编辑留言"
      :visible.sync="edit.visible"
      :fullscreen="isPhone"
      class="note-edit-dialog"
    >
      <div class="note-edit-content">
        <el-input v-model="edit.row.title" class="edit-title" placeholder="请填写新的标题"></el-input>
        <el-input
          v-model="edit.row.content"
          type="textarea"
          class="edit-content"
          :rows="4"
          placeholder="请填写新的内容"
        ></el-input>
        <el-button type="primary" @click="submitEdit()">提交</el-button>
        <el-button @click="edit.visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pager from '@/components/ArtPager'
import { showAsynConfirm } from '@/utils/messageBox'
import { getByUserId } from '@/api/common'
import { getAllNote, replyNote, putNote, deleteNote } from '@/api/note'
import NoteInfo from '@/components/NoteInfo.vue'
import { DeviceType, AppModule } from '@/store/modules/app'

export default {
  name: 'Panelnote',
  components: {
    Pager,
    NoteInfo
  },
  data() {
    return {
      loading: false,
      notes: [],
      edit: {
        // 修改留言
        row: {},
        visible: false
      },
      reply: {
        // 回复留言
        row: {},
        note_id: '',
        content: '',
        user_name: ''
      },
      dialogReplyVisible: false,
      temp: {}
    }
  },
  computed: {
    isPhone() {
      return this.device === DeviceType.Mobile
    }
  },
  methods: {
    // 给pager方法
    getList: getAllNote,
    async getUserName(author_id) {
      try {
        const data = await getByUserId(author_id)
        return data.user_name
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取姓名,' + e
        })
      }
    },
    handleReply(row) {
      // 构造回复的数据体
      this.dialogReplyVisible = true
      this.reply.note_id = row.note_id
      ;(this.reply.row = row),
        (this.reply.user_name = this.getUserName(row.author_id))
    },
    submitReply() {
      // 提交回复
      if (this.reply.content == '') {
        this.$message({
          type: 'warning',
          message: '不可以为空！'
        })
      } else {
        showAsynConfirm('确定回复？', '已取消回复', done => {
          this._submitReply(done)
        })
      }
    },
    async _submitReply(done) {
      try {
        console.log(this.reply.note_id, this.reply.content)
        const data = await replyNote(this.reply.note_id, this.reply.content)
        this.dialogReplyVisible = false
        this.reply.content = ''
        this.$message({
          type: 'success',
          message: this.reply.row.status == 0 ? '回复成功' : '回复修改成功'
        })
        done()
        this.changePages(1)
      } catch (message) {
        done()
        this.$message({
          type: 'warning',
          message: message
        })
      }
    },
    parseForm(row) {
      // 直接复制的参数
      const keys = ['title', 'content', 'note_id']
      const params = {}
      for (const i in keys) {
        params[keys[i]] = row[keys[i]]
      }
      return params
    },
    handleEdit(data) {
      // 修改留言
      this.edit.visible = true
      this.edit.row = this.parseForm(data)
      this.temp = this.parseForm(data)
    },
    submitEdit() {
      // 提交留言的修改
      if (
        this.edit.row.title == this.temp.title &&
        this.edit.row.content == this.temp.content
      ) {
        this.$message({
          type: 'warning',
          message: '您没有修改任何信息！'
        })
      } else if (this.edit.row.title == '' || this.edit.row.content == '') {
        this.$message({
          type: 'warning',
          message: '修改的信息不可以为空！'
        })
      } else {
        showAsynConfirm('您确定要修改该留言？', '已取消修改', done => {
          this._submitEdit(done)
        })
      }
    },
    async _submitEdit(done) {
      try {
        const data = await putNote(this.edit.row.note_id, this.edit.row)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (message) {
        this.$message.warning(message)
      }
      this.changePages(1)
      done()
      this.edit.visible = false
      this.edit.row.title = ''
      this.edit.row.content = ''
    },
    // 删除某个文件
    handleDelete(row) {
      showAsynConfirm('该操作不可撤销，确定删除该留言', '删除已取消', done => {
        this._handleDelete(row.note_id, done)
      })
    },
    // async样式的删除请求
    async _handleDelete(id, done) {
      const delete_id = id.toString()
      try {
        const data = await deleteNote(id)
        this.$message({
          type: 'success',
          message: '成功删除'
        })
        done()
      } catch (message) {
        done()
        this.$message({
          type: 'error',
          message: '操作失败'
        })
      }
      this.changePages(1)
    },
    changePages(i) {
      this.$refs.refresh.turn(i)
    }
  }
}
</script>

<style lang="scss">
.edit-content {
  textarea {
    resize: none;
  }
}

@media screen and (max-width: 940px) {
  .note-all {
    .el-table .cell {
      font-size: 15px;
    }
    .el-table th,
    .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 540px) {
  .note-all {
    .el-table .cell {
      font-size: 12px;
    }
    .el-table th,
    .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}
</style>

<style lang="scss" scoped>
.panel-note {
  .title {
    width: 15vw;
    font-family: 'Microsoft YaHei';
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-bottom: 15px;
    margin-left: -1.6em;
  }
  .note-board {
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
  .button-lists-button {
    margin: 0 0.5em 0 1em;
  }
  .container {
    margin: 1em 0;
  }
  .line-new {
    padding: 1em 2em;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

.dialog-details {
  margin-bottom: 1.5em;
  .warn {
    color: rgb(247, 81, 81);
    font-size: 1.2em;
  }
  .reply {
    color: rgb(247, 81, 81);
  }
  p {
    margin: 0.5em 0;
    font-size: 1.1em;
    text-align: left;
  }
}
.note-edit-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.edit-title,
.edit-content {
  margin-bottom: 10px;
}

.demonstration {
  margin-right: 2.4vw;
}
.type-radio {
  margin-top: 1.2vw;
  margin-bottom: 1.2vw;
}

@media screen and (max-width: 940px) {
  .note-all {
    .title {
      font-size: 13px;
    }
    .line,
    .info {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 540px) {
  .note-all {
    .title {
      font-size: 12px;
    }
    .line,
    .info {
      font-size: 12px;
    }
  }
}
</style>
