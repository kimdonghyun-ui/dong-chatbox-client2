
import { setCookie, delCookie } from "../cookie";
import axios from "axios";

import io from "socket.io-client";


export const socket = io.connect("http://localhost:4001");
// export const socket = io.connect("https://dong-chatbox-server2.herokuapp.com");

// const api_url = "http://localhost:1337/";
const api_url = "https://dongdong-api.herokuapp.com/";






//##########################################################
//########### 접속유무 확인 ################
//##########################################################
export const cm_contact = async (id,state) => {
  try {
    await axios.put(api_url+'api/users/'+id, {
      confirmed: state,
    });
    console.log('접속상태 true');
    cm_all_users();
  } catch (e) {
    console.log('접속상태 확인 실패');
  }
}
//##########################################################









//##########################################################
//########### 회원가입 ################
//##########################################################
export const cm_signUp = async (member,rx_authenticated,rx_loading1,rx_me) => {
  rx_loading1(true);
    try {
      const { data } = await axios.post(api_url+'api/auth/local/register', {
          username: member.name,
          email: member.email,
          password: member.password,
          confirmed: true,
      });
      
      if(data.jwt){
        console.log('회원가입 성공 쿠키저장');
        setCookie('myToken', data.jwt,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setCookie('me', data.user,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        rx_authenticated(true);
        rx_me(data.user);
      }
    } catch (e) {
      console.log('회원가입 실패',e);
      alert('회원가입에 실패하였습니다. 기존가입내역이있는듯합니다. 다른아이디로갑하세요')
    }
    rx_loading1(false);
  }
//##########################################################

//##########################################################
//########### 로그인 ################
//##########################################################
export const cm_login = async (member,rx_authenticated,rx_loading1,rx_me) => {
  rx_loading1(true);
    try {
      const { data } = await axios.post(api_url+'api/auth/local', {
        identifier: member.email,
        password: member.password,
      });
      console.log(data.jwt);
      if(data.jwt){
        setCookie('myToken', data.jwt,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setCookie('me', data.user,{
          path: "/",
          secure: true,
          sameSite: "none",
        });
        rx_authenticated(true);
        rx_me(data.user);
        cm_contact(data.user.id,true);
      }
    } catch (e) {
      console.log('실패');
    }
  rx_loading1(false);
  }
//##########################################################


//##########################################################
//########### 로그아웃 ################
//##########################################################
export const cm_logout = (rx_authenticated,me) => {
  /*쿠키에 저장한 myToken,me를 제거 */
  delCookie('myToken');
  delCookie('me');
  
  /* authenticated 값을 false로해 로그아웃상태로 인지시켜줌 */
  rx_authenticated(false);

  /* 나의 접속상태 값 false */
  cm_contact(me.id,false);
}
//##########################################################













//##########################################################
//########### 유저리스트 ################
//##########################################################
export const cm_all_users = async () => {
  try {
    const { data } = await axios.get(api_url+'api/users');
    console.log('cm_all_users성공 소켓에 알리기',data)
    socket.emit('all_users', data);
  } catch (e) {
    console.log('cm_all_users 실패');
    console.log(e);
    console.log('cm_all_users 실패');
  }
}
//##########################################################

//##########################################################
//########### 룸리스트 불러오기 ################
//##########################################################
export const cm_all_rooms = async () => {
  try {
    const { data } = await axios.get(api_url+'api/rooms');
    console.log('cm_all_rooms성공 소켓에 알리기',data.data)
    socket.emit('all_rooms', data.data);
  } catch (e) {
    console.log('cm_all_rooms 실패');
    console.log(e);
    console.log('cm_all_rooms 실패');
  }
}
//##########################################################

//##########################################################
//########### 메시지리스트 불러오기 ################
//##########################################################
export const cm_all_msgs = async () => {
  try {
    const { data } = await axios.get(api_url+'api/msglists');
    console.log('cm_all_msgs성공 소켓에 알리기',data.data)
    socket.emit('all_msgs', data.data);
  } catch (e) {
    console.log('cm_all_msgs 실패');
    console.log(e);
    console.log('cm_all_msgs 실패');
  }
}
// //##########################################################
// //##########################################################
// //########### 메시지 업데이트(입력하고 전송 날리는거) ################
// //##########################################################
// export const cm_msgs_update = async (new_msgs,id,all_msgs) => {
//   try {
//     await axios.put(api_url+'api/msglists/'+id, {
//       "data":
//       {
//         "list":new_msgs
//       }
//     });

//     // console.log('cm_msgs_update 소켓에 알리기',data.data)
//     socket.emit('all_msgs', all_msgs);
//   } catch (e) {
//     console.log('cm_msgs_update 실패');
//     console.log(e);
//     console.log('cm_msgs_update 실패');
//   }
// }
// //##########################################################








// export const cm_msg_remove = async (msgs,id,all_msgs) => {
//   try {
//     await axios.put(api_url+'api/msglists/'+id, {
//       "data":
//       {
//         "list":msgs
//       }
//     });

//       //위에 api에는 data추가하였지만 socket에도 알려 화면단의 데이터도 최신화 해준다.
//       console.log('메시지삭제 성공',msgs);
//       socket.emit('all_msgs', all_msgs.filter((item) => item.id === id && (item.attributes.list = msgs)));
//   } catch (e) {
//     console.log('메시지삭제 실패'+e);
//   }
// };





















const removeMsg = async (all_msgs, m_id) => {
  try {
    await axios.delete(api_url+'api/msglists/'+m_id);
  
    console.log(`api/msglists/ 메시지묶음 식제 성공 : 메시지묶음 번호 [${m_id}]`);

    let m_remove = all_msgs.filter((item) => item.id !== m_id );
    socket.emit('all_msgs', m_remove);

  } catch (e) {
    console.log('메시지묶음도 추가 실패'+e);
  }
};
export const cm_room_remove = async (id,all_rooms,all_msgs, focusroom) => {
  try {
    await axios.delete(api_url+'api/rooms/'+id);
    console.log(`api/rooms/ 룸 식제 성공 : 룸 번호 [${id}]`);

    //위에 api에는 data삭제하였지만 socket에도 알려 화면단의 데이터도 최신화 해준다.
    let r_remove = all_rooms.filter((item) => item.id !== id );
    socket.emit('all_rooms', r_remove);

    //삭제한 룸 번호가 현재 focusroom 하고 같으면 없어진 룸이기에 초기화 해준다.
    id === focusroom && socket.emit('focusroom', 0);
    // socket.emit('focusroom', id);
    //룸 삭제시 세트 메시지묶음도 삭제
    removeMsg(all_msgs, all_msgs.filter((item) => item.attributes.name === id )[0].id);
  } catch (e) {
    console.log('룸 삭제 실패');
  }
}





//##########################################################
//########### 내 룸 개설 ################
//##########################################################
//newRoom 과 newMsg는 세트로서  새방 데이터 쌓을때 같은급 새메시지 데이터도 쌓는다.
//########### newMsg api서버에 새메시지 데이터 post  ################
const newMsg = async (id,all_msgs) => {
  console.log('newMsg'+id);
  try {
    const { data } = await axios.post(api_url+'api/msglists/', {
        "data":
        {
          "name":id,
          "list":[]
        }
      });

      //위에 api에는 data추가하였지만 socket에도 알려 화면단의 데이터도 최신화 해준다.
      console.log('메시지묶음도 추가 성공');
      all_msgs.push(data.data);
      socket.emit('all_msgs', all_msgs);
  } catch (e) {
    console.log('메시지묶음도 추가 실패'+e);
  }
};
//##########################################################
//########### newRoom api서버에 새방 데이터 post  ################
const newRoom = async (me,you,all_rooms,all_msgs,rx_focusroom) => {
  console.log(`me : ${me} / you : ${you}`);
  try {
    const { data } = await axios.post(api_url+'api/rooms/', {
      "data":
        {
          "roomuser":[me,you]
        }
      });
      //위에 api에는 data추가하였지만 socket에도 알려 화면단의 데이터도 최신화 해준다.
      console.log('api/rooms/ 새룸 추가 성공'+data.data.id);
      all_rooms.push(data.data);
      socket.emit('all_rooms', all_rooms);

      //룸 추가시 세트 메시지묶음도 추가
      newMsg(data.data.id,all_msgs);
      rx_focusroom(data.data.id);
      socket.emit('joinRoom', data.data.id);


  } catch (e) {
    console.log('api서버에 새룸 추가 실패',e);
  }
};
//##########################################################
//########### cm_room_add 방추가 버튼(이미있는 방인지 아닌지 체크해서 없으면 새방 있으면 있는방 노출)  ################
export function cm_room_add(me, you, all_rooms, all_msgs, rx_tabindex, rx_focusroom) {
  if(me === you){
    alert('자신과는 대화 할수 없습니다.');
    return
  };

  const user_arry = [me, you].sort();

  //[all_rooms 전체 룸] 중에서  [user_arry 해당 유저 배열]을 포함한 방이 있는지 찾아서 true/false 내보낸다.
  let clone_allroomlist2 = JSON.parse(JSON.stringify(all_rooms));
  clone_allroomlist2 = clone_allroomlist2.filter(
    (item) => JSON.stringify(item.attributes.roomuser.sort()) === JSON.stringify(user_arry)
  );

  // console.log(clone_allroomlist2.length); 위에서 me랑you를 포함한 방이 있는지 체크후 없으면 0이라 if 있으면 else

  

  if (clone_allroomlist2.length === 0) {
    console.log("방이없으니 새방생성");

    //방이 없으니 새방을 만들어준다.
    newRoom(user_arry[0], user_arry[1],all_rooms,all_msgs,rx_focusroom);
    rx_tabindex(2);
  } else {
    console.log("이미 있는 방임");

    //방이 있으니 rx_focusroom에 현재 바라보고있는 방 이름만 셋 해주기
    rx_focusroom(clone_allroomlist2[0].id);
    socket.emit('joinRoom', clone_allroomlist2[0].id);
    rx_tabindex(2);
  };
}
//##########################################################












//##########################################################
//########### 방리스트에서 내가 안속해있는 방에 나를 추가하기 ################
//##########################################################
export const cm_roomuser_update = async (all_rooms,room_id,new_user) => {
  try {
    const { data } = await axios.put(api_url+'api/rooms/'+room_id, {
      "data":
      {
        "roomuser":new_user
      }
    });

    console.log('cm_roomuser_update 소켓에 알리기',data.data)
    //socket.emit('all_msgs', all_msgs);

    all_rooms.map((i) => i.id === room_id ? i = data.data : i )
    socket.emit('all_rooms', all_rooms);

  } catch (e) {
    console.log('cm_roomuser_update 실패');
    console.log(e);
    console.log('cm_roomuser_update 실패');
  }
}
//##########################################################