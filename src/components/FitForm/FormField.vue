<template>
  <el-form-item class="form-field" :label="mirror.label" :prop="mirror.prop">
    <!-- 第一种：输入框 -->
    <el-input
      v-if="mirror.type == 'input'"
      :placeholder="mirror.placeholder"
      :value="fieldValue"
      clearable
      @input="send"
    ></el-input>
    <!-- 第二种：选择框 -->
    <el-select
      v-else-if="mirror.type == 'select'"
      :placeholder="mirror.placeholder"
      :value="fieldValue"
      clearable
      @input="send"
    >
      <el-option
        v-for="item in mirror.options"
        :key="item.key"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!-- 第三种：级联选择器 -->
    <el-cascader
      v-else-if="mirror.type == 'cascader'"
      :placeholder="mirror.placeholder"
      :value="fieldValue"
      expand-trigger="hover"
      :options="mirror.options"
      :props="mirror.props"
      @input="send"
    ></el-cascader>
    <!-- 第四种：文本域 -->
    <el-input
      v-else-if="mirror.type == 'textarea'"
      type="textarea"
      :rows="mirror.rows"
      :placeholder="mirror.placeholder"
      :value="fieldValue"
      @input="send"
    ></el-input>
    <!-- 第五种；时间段选择 -->
    <el-date-picker
      v-else-if="mirror.type == 'daterange'"
      :value="fieldValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      @input="send"
    ></el-date-picker>
    <div v-else>字段错误</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FormField",
  props: ["mirror", "value"],
  computed: {
    fieldValue() {
      return this.value;
    }
  },
  methods: {
    send(payload) {
      this.$emit("input", payload);
    }
  }
};
</script>

<style lang="scss">
.form-field {
  overflow: hidden;
  .el-form-item__error {
    position: inherit;
  }
}
.el-form--inline .form-field .el-form-item__label {
  width: 80px;
}
</style>

<style lang="scss" scoped>
.form-field {
  display: flex;
  flex-direction: row;
}
</style>

