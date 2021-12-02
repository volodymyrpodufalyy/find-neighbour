import React, {useEffect, useState} from "react";
import {Settings} from "components"
import {useSelector, useDispatch} from "react-redux";
import {addinfoActions, userActions} from "redux/actions";
import {Spin} from "antd";

const SettingsContainer = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(useSelector(state => state.addinfo.isLoading))

    let id = useSelector(state => state.user.data.id)

    useEffect(() => {
        dispatch(userActions.fetchUserData());
    }, [dispatch]);


    useEffect(() => {
        if (id !== 0) {
            dispatch(addinfoActions.filterUserById(id));
        }
    }, [dispatch, id]);

    let data = useSelector(state => state.addinfo.userInfo)


    const updateAddress = (address) => {
        dispatch(addinfoActions.updateUserAddInfo(
            {'adress': address}, data[0].id))
    }

    const saveChanges = (pets,badHabits,kindOfActivity,job,marital,aboutUser) =>{
        dispatch(addinfoActions.updateUserAddInfo({
            'pets':pets,
            'badHabits':badHabits,
            'kindOfActivity':kindOfActivity,
            'haveJobOrJobless':job,
            'maritalStatus':marital,
            'moreAboutUser':aboutUser,
        }, data[0].id))

    }

    if (isLoading || id === 0) {
        return (
            <div className="spin-load">
                <Spin size="large" tip="Завантаження..."/>
            </div>
        );
    }


    return (
        <Settings data={data[0]} updateAddress={updateAddress} saveChanges={saveChanges}/>
    )
}


export default (SettingsContainer)
