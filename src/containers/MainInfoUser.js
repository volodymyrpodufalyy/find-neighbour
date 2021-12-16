import React, {useState, useEffect} from "react";
import {connect, useSelector} from "react-redux";
import {MainInfoUser} from "components"
import {addinfoActions} from "redux/actions";
import {userActions} from "../redux/actions";
import {Spin} from 'antd';

const MainInfoUserContainer = ({user, userInfo, fetchUserData, filterUserById}) => {


    const [userId, setUserId] = useState(null)
    const [state, setState] = useState(userInfo)
    let isLoading = useSelector(state => state.addinfo.isLoading)

    const searchUserById = (userID) => {
        filterUserById(userID)
    }

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }

    }, [user])

    useEffect(() => {
        if (userId) {
            searchUserById(userId)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    useEffect(() => {
        if (userInfo.length !== 0) {
            setState(userInfo)
        }

    }, [userInfo])


    if (isLoading || userInfo.age === 0) {
        return (
            <div>
                <div className="spin-load">
                    <Spin size="large" tip="Loading..."/>
                </div>
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
