import request from '@/utils/request';

export const getCurrentUserInfo = () => { 
  return request({
    url: '/cas',
    method: 'get',
  })
}

export const getRedirectUrl = () => { 
  return request({
    url: '/cas',
    method: 'post',
  })
}

export const runCallback = (guid) => { 
  return request({
    url: '/cas/callback',
    method: 'post',
    data: {
      guid: guid
    }
  })
}
