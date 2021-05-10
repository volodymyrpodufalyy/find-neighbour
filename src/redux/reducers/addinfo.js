const initialState = {
    data: null,
    isLoading: false
};

  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADDINFO:SET_DATA":
        return {
          ...state,
          data: payload,
        };

      case "ADDINFO:SET_IS_LOADING":
        return {
          ...state,
          isLoading: payload
        };
      default:
        return state;
    }
  };
