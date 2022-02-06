import React, { useEffect, useState } from 'react';

/* redux */
import { connect } from "react-redux";
import { rx_focusroom, rx_focus_msgs } from "../modules/chats";

/* material-ui */

/* function */
import { cm_room_remove, cm_roomuser_update } from "../helpers/common";

/* components */


const Room = ({all_rooms, me, rx_focusroom, socket, focusroom, all_msgs, all_users, rx_focus_msgs }) => {

  //#####nameCheck#####[10,20] 이런 유저 아이디를 이름화 시키는 기능
  const nameCheck = (data) => {
    return data.map((da,index) => index > 0 ? '/' + all_users.filter((i) => i.id === da )[0].username : all_users.filter((i) => i.id === da )[0].username );
  }
  //####################

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    //all_rooms전체 룸데이터 에서 내가속해있는 룸만 걸러서 my_room에 담기
    let my_room = all_rooms.filter((i) => i.attributes.roomuser.includes(me.id));
    setRooms(my_room);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[all_rooms]);

  const event_room = (room) => {
    
    if(room.id !== focusroom){

      let all_rooms_focus = all_rooms.filter((item) => item.id === room.id )[0]

      rx_focusroom(room.id);
rx_focus_msgs(all_rooms_focus.attributes.list)
    }


        // //클릭한 방이 이미 내가 들어가있는 방인경우 else에 탭인덱스만 바꿔주기 (아직안했음)
        // if(room.id !== focusroom){

        //   //방에 내가 없는 경우 나를 추가해주기(있는경우에는 무시)
        //   if(!room.attributes.roomuser.some((i) => i === me.id )){
        //     console.log('없으니 추가해 셋갸');
        //     let hello = room.attributes.roomuser;
        //     hello.push(me.id)
        //     cm_roomuser_update(all_rooms,room.id,hello);



        //   }


        //   focusroom > 0 && socket.emit('leaveRoom',focusroom);
        //   setTimeout(() => {
        //     rx_focusroom(room.id);
        //     socket.emit('joinRoom', room.id);
        //     socket.emit('chatting', {
        //       roomName: room.id,
        //       userName: me.username,
        //       msg: "",
        //       timestamp: Date.now(),
        //       notice: `${me.username}님이 입장하셨습니다.`
        //     });
        //   },2000)


        // };

    } 

    return (
        <div>



          <ul>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <li key={index} style={{ display:'flex', justifyContent:'space-between' }}>
                  <button onClick={() => event_room(room)}>
                    {`[${room.id}] `}
                    {nameCheck(room.attributes.roomuser)}
                  </button>
                  <button onClick={() => cm_room_remove(room.id,all_rooms,all_msgs, focusroom)}>
                    삭제
                  </button>
                </li>
              ))
            ) : (
              <li>리스트가없습니다.</li>
            )}
          </ul>

        </div>
    );
};

const mapStateToProps = (state) => ({
  all_rooms: state.chats.all_rooms,
  me: state.members.me,

  focusroom: state.chats.focusroom,
  all_msgs: state.chats.all_msgs,

  all_users: state.members.all_users,
});

const mapDispatchToProps = (dispatch) => ({
  rx_focusroom: (val) => {
    dispatch(rx_focusroom(val));
  },
  rx_focus_msgs: (val) => {
    dispatch(rx_focus_msgs(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);