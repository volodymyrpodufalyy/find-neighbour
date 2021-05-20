import { axios } from "core";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getInfo: () => axios.get("/addinfo"),
    addInfo: postData => axios.post("/user/addinfo", postData),
    getAll: (page, limit) => axios.get(`/addinfos?page=${page}&limit=${limit}`)
};
