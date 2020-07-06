<template>
  <el-form ref="form" :model="form" :inline="true" :rules="rules">
    <FitRow :mirrors="mirrorList" :form="form" />
    <slot></slot>
  </el-form>
</template>

<script>
import { initMirror } from "@/utils/form";
import FitRow from "./FitRow.vue";

export default {
  name: "FitForm",
  components: {
    FitRow
  },
  props: {
    mirrors: Array
  },
  data() {
    return {
      mirrorList: [],
      rules: {},
      form: {}
    };
  },
  created() {
    // 预处理所有的mirror
    for (const i in this.mirrors) {
      const mirror = initMirror(this.mirrors[i]);
      this.mirrorList.push(mirror);
      this.rules[mirror.prop] = mirror.rules;
    }
  },
  methods: {
    // 间接验证
    validate(arg) {
      this.$refs.form.validate(arg);
    },
    // 获取数据
    getData() {
      return this.form;
    },
    // 设置数据
    setData(data) {
      this.form = Object.assign({}, data);
    }
  }
};
</script>
