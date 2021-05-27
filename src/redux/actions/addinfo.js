import { addinfoApi } from "utils/api";
import { openNotification } from "utils/helpers";

const Actions = {
  setAddInfo: data => ({
    type: "ADDINFO:SET_DATA",
    payload: data
  }),
  setAddInfos: items => ({
    type: "ADDINFO:SET_ITEMS",
    payload: items
  }),
  setAddInfosResults: results => ({
    type: "ADDINFO:SET_RESULTS",
    payload: results
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
      .then(({ data }) => {
        dispatch(Actions.setAddInfo(data));
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
      .then(({ data }) => {
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
  filterAddInfos: (startAge, endAge, sex, pets, badHabits) => dispatch => {
      dispatch(Actions.setIsLoading(true));
    addinfoApi
      .filterUsers(startAge, endAge, sex, pets, badHabits)
      .then(({ data }) => {
        dispatch(Actions.setAddInfosResults(data));
        dispatch(Actions.setIsLoading(false));
        console.log(data);
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
