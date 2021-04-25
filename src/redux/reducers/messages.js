  
const initialState = {
  items: [],
  isLoading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "MESSAGES:ADD_MESSAGE":
      return {
        ...state,
        items: [...state.items, payload]
      };
    case "MESSAGES:SET_ITEMS":
      return {
        ...state,
        items: payload,
        isLoading: false
      };
    case "MESSAGES:REMOVE_MESSAGE":
      return {
        ...state,
        items: state.items.filter(message => message._id !== payload)
      };
    case "MESSAGES:SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload
      };
    default:
      return state;
  }
};