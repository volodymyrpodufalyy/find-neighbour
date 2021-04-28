import {getUserProfile} from "../../pages/MyProfile/Api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    post: [
        {
            id: 0,
            username: "Bohdan Shcherba ",
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 1,
            username: 'Yulia',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "124241@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 2,
            username: 'Volodumur',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 3,
            username: 'Andrii',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 4,
            username: 'Roman',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 5,
            username: 'Roman',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },
        {
            id: 6,
            username: 'Roman',
            img: "http://ocalafarms.com/wp-content/uploads/2016/09/default-user-img.jpg",
            abouts: "OKey",
            number: "+3809532220353",
            gmail: "shcherbabohdan@gmail.com",
            kind_of_activity: "Student",
            have_pets: "Yes"
        },

    ],
    newText: '',
    profile: null,
}

const userProfile = (state = initialState, action) => {
    switch (action.type) {


        case SET_USER_PROFILE:{
            return {...state,profile: action.profile}
        }


        default:
            return state

    }

}
export default userProfile


export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile};
}



export const getUserProfileThunkCreator = (userId) =>{
    return (dispatch)=>{
        getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })

    }
}
