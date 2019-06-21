const initialState = {
  userID: "",
  merchantID: {},
  merchant: {},
  activeUser: {},
  activeCard: {}
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MERCHANT_ID":
      return { ...state, merchantID: action.payload };
    case "LOAD_MERCHANT":
      return { ...state, merchant: action.payload };
    case "LOAD_USER":
      return { ...state, activeUser: action.payload };
    case "SET_ACTIVE_CARD":
      return { ...state, activeCard: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
