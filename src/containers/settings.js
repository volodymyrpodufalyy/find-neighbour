import React, {useEffect, useState} from "react";
import {Settings} from "components"
import {useSelector, useDispatch} from "react-redux";
import {addinfoActions, userActions,attachmentsActions} from "redux/actions";
import {Spin} from "antd";

const SettingsContainer = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(useSelector(state => state.addinfo.isLoading))
    const [file, setFile] = useState()
    const [disableUpload, setDisableUpload] = useState(true)

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

    const uploadOnChange = (e)=>{
        if (e.target.files[0]) {
            setDisableUpload(false)
            setFile(e.target.files[0])
        }
    }

    const uploadBtn = ()=>{
        setDisableUpload(true)
        dispatch(attachmentsActions.uploadFile(file))
    }

    let fileInfo = useSelector(state => state.attachments.items)


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
            'avatarUrl': fileInfo.file.url,
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
        <Settings data={data[0]} updateAddress={updateAddress}
                  saveChanges={saveChanges}
                  uploadOnChange={uploadOnChange}
                  uploadBtn={uploadBtn}
                  disableUpload={disableUpload}
                  fileUrl={fileInfo.file.url}
        />
    )
}


export default (SettingsContainer)
