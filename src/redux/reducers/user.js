const initialState = {
  data: null,
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  isLoading: false,

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER:SET_DATA":
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: window.localStorage.token
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: payload
      };
    case "USER:SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload
      };
    default:
      return state;
  }
};
