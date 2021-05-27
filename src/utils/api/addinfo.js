import { axios } from "core";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getInfo: () => axios.get("/addinfo"),
    addInfo: postData => axios.post("/user/addinfo", postData),
    getAll: (page, limit) => axios.get(`/addinfos?page=${page}&limit=${limit}`),
    filterUsers: (startAge, endAge, sex, pets, badHabits) => 
    axios.get(`/addinfos/filterUsers?startAge=${startAge}&endAge=${endAge}&sex=${sex}&pets=${pets}&badHabits=${badHabits}`),
};
