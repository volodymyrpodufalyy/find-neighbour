import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {MainInfoUser} from "components"
import {addinfoActions} from "redux/actions";
import {userActions} from "../redux/actions";
import {Spin} from 'antd';
import {load} from "dotenv";

const MainInfoUserContainer = ({user, userInfo, isLoading, setIsLoading, fetchUserData, filterUserById}) => {


    const [userId, setUserId] = useState(null)
    const [state, setState] = useState(userInfo)
    const [loading, setLoading] = useState(false)

    const searchUserById = (userID) => {
        filterUserById(userID)
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        setLoading(true)
        if (user) {
            setUserId(user.id)
        }
        setLoading(false)

    }, [user])

    useEffect(() => {
        setLoading(true)
        if (userId) {
            searchUserById(userId)
        }
        setLoading(false)

    }, [userId])

    useEffect(() => {
        setLoading(true)
        if (userInfo.length !== 0) {
            setState(userInfo)
        }
        setLoading(false)

    }, [userInfo])


    if (loading) {
        return (
            <div className="spin-load">
                <Spin size="large" tip="Loading..."/>
            </div>
        );
    }


    return (
        <MainInfoUser state={state}/>
    )
}

export default connect(
    ({addinfo, user}) => ({
        user: user.data,
        userInfo: addinfo.userInfo,
        isLoading: addinfo.isLoading
    }),

    {...userActions, ...addinfoActions}
)(MainInfoUserContainer);
