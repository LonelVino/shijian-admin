import request from '@/utils/request';

export const getAllNotification = () =>
  request({
    url: '/notification/getAll',
    method: 'get'
  });

export const getNotification = (id: number) =>
  request({
    url: '/notification/' + id,
    method: 'get',
  });

export const deleteNotification = (id: number) =>
  request({
    url: '/admin/notification/' + id,
    method: 'delete',
  });

export const addNotification = (form: any) =>
  request({
    url: '/admin/notification',
    method: 'post',
    data: form,
  });

export const editNotification = (id: number, form: any) =>
  request({
    url: '/admin/notification/' + id,
    method: 'put',
    data: form,
  });
