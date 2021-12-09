const initialState = {
  items: [],

  fileItem: {
    status: '',
    file: {
      filename: "file",
      url: "",
    }
  },
  isLoading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ATTACHMENTS:SET_ITEMS":
      return {
        ...state,
        items: payload,
      };
    case "ATTACHMENTS:SET_ITEMS_FILE":
      return {
        ...state,
        fileItem: payload,
      };
    case "ATTACHMENTS:REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.uid !== payload.uid),
      };
    case "ATTACHMENTS:SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload
      };
    default:
      return state;
  }
};
