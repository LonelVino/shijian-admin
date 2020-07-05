import request from '@/utils/request'

export const postProfileInfo = (ruleForm: any) => { 
  return request({
    url: '/user/profile',
    method: 'post',
    data: {
      form: ruleForm
    }
  })
}

// 获取个人详细信息
export const getProfileInfo = () => {
  return request({
    url: '/user/profile',
    method: 'get'
  })
}

// 修改个人详细信息
export const putProfileInfo = (ruleForm: any) => {
  return request({
    url: '/user/profile',
    method: 'put',
    data: ruleForm // 换名字，函数参数叫什么无所谓，但是‘form’要看后端需要的变量叫什么
  })
}

// 删除个人详细信息
export const deleteProfileInfo = () => {
  return request({
    url: '/user/profile',
    method: 'delete'
  })
}

// 获取user信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
