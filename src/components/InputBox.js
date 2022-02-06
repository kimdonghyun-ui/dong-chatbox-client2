import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

/* function */
import { cm_msgs_update } from "../helpers/common";

const useStyles = makeStyles((theme) => ({
  InputBox: {
    display: "flex",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "70px",
    left: '0',
    width: "96%",
    margin: "2%",
    padding: "2%",
    boxShadow: "1px 1px 5px #a0a0a0",
    borderRadius: "5px",
    justifyContent: "space-between",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const InputBox = ({ focusroom, me, focus_msgs}) => {
  const classes = useStyles();
 
  const [datas, setData] = useState({
    roomName: focusroom,
    userName: me.username,
    msg: "",
    timestamp: Date.now(),
    notice: ""
  });

  const handleOnChange = (e) => {
    setData({
      roomName: focusroom,
      userName: me.username,
      msg: e.target.value,
      timestamp: Date.now(),
      notice: ""
    });
  };


  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log('[표시]InputBox.js',datas);
    cm_msgs_update(focusroom,[...focus_msgs,datas]);
    setData({ ...datas, msg: '' });
  };


  useEffect(() => {
    console.log('[표시]InputBox.js');
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return (
    <form onSubmit={handleSumbit}>
      <Box className={classes.InputBox}>
      <TextField
              label="Input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Input"
              name="Input"
              autoComplete="Input"
              autoFocus
              value={datas.msg}
              onChange={handleOnChange}
            />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          // endIcon={<SendIcon />}
          onClick={handleSumbit}
          disabled={datas.msg === "" ? true : false}
        ><SendIcon /></Button>
      </Box>
    </form>
  );
};
// 
const mapStateToProps = (state) => ({
  focusroom: state.chats.focusroom,
  me: state.members.me,
  focus_msgs: state.chats.focus_msgs
});

// const mapDispatchToProps = (dispatch) => ({
//   rx_remove: (val) => {
//     dispatch(rx_remove(val));
//   },
// });

export default connect(mapStateToProps, null)(InputBox);
