import request from "@/utils/request";

export const postNote = (title: string, content: string) =>
  request({
    url: "/note",
    method: "post",
    data: {
      title,
      content,
    },
  });

export const getAllNote = (form: any) =>
  request({
    url: "/note/getAll",
    method: "get",
    params: form,
  });

export const putNote = (id: number, form: any) =>
  request({
    url: "/note/" + id,
    method: "put",
    data: form,
  });

export const deleteNote = (id: number) =>
  request({
    url: "/note/" + id,
    method: "delete",
  });

export const replyNote = (id: number, reply: any) =>
  request({
    url: "/admin/note/" + id,
    method: "put",
    data: {
      reply,
    },
  });
