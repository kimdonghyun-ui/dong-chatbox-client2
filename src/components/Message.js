import React, { useEffect, useRef } from "react";


import {ListSubheader} from "@material-ui/core";

import * as dateFns from "date-fns";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";


/* redux */
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
/* function */
import FriendAdd from "./FriendAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:'26px',
  },
  lBox: {
    flexDirection: "row-reverse",
    display: "flex",
    textAlign: "right",
  },
  rBox: {
    flexDirection: "row-reverse",
    display: "flex",
    textAlign: "right",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    left: 0,
    width: "100%",
    "& input,& button": {
      width: "100%",
      height: "50px",
    },
  },

  listBox: {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    top: '98px',
    bottom: '165px',
    left: '24px',
    right: '25px',
    overflowY: "scroll",
  },
  listBoxItem: {
    display: "block",
  },
  listBoxItemavatar: {
    display: "flex",
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

const Message = ({socket, focusroom, me, focus_msgs, tabindex, btn_logout}) => {
    const classes = useStyles();

  const intervalId = useRef(null);

  function scrollToMyRef() {
    console.log('scrollToMyRef실행')
    const scroll =
      intervalId.current.scrollHeight - intervalId.current.clientHeight;
    intervalId.current.scrollTo(0, scroll);
  }

  useEffect(() => {
    socket.emit('joinRoom', focusroom);

    return () => {
      socket.emit('leaveRoom', focusroom);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusroom]);

  useEffect(() => {
    scrollToMyRef();

  }, [focus_msgs]);



  return (
    <Box
      className={classes.root}
    >
      <div className={classes.title}>
        {me.username}
        <Button onClick={() => {
            btn_logout();
          }}>로그아웃</Button>
      </div>
      <ListSubheader
        component="div"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        채팅방

      {focusroom > 0 && <FriendAdd />}
      
      </ListSubheader>
      <List className={classes.listBox} ref={intervalId}>
        {focus_msgs.length > 0 ? (
          focus_msgs.map((data, index) => (
            

            <ListItem key={index} className={classes.listBoxItem}>
                {data.notice === "" ?

              <Box
                style={{
                  display: "flex",
                  flexDirection:
                    me.id === data.userId
                      ? "row-reverse"
                      : "row",
                  textAlign:
                  me.id === data.userId ? "right" : "left",
                }}
              >
                <ListItemAvatar
                  className={classes.listBoxItemavatar}
                  style={{
                    justifyContent:
                        me.id === data.userId
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primary={data.userName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        style={{ wordBreak: "break-all" }}
                      >
                        {data.msg}
                      </Typography>
                      <br />
                      {data.timestamp && dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")}
                      {/* {dateFns.format(data.timestamp, "yyyy-MM-dd HH:mm:ss")} */}
                    </React.Fragment>
                  }
                />
                <Button
                  style={{
                    display:
                        "me.id" !== data.me_id
                        ? "none"
                        : "inline-flex",
                  }}
                  onClick={() => alert('삭제는 없음')}
                >
                  삭제
                </Button>
              </Box>
              :
              <Box>{data.notice}</Box>
                }
            </ListItem>



          ))
        ) : (
          <li>{focusroom > 0 ? '리스트가 없습니다.' : '방을 선택해주세요'}</li>
        )}
      </List>




    </Box>
  );
};

const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  me: state.members.me,
  focus_msgs: state.chats.focus_msgs,
  tabindex: state.chats.tabindex
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_authenticated: (val) => {
//     dispatch(rx_authenticated(val));
//   },
// });

export default connect(mapStateToProps, null)(Message);