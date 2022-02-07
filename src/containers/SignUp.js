import React, { useState } from "react";

/* router */
import { Link } from "react-router-dom";

/* redux */
import { connect } from "react-redux";
import { rx_loading1 } from "../modules/chats";
import { rx_me, rx_authenticated } from "../modules/members";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";

/* function */
import { cm_signUp } from "../helpers/common";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Button component={Link} to="https://material-ui.com/">
        Your Website
      </Button>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({ rx_authenticated, rx_loading1, rx_me }) {
  const classes = useStyles();
  const [member, setMember] = useState({
    email: "",
    name: "",
    password: "",
  });


  const email_check = (email) => {
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email !== '' && email !== 'undefined' && regex.test(email));
  }


  const [error_email, setError_email] = useState([false,'']);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    if (!email_check(member.email)){
      setError_email([true,'Email형식을 제대로 입력부탁드립니다.']);
      console.log("not email address");
    }else{
      setError_email([false,'']);
    }


  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (member.email !== "" && member.password !== "" && member.name !== "") {
      cm_signUp(member,rx_authenticated,rx_loading1,rx_me);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={error_email[0]}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={member.email}
                onChange={handleOnChange}
              />
              <p style={{color:'red'}}>{error_email[1]}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                value={member.name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={member.password}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            가입하기
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              이미 회원이신가?{" "}
              <Button component={Link} to="/login">
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_loading1: (val) => {
    dispatch(rx_loading1(val));
  },
  rx_me: (val) => {
    dispatch(rx_me(val));
  }
});

export default connect(null, mapDispatchToProps)(SignUp);