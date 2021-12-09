import {addinfoApi} from "utils/api";
import {openNotification} from "utils/helpers";

const Actions = {
    setAddInfo: data => ({
        type: "ADDINFO:SET_DATA",
        payload: data
    }),
    setAuthInfo: bool => ({
        type: "ADDINFO:SET_AUTH",
        payload: bool
    }),
    setAddInfos: items => ({
        type: "ADDINFO:SET_ITEMS",
        payload: items
    }),
    setAddInfosResults: results => ({
        type: "ADDINFO:SET_RESULTS",
        payload: results
    }),
    setAddUserInfo: userInfo => ({
        type: "ADDINFO:SET_USERINFO",
        payload: userInfo
    }),
    setAddInfosCount: count => ({
        type: "ADDINFO:SET_TOTAL_COUNT",
        payload: count
    }),

    setIsLoading: bool => ({
        type: "ADDINFO:SET_IS_LOADING",
        payload: bool
    }),
    fetchUserAddInfo: () => dispatch => {
        dispatch(Actions.setIsLoading(true));
        addinfoApi
            .getInfo()
            .then(({data}) => {
                dispatch(Actions.setAddInfo(data));
                dispatch(Actions.setAuthInfo(true));
                dispatch(Actions.setIsLoading(false));
            })
            .catch(err => {
                dispatch(Actions.setIsLoading(false));
                if (err.response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка авторизації",
                        text: "Невірні дані",
                        type: "error"
                    });
                }
            });
    },
    fetchUserAddInfos: (page, limit) => dispatch => {
        dispatch(Actions.setIsLoading(true));
        addinfoApi
            .getAll(page, limit)
            .then(({data}) => {
                dispatch(Actions.setAddInfos(data));
                dispatch(Actions.setAddInfosResults(data.results));
                dispatch(Actions.setAddInfosCount(data.totalCount));
                dispatch(Actions.setIsLoading(false));
            })
            .catch(err => {
                dispatch(Actions.setIsLoading(false));
                if (err.response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка авторизації",
                        text: "Невірні дані",
                        type: "error"
                    });
                }
            });
    },
    filterAddInfos: (startAge, endAge,address, sex, pets, badHabits) => dispatch => {
        dispatch(Actions.setIsLoading(true));
        addinfoApi
            .filterUsers(startAge, endAge,address,  sex, pets, badHabits)
            .then(({data}) => {
                dispatch(Actions.setAddInfosResults(data));
                dispatch(Actions.setIsLoading(false));
            })
            .catch(err => {
                dispatch(Actions.setIsLoading(false));
                if (err.response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка",
                        text: "",
                        type: "error"
                    });
                }
            });
    },
    filterUserById: (userId) => dispatch => {
        dispatch(Actions.setIsLoading(true));

        addinfoApi
            .getUserById(userId)
            .then(({data}) => {
                dispatch(Actions.setAddUserInfo(data));
                dispatch(Actions.setIsLoading(false));
            })
            .catch(err => {
                dispatch(Actions.setIsLoading(false));
                if (err.response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка user by id",
                        text: "",
                        type: "error"
                    });
                }
            });
    },

    updateUserAddInfo: (postData,id) => dispatch =>{
        return addinfoApi
            .updateInfo(postData,id).then(({data}) => {
                console.log(postData,data)
                dispatch(Actions.fetchUserAddInfo());
                return data;

            })
            .catch(({response}) => {
                if (response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка ",
                        text: "Заповніть всі поля",
                        type: "error"
                    });
                }
            });
    },


    fetchUserAddInfoCreate: postData => dispatch => {
        return addinfoApi
            .addInfo(postData).then((data) => {
                openNotification({
                    title: "Авторизація успішна",
                    text: "Посилання з підтвердженням акаунту надіслано на вашу пошту  ",
                    type: "success"
                });
                dispatch(Actions.fetchUserAddInfo());
                dispatch(Actions.setAuthInfo(true));
                return data;
            })
            .catch(({response}) => {
                if (response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка авторизації",
                        text: "Заповніть всі поля",
                        type: "error"
                    });
                }
            });
    }
};

export default Actions;
