import Vue from 'vue'

/**
 * 显示一个提示确认是否继续执行，确定后对话框立刻关闭
 * @param {string} tips 对话框提示
 * @param {string} cancelMsg 取消时显示的消息
 * @param {function} confirmCallback 确认时执行的回调
 */
export function showConfirm(tips, cancelMsg, confirmCallback) {
  Vue.prototype.$confirm(tips, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    confirmCallback()
  }).catch(() => {
    Vue.prototype.$message({
      type: 'info',
      message: cancelMsg
    })
  })
}

/**
 * 显示一个提示确认是否继续执行，确定后对话框处于加载状态，直到调用回调函数中的第一个参数为止。
 * 用法示例：
 * showAsynConfirm('这是对话框内容', '你取消了', (close) => {
 *   this.get('xxx').then((data) => {
 *     this.mydata = data;
 *     close(); // 调用close来关闭弹窗，close函数来自回调函数的第一个参数
 *   })
 * })
 * @param {string} tips 对话框提示
 * @param {string} cancelMsg 取消时显示的消息
 * @param {function} confirmCallback 确认时执行的回调
 */
export function showAsynConfirm(tips, cancelMsg, confirmCallback) {
  // 关闭弹框的回调
  // var close;
  Vue.prototype.$confirm(tips, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action == 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        confirmCallback(() => {
          instance.confirmButtonLoading = false
          done()
        })
      }
      if (action == 'cancle') {
        instance.confirmButtonLoading = false
      } else {
        done()
        instance.confirmButtonText = '确定'
      }
      instance.confirmButtonLoading = false
    }
  }).then(() => {
    // 什么都不用做，在beforeClose中已经执行了回调
  }).catch(() => {
    Vue.prototype.$message({
      type: 'info',
      message: cancelMsg
    })
  })
}
