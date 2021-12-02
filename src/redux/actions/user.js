import {openNotification} from "utils/helpers";
import {userApi} from "utils/api";

const Actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    setIsLoading: bool => ({
        type: "USER:SET_IS_LOADING",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        dispatch(Actions.setIsLoading(true));

        userApi
            .getMe()
            .then(({data}) => {

                dispatch(Actions.setUserData(data));
                dispatch(Actions.setIsLoading(false));


            })
            .catch(err => {
                dispatch(Actions.setIsLoading(false));

                if (err.response.status === 403) {
                    delete window.localStorage.token;
                    dispatch(Actions.setIsAuth(false));
                }
            });
    },
    fetchUserLogin: postData => dispatch => {
        return userApi
            .signIn(postData)
            .then(({data}) => {
                const {token} = data;
                openNotification({
                    title: "Чудово!",
                    text: "Авторизація успішна.",
                    type: "success"
                });
                window.axios.defaults.headers.common["token"] = token;
                window.localStorage["token"] = token;
                dispatch(Actions.fetchUserData());
                dispatch(Actions.setIsAuth(true));
                return data;
            })
            .catch(({response}) => {
                if (response.status === 403 || 404) {
                    openNotification({
                        title: "Помилка авторизації",
                        text: "Невірний логін або пароль",
                        type: "error"
                    });
                }
            });
    },
    fetchUserLogOut: () => dispatch => {
        dispatch(Actions.setIsAuth(false));
        delete window.localStorage.token;
    },
    fetchUserRegister: postData => dispatch => {
        return userApi.signUp(postData).then(({data}) => {
            const {token} = data;
            window.axios.defaults.headers.common["token"] = token;
            window.localStorage["token"] = token;
            dispatch(Actions.fetchUserData());
            dispatch(Actions.setIsAuth(true));
            return data;
        });
    },
};

export default Actions;
