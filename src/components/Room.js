import React from 'react';

/* redux */
import { connect } from "react-redux";
import { rx_focusroom } from "../modules/chats";

/* material-ui */

/* function */
import { cm_room_remove, cm_roomuser_update } from "../helpers/common";

/* components */


const Room = ({all_rooms, me, rx_focusroom, socket, focusroom, all_msgs, all_users }) => {

  //#####nameCheck#####[10,20] 이런 유저 아이디를 이름화 시키는 기능
  const nameCheck = (data) => {
    return data.map((da,index) => index > 0 ? '/' + all_users.filter((i) => i.id === da )[0].username : all_users.filter((i) => i.id === da )[0].username );
  }
  //####################



  const event_room = (room) => {
    

        //클릭한 방이 이미 내가 들어가있는 방인경우 else에 탭인덱스만 바꿔주기 (아직안했음)
        if(room.id !== focusroom){

          //방에 내가 없는 경우 나를 추가해주기(있는경우에는 무시)
          if(!room.attributes.roomuser.some((i) => i === me.id )){
            console.log('없으니 추가해 셋갸');
            let hello = room.attributes.roomuser;
            hello.push(me.id)
            cm_roomuser_update(all_rooms,room.id,hello);



          }


          focusroom > 0 && socket.emit('leaveRoom',focusroom);
          setTimeout(() => {
            rx_focusroom(room.id);
            socket.emit('joinRoom', room.id);
            socket.emit('chatting', {
              roomName: room.id,
              userName: me.username,
              msg: "",
              timestamp: Date.now(),
              notice: `${me.username}님이 입장하셨습니다.`
            });
          },2000)


        };

    } 

    return (
        <div>



          <ul>
            {all_rooms.length > 0 ? (
              all_rooms.map((room, index) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);