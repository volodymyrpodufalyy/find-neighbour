const initialState = {
    items: {
        status: '',
        file: {
          filename: "file",
          url: "",
        }
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type, payload}) => {
    switch (type) {
        case "ATTACHMENTS:SET_ITEMS":
            return {
                ...state,
                items: payload
            };
        case "ATTACHMENTS:REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(item => item.uid !== payload.uid)
            };
        case "FILE:SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    }
};
