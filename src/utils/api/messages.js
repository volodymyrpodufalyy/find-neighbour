import { axios } from "core";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllByDialogId: id => axios.get("/messages?dialog=" + id),
  removeById: id => axios.delete("/messages?id=" + id),
  send: (text, dialogId, attachments) =>
    axios.post("/messages", {
      text: text,
      dialog_id: dialogId,
      attachments
    })
};

