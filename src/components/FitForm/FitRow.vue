<template>
  <span>
    <el-row
      v-for="(cols, i) in rows"
      :key="i"
    >
      <el-col
        v-for="(mir, j) in cols"
        :key="j"
        :span="24 / columnNum"
      >
        <FormField
          v-model="form[mir.prop]"
          :mirror="mir"
        />
      </el-col>
    </el-row>
  </span>
</template>

<script>
import FormField from './FormField.vue'

function normalComp(swidth, n) {
  if (n >= 3) {
    if (swidth >= 560) {
      return 3
    } else if (swidth >= 440) {
      return 2
    } else {
      return 1
    }
  } else if (n == 2) {
    if (swidth >= 440) {
      return 2
    } else {
      return 1
    }
  } else {
    return n
  }
}

export default {
  name: 'FitRow',
  components: {
    FormField
  },
  props: {
    mirrors: Array,
    form: Object,
    colNumComputer: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      rows: [],
      colNumComp: null
    }
  },
  computed: {
    // 当前应该显示的列数
    columnNum() {
      const swidth = this.$store.getters.screenWidth
      const n = this.mirrors.length
      if (this.colNumComp) {
        return this.colNumComp(swidth, n)
      } else {
        return 0 // for watch
      }
    },
    // 父组件value
    fieldValue() {
      return this.value
    }
  },
  watch: {
    // 自动重置列数
    columnNum(n) {
      this.rearrange(n)
    }
  },
  beforeMount() {
    if (this.colNumComputer) {
      this.colNumComp = this.colNumComputer
    } else {
      this.colNumComp = normalComp
    }
  },
  mounted() {
    // 初始化一次
    this.rearrange(this.columnNum)
  },
  methods: {
    // 重置列数
    rearrange(col) {
      const n = this.mirrors.length
      const rows = []
      for (let i = 0; i < n; i += col) {
        let end = i + col
        end = end < n ? end : n
        const cols = this.mirrors.slice(i, end)
        rows.push(cols)
      }
      this.rows = rows
    },
    // 传递输入事件
    send(payload) {
      this.$emit('input', payload)
    }
  }
}
</script>
