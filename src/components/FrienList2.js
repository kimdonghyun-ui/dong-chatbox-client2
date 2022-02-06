import React, { useEffect } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_tabindex, rx_focusroom, rx_focus_msgs } from "../modules/chats";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Button, ListSubheader } from "@material-ui/core";

/* function */
import { cm_room_add } from "../helpers/common";

/* components */
import FriendItem from "./FriendItem";
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

const FrienList = ({ btn_logout, all_users, me, all_rooms, all_msgs, rx_tabindex, rx_focusroom, rx_focus_msgs }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("[표시]FrienList.js");

  }, []);


  const room_open = (you) => {
    cm_room_add(me.id, you, all_rooms, all_msgs, rx_tabindex, rx_focusroom, rx_focus_msgs);
  }



  return (
    <LoadingBar open={false}>
      <Box className={classes.root}>
        <div className={classes.title}>
          {me.username}
          <Button onClick={() => {
              btn_logout();
            }}>로그아웃</Button>
        </div>

        <ListSubheader component="div">전체 친구 리스트</ListSubheader>

        <List className={classes.list}>
          {all_users.length > 0 ? (
            all_users.map((user, index) => (
              <FriendItem key={index} img="https://material-ui.com/static/images/avatar/1.jpg" text={user.username} sub={user.email} id={user.id} confirmed={user.confirmed} event={room_open} />
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
    all_users: state.members.all_users,
    all_rooms: state.chats.all_rooms,
    all_msgs: state.chats.all_msgs,
    me: state.members.me
});

const mapDispatchToProps = (dispatch) => ({
    rx_tabindex: (val) => {
      dispatch(rx_tabindex(val));
    },
    rx_focusroom: (val) => {
        dispatch(rx_focusroom(val));
    },
    rx_focus_msgs: (val) => {
      dispatch(rx_focus_msgs(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FrienList);