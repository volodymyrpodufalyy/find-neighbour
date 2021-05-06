const initialState = {
    data: null,
};
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADDINFO:SET_DATA":
        return {
          ...state,
          data: payload,
        };
      default:
        return state;
    }
  };