const typeToModeMap = {
  'input': '输入',
  'select': '选择',
  'cascader': '选择',
  'textarea': '填写',
  'daterange': '选择'
}

const typeToTriggerMap = {
  'input': 'blur',
  'select': 'change',
  'cascader': 'change',
  'textarea': 'blur',
  'daterange': 'change'
}

function typeToMode(type) {
  let mode = typeToModeMap[type]
  if (mode === undefined) {
    mode = '填写'
  }
  return mode
}

export function initMirror(mirror) {
  // 先复制一份mirror防止影响原有数据
  const m = Object.assign({}, mirror)
  // 初始默认消息和placeholder
  const mode = typeToMode(m.type)
  const label = m.label
  const message = `请${mode}${label}`
  // 没有设置placeholder则自动添加
  if (m.placeholder === undefined || m.placeholder === '') {
    m.placeholder = message
  }
  // 自动添加第一个rule
  let rules = []
  const trigger = typeToTriggerMap[m.type]
  if (trigger && !m.disableRule) {
    rules.push({
      required: true,
      message,
      trigger
    })
  }
  // 如果有其他rules，则合并
  if (m.moreRules) {
    rules = rules.concat(m.moreRules)
    delete m.moreRules
  }
  // 写入对象
  m.rules = rules
  return m
}
