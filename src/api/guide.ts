import request from "@/utils/request";

export const getAllGuide = (form: any) =>
  request({
    url: "/guide/getAll",
    method: "get",
    params: form,
  });

export const getOneGuide = (id: number) =>
  request({
    url: "/guide/" + id,
    method: "get",
  });

export const deleteOneGuide = (id: number) =>
  request({
    url: "/admin/guide" + id,
    method: "delete",
  });

export const addOneGuide = (form: any) =>
  request({
    url: "/admin/guide",
    method: "post",
    data: form,
  });
