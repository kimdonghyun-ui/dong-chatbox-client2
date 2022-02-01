const RX_FOCUSROOM = "menu/RX_FOCUSROOM";
const RX_TABINDEX = "menu/RX_TABINDEX";
const RX_ALL_ROOMS = "menu/RX_ALL_ROOMS";
const RX_ALL_MSGS = "menu/RX_ALL_MSGS";
const RX_LOADING1 = "menu/RX_LOADING1";




export const rx_focusroom = (result) => ({
  type: RX_FOCUSROOM,
  result,
});

export const rx_tabindex = (result) => ({
  type: RX_TABINDEX,
  result,
});

export const rx_all_rooms = (result) => ({
  type: RX_ALL_ROOMS,
  result,
});

export const rx_all_msgs = (result) => ({
  type: RX_ALL_MSGS,
  result,
});

export const rx_loading1 = (result) => ({
  type: RX_LOADING1,
  result,
});


  const initialState = {
    focusroom: 0,
    tabindex:0,
    all_rooms: [],
    all_msgs:[],
    loading1: false,

  };

  function chats(state = initialState, action) {
    switch (action.type) {

      case RX_FOCUSROOM:
        return {
          ...state,
          focusroom: action.result,
        };
      case RX_TABINDEX:
        return {
          ...state,
          tabindex: action.result,
      };
      case RX_ALL_ROOMS:
        return {
          ...state,
          all_rooms: action.result,
      };

      case RX_ALL_MSGS:
        return {
          ...state,
          all_msgs: action.result,
      };

      case RX_LOADING1:
        return {
          ...state,
          loading1: action.result,
      };

      default:
        return state;
    }
  }
  
  export default chats;
