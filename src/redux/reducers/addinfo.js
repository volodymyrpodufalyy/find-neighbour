
const initialState = {
    data: null,
    isLoading: false,
    items: [],
    results: [],
    userInfo: [{
        _id: 0,
        age: 0,
        address: "",
        sex: false,
        pets: false,
        badHabits: false,
        kindOfActivity: false,
        haveJobOrJobless: false,
        maritalStatus: false,
        phoneNumber: "",
        moreAboutUser: "",
        user: {
            _id: 0,
            confirmed: true,
            last_seen: '',
            email: '',
            fullname: '',
            password: '',
            createdAt: '',
            updatedAt: '',
            confirm_hash: '',
            __v: 0
        },
        createdAt: '',
        updatedAt: '',
        __v: 0
    }],
    totalCount: 0,
    pageSize: 9,
    isInfo: window.localStorage.info
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type, payload}) => {
    switch (type) {
        case "ADDINFO:SET_DATA":
            return {
                ...state,
                data: payload,
                isInfo: window.localStorage.info,
            };
        case "ADDINFO:SET_AUTH":
            return {
                ...state,
                isInfo: payload,
            };
        case "ADDINFO:SET_ITEMS":
            return {
                ...state,
                items: payload,
            };
        case "ADDINFO:SET_RESULTS":
            return {
                ...state,
                results: payload,
            };
        case "ADDINFO:SET_USERINFO":
            return {
                ...state,
                userInfo: payload,
            };

        case "ADDINFO:SET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: payload,
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
