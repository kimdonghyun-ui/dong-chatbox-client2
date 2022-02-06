import React, { useEffect, useState } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_focus_msgs, rx_focusroom, rx_tabindex } from "../modules/chats";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Button, ListSubheader } from "@material-ui/core";

/* function */
import { cm_room_remove } from "../helpers/common";

/* components */
import RoomItem from "./RoomItem";
import LoadingBar from "./LoadingBar";


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '26px'
  },
  list: {
    position: 'absolute',
    top: '98px',
    bottom: '72px',
    left: '24px',
    right: '25px',
    overflowY: "scroll",
  },
  divider: {
    // margin: '20px 0',
  },
  title: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '50px',
    padding:'0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: '20px',
    fontWeight:'bold',
    "& button": {
      position: 'absolute',
      right: '10px',
      color:'#fff'
    }
  }
}));

const RoomList = ({ socket, btn_logout, all_rooms, me, rx_focusroom, rx_tabindex, focusroom, all_msgs, all_users, rx_focus_msgs }) => {
  const classes = useStyles();




  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    //all_rooms전체 룸데이터 에서 내가속해있는 룸만 걸러서 my_room에 담기
    let my_room = all_rooms.filter((i) => i.attributes.roomuser.includes(me.id));
    setRooms(my_room);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[all_rooms]);

  const event_room = (room_id) => {
    
    if(room_id !== focusroom){

      let all_rooms_focus = all_rooms.filter((item) => item.id === room_id )[0]

      rx_focusroom(room_id);
      rx_focus_msgs(all_rooms_focus.attributes.list);
      rx_tabindex(2);
      // focusroom > 0 && socket.emit('joinRoom', focusroom);
    }else{
      rx_focusroom(room_id);
      rx_tabindex(2);
    };

    socket.emit('joinRoom', room_id);

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

    };
    //#####nameCheck#####[10,20] 이런 유저 아이디를 이름화 시키는 기능
    const nameCheck = (data) => {
        return data.map((da,index) => index > 0 ? '/' + all_users.filter((i) => i.id === da )[0].username : all_users.filter((i) => i.id === da )[0].username );
    };
    //####################

    const hendle_room_remove = (r_id) => cm_room_remove(r_id,all_rooms,all_msgs, focusroom);


  return (
    <LoadingBar open={false}>
      <Box className={classes.root}>
        <div  className={classes.title}>
          {me.username}
          <Button onClick={() => {
              btn_logout();
            }}>로그아웃</Button>
        </div>
        <ListSubheader component="div">전체 친구 리스트</ListSubheader>

        <List className={classes.list}>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <RoomItem key={index} img="https://material-ui.com/static/images/avatar/1.jpg" room={room} all_users={all_users} event={event_room} name={nameCheck(room.attributes.roomuser)} hendle_room_remove={hendle_room_remove} />
            ))
          ) : (
            <li>리스트가없습니다.</li>
          )}
        </List>
      </Box>
    </LoadingBar>
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
    rx_tabindex: (val) => {
        dispatch(rx_tabindex(val))
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);