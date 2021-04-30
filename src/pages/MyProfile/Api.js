import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3003/'
})


export const getUserProfile = (userId) =>{
    return instance.get(`user/`+ userId)
}





