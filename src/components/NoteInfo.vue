<template>
  <div>
    <div class="item">回复状态：
      <el-tag type="warning" v-if="info.status == 0">未回复</el-tag>
      <el-tag v-if="info.status==1">已回复</el-tag>
    </div>
    <div class="item" id="item-title"><i class="el-icon-document icon"></i>留言标题：{{info.title}}</div>
    <div class="item" id="item-content"><i class="el-icon-document"></i>留言内容：{{info.content}}</div>
    <div class="item" id="item-author"><i class="el-icon-info"></i>留言作者：{{info.user_name}}</div>
    <div class="item">留言时间：{{info.create_time}}</div>
    <div v-if="info.status==1" class="item"  id="item-reply-content">回复内容：{{info.reply}}</div>
    <div v-if="info.status==1" class="item">回复时间：{{info.reply_time}}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
}
</script>

<style lang="scss" scoped>
.item+.item {
  margin-top: 20px;
}
#item-title,
#item-content,
#item-reply-contentm,
#item-author {
  font-weight: bold;
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
