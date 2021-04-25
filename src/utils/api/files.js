import { axios } from "core";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  upload: file => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
};


