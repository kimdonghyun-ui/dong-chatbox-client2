const RX_ME = "menu/RX_ME";
const RX_AUTHENTICATED = "menu/RX_AUTHENTICATED";
const RX_ALL_USERS = "menu/RX_ALL_USERS";



export const rx_me = (result) => ({
    type: RX_ME,
    result,
});
export const rx_authenticated = (result) => ({
    type: RX_AUTHENTICATED,
    result,
});
export const rx_all_users = (result) => ({
  type: RX_ALL_USERS,
  result,
});

  const initialState = {
    me:{},
    authenticated: false,
    all_users: [],
  };

  function members(state = initialState, action) {
    switch (action.type) {

      case RX_ME:
        return {
          ...state,
          me: action.result,
      };
      case RX_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.result,
      };

      case RX_ALL_USERS:
        return {
          ...state,
          all_users: action.result,
      };

      default:
        return state;
    }
  }
  
  export default members;
