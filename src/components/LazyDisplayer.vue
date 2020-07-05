<template>
  <div v-loading="loading">
    <div id="item-title" class="item">
      <i class="el-icon-document icon"></i>公告标题：{{ info.title }}
    </div>
    <div id="item-content word1" class="item">
      <i class="el-icon-document"></i>公告内容：{{ content }}
    </div>
    <div id="item-author" class="item">
      <i class="el-icon-info"></i>公告作者：{{ user_name }}
    </div>
    <div class="item">
      公告过期时间：{{ info.create_time }}
    </div>
    <div class="item">
      最新更新时间：{{ info.update_time }}
    </div>
  </div>
</template>

<script>
import { getByUserId } from '@/api/common'
import { getNotification } from '@/api/notification'

export default {
  props: {
    info: Object
  },
  data() {
    return {
      user_name: '',
      loading: false,
      content: ''
    }
  },
  created() {
    this.getUserName()
    this.getContent()
  },
  methods: {
    async getUserName() {
      try {
        const data = await getByUserId(this.info.author_id)
        this.user_name = data.user_name
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取发布者姓名,' + e
        })
      }
    },
    async getContent() {
      this.loading = true
      try {
        var data = await getNotification(this.info.notification_id)
        this.content = data.content
      } catch (e) {
        this.$message({
          type: 'error',
          message: '实践公告获取失败：' + e
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
#word1{
	word-wrap: break-word;
	word-break: break-all;
}
.item+.item {
  margin-top: 20px;
}
#item-title,
#item-content,
#item-reply-contentm,
#item-author {
  font-weight: bold;
  word-wrap: break-word;
	word-break: break-all;
}
#item-author {
  color: red;
}
.item .icon{
  margin-right: 2px;
}

@media screen and (max-width: 940px) {
  .item {
    font-size: 15px;
  }
}

@media screen and (max-width: 540px) {
  .item {
    font-size: 12px;
    margin: 10px 0 0 0;
  }
}
</style>
