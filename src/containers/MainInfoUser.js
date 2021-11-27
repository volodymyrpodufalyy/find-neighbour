import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {MainInfoUser} from "components"
import { addinfoActions } from "redux/actions";
import {userActions} from "../redux/actions";
import { Spin } from 'antd';
const MainInfoUserContainer = ({ user,results,isLoading,fetchUserData,filterUserById}) => {

    let userId = useState()

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
        filterUserById(userId)
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
