import { addinfoApi } from "utils/api";
import { openNotification } from "utils/helpers";

const Actions = {
  setAddInfo: data => ({
    type: "ADDINFO:SET_DATA",
    payload: data
  }),
    setIsLoading: bool => ({
        type: "ADDINFO:SET_IS_LOADING",
        payload: bool
    }),
  fetchUserAddInfo: () => dispatch => {
      dispatch(Actions.setIsLoading(true));
    addinfoApi
      .getInfo()
      .then(({ data }) => {
        dispatch(Actions.setAddInfo(data));
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
  fetchUserAddInfoCreate: postData => dispatch => {
    return addinfoApi
    .addInfo(postData).then(({ data }) => {
        openNotification({
            title: "Чудово!",
            text: "Авторизація успішна.",
            type: "success"
          });
      dispatch(Actions.fetchUserAddInfo());
      return data;
    })
    .catch(({ response }) => {
      if (response.status === 403||404) {
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
