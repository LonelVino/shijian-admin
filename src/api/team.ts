// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from '@/utils/request';

//  通过id获取队伍信息（个人）
export function getOneTeamInfo(id) {
  return request({
    url: '/team/' + id,
    method: 'get'
  })
}

//  通过队名名称获取队伍信息（个人）
export function getOneTeamByName(data) {
  return request({
    url: '/admin/getTeamByName',
    method: 'get',
    params: data
  })
}

// 将队伍信息导出为Excel
export function outExcel(id) {
  return request({
    url: '/outExcel/' + id,
    method: 'get'
  })
}

// 撤回队伍
export function withDraw(id) {
  return request({
    url: '/withdrawTeam/' + id,
    method: 'put'
  })
}

// 队伍出发
export function setOut(id) {
  return request({
    url: '/outTeam/' + id,
    method: 'put'
  })
}

// 队伍返回
export function Return(id) {
  return request({
    url: '/returnTeam/' + id,
    method: 'put'
  })
}


// 修改队伍信息
export function putTeamInfo(form) {
  return request({
    url: '/team',
    method: 'put',
    data: form
  })
}

// 删除队伍信息(退出)
export function deleteTeamInfo(id) {
  return request({
    url: '/team/' + id,
    method: 'delete'
  })
}

//  解散队伍（队长）
export function dismissTeam(id) {
  return request({
    url: '/dismissTeam/' + id,
    method: 'delete'
  })
}

//  获取队伍队友信息
export function getTeammateInfo(id) {
  return request({
    url: '/getTeammateInfo/' + id,
    method: 'get'
  })
}

//  获取队伍信息（管理员)
export function getAdminTeams(form) {
  return request({
    url: '/admin/teams',
    method: 'get',
    params: form
  })
}

//  通过id获取队伍信息（管理员)
export function getOneAdminTeam(id) {
  return request({
    url: '/admin/team/' + id,
    method: 'get'
  })
}

//  初步审核队伍资格（管理员)
export function auditTeam(id, data) {
  return request({
    url: 'admin/auditTeam/' + id,
    method: 'put',
    data: {
      isPass: data
    }
  })
}

//  审核队伍是否通过（管理员)
export function teamIsPass(id, data) {
  return request({
    url: '/admin/teamIsPass/' + id,
    method: 'put',
    data: {
      isPass: data
    }
  })
}

//  队伍建议（管理员）
export function suggestion(id, data) {
  return request({
    url: 'admin/teamSuggestion/' + id,
    method: 'put',
    data: {
      suggestion: data
    }
  })
}

// 改动老师
export function changeTeacherName(id, data) {
  return request({
    url: 'changeTeacher/' + id,
    method: 'put',
    data: {
      teacher_name: data
    }
  })
}

// 推荐至校级答辩（管理员）
export function toSchoolLevel(id) {
  return request({
    url: 'admin/toSchoolLevel/' + id,
    method: 'put'
  })
}

// 取消推荐至校级答辩（管理员）
export function cancelToSchool(id) {
  return request({
    url: 'admin/cancelToSchool/' + id,
    method: 'put'
  })
}
