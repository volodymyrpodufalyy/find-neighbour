import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {MainInfoUser} from "components"
import { addinfoActions } from "redux/actions";
import {userActions} from "../redux/actions";
import { Spin } from 'antd';
const MainInfoUserContainer = ({ user,results,isLoading,fetchUserData,filterUserById,fetchUserAddInfoCreate}) => {

    let [userId,setUserId] = useState()

    try {
        console.log(user.id)
        userId = user.id
    }catch (e){
        console.log(e)
    }

    const getMe = ()=>{
        fetchUserData()
    }

    useEffect(() => {
        getMe()
    }, [])


    const searchUserById = () =>{
        filterUserById('617e9cb93981bf176cc9d923')
        //fetchUserAddInfoCreate([])

    }

    useEffect(()=>{
        searchUserById()
    },[userId])



    console.log(results)



    if (isLoading) {
        return (
            <div className="spin-load">
                <Spin size="large" tip="Завантаження..."/>
            </div>
        );
    }


    return (
        <MainInfoUser/>
    )
}

export default connect(
    ({ addinfo,user }) => ({
        user: user.data,
        results: addinfo.results,
        isLoading: addinfo.isLoading
    }),

    {...userActions,...addinfoActions}
)(MainInfoUserContainer);
