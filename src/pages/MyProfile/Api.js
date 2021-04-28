import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export const getUserProfile = (userId) =>{
    return instance.get(`profile/`+ userId)
}





