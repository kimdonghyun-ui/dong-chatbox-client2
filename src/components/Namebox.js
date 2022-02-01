import React,{useState} from 'react';

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { Box, Button, TextField } from "@material-ui/core";

import { connect } from "react-redux";

import { rx_username } from "../modules/chats";


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


const Namebox = ({rx_username}) => {
  const classes = useStyles();


  const [datas, setData] = useState('');

  const handleOnChange = (e) => {
    setData(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log('[표시]Namebox.js',datas)
    rx_username(datas);

    // setData("");
  };

    return (
        <Box className={classes.InputBox}>
            <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Name"
                name="Name"
                autoComplete="Name"
                autoFocus
                value={datas}
                onChange={handleOnChange}
              />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            // endIcon={<SendIcon />}
            onClick={handleSumbit}
            disabled={datas === "" ? true : false}
          ><SendIcon /></Button>
        </Box>
    );
};

// const mapStateToProps = (state) => ({
//     focusroom: state.chats.focusroom,
//   });
  
  const mapDispatchToProps = (dispatch) => ({
    rx_username: (val) => {
      dispatch(rx_username(val));
    },
  });
  
  export default connect(null, mapDispatchToProps)(Namebox);