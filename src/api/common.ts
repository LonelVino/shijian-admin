import request from '@/utils/request'

export const getByNetId = (id: number) =>
  request({
    url: '/common/getByNetId?net_id=' + id,
    method: 'get',
  });

export const getByUserId = (id: number) =>
  request({
    url: '/common/getById/' + id,
    method: 'get',
  });
