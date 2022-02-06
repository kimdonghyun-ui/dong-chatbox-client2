import React,{ useEffect, useState } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_all_rooms, rx_all_msgs, rx_focus_msgs } from "../modules/chats";
import { rx_all_users, rx_authenticated } from "../modules/members";

/* material-ui */
import { CssBaseline } from "@material-ui/core";

/* function */
import { socket, cm_all_users, cm_all_rooms, cm_all_msgs, cm_logout, cm_msgs_update } from "../helpers/common";

/* components */
import TabBox from "../components/TabBox";
import FrienList from "../components/FrienList";
import Room from "../components/Room";
import Message from "../components/Message";
import InputBox from "../components/InputBox";



const Home = ({ rx_all_users, rx_all_rooms, rx_all_msgs,  me, rx_authenticated, focus_msgs, rx_focus_msgs, focusroom }) => {

    useEffect(() => {

        cm_all_users(); //api에 users 데이터 요청 후 성공시 소켓에 전달 (user_update로 되돌려받는다.)
        socket.on('all_user_update', function(user) {
            console.log(user)
          rx_all_users(user); //소켓에 연결된 모든 사용자에게 유저 데이터를 갱신해준다.
        });
    
    
        cm_all_rooms(); //api에 rooms 데이터 요청 후 성공시 소켓에 전달 (room_update로 되돌려받는다.)
        socket.on('all_room_update', function(rooms) {
          rx_all_rooms(rooms);
        });


        socket.on('broadcast', function(data){
          
          console.log('msg',data)
          rx_focus_msgs(data)
          // setDatas(msg)
        });



        // cm_all_msgs(); //api에 rooms 데이터 요청 후 성공시 소켓에 전달 (room_update로 되돌려받는다.)
        // socket.on('all_msgs_update', function(msgs) {
        //   rx_all_msgs(msgs);
        // });

        //브라우져 종료 및 새로고침시 발생
        // window.addEventListener('beforeunload', (event) => { 
        //     event.preventDefault();
        //     event.returnValue = '';
        //     cm_logout(rx_authenticated,me);
        // });
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      const [datas, setDatas] = useState(null);



      useEffect(() => {

          (focusroom > 0 && datas) && cm_msgs_update(focusroom,rx_focus_msgs,[...focus_msgs,datas]);

        
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[datas]);
    
    return (
        <React.Fragment>
            <CssBaseline />
            <TabBox
                content={[
                    <FrienList />,
                    <Room socket={socket} />,
                    <>
                        <Message socket={socket} />
                        <InputBox socket={socket} />
                    </>
                ]}
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
  me: state.members.me,
  focusroom: state.chats.focusroom,
  focus_msgs: state.chats.focus_msgs
});

const mapDispatchToProps = (dispatch) => ({
    rx_all_users: (val) => {
      dispatch(rx_all_users(val));
    },
    rx_all_rooms: (val) => {
        dispatch(rx_all_rooms(val));
    },
    rx_all_msgs: (val) => {
        dispatch(rx_all_msgs(val));
    },
    rx_authenticated: (val) => {
        dispatch(rx_authenticated(val));
    },
    rx_focus_msgs: (val) => {
      dispatch(rx_focus_msgs(val));
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);