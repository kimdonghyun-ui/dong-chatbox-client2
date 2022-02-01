import React, { useEffect } from 'react';

/* redux */
import { connect } from "react-redux";
import { rx_tabindex, rx_focusroom } from "../modules/chats";

/* material-ui */

/* function */
import { cm_room_add } from "../helpers/common";

/* components */


const FrienList = ({ all_users, me, all_rooms, all_msgs, rx_tabindex, rx_focusroom }) => {


    useEffect(() => {
        console.log('FrienList',all_users)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[all_users]);


      const room_open = (you) => {
        cm_room_add(me.id, you, all_rooms, all_msgs, rx_tabindex, rx_focusroom);
      }


    return (
        <ul>
          {all_users.length > 0 ? (
            all_users.map((user, index) => (
            <li key={index}>
                <button onClick={() => room_open(user.id) }>
                {user.username}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`[${user.confirmed ? 'O' : 'X'}]`}
                </button>
            </li>
            ))
          ) : (
            <li>리스트가없습니다.</li>
          )}
        </ul>
    );
};

const mapStateToProps = (state) => ({
  all_users: state.members.all_users,
  me: state.members.me,
  all_rooms: state.chats.all_rooms,
  all_msgs: state.chats.all_msgs
});

const mapDispatchToProps = (dispatch) => ({
    rx_tabindex: (val) => {
      dispatch(rx_tabindex(val));
    },
    rx_focusroom: (val) => {
        dispatch(rx_focusroom(val));
    },
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(FrienList);