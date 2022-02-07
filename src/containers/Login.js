import React, { useState } from "react";

/* redux */
import { connect } from "react-redux";
import { rx_loading1 } from "../modules/chats";
import { rx_me, rx_authenticated } from "../modules/members";

/* router */
import { Link } from "react-router-dom";

/* material-ui */
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CssBaseline,
  Container,
} from "@material-ui/core";

/* function */
import { cm_login } from "../helpers/common";


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ rx_authenticated, rx_loading1, rx_me }) {
  const classes = useStyles();

  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (member.email !== "" && member.password !== "") {
      cm_login(member,rx_authenticated,rx_loading1,rx_me);
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
          동현이의 채팅방
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일을 입력하세요."
            name="email"
            autoComplete="email"
            autoFocus
            value={member.email}
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={member.password}
            onChange={handleOnChange}
            error={false}
            helperText={false && 'password는 최소 8 자, 최소 하나의 문자 및 하나의 숫자' }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>

          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Button component={Link} to="/signup">
                {"회원가입"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
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

export default connect(null, mapDispatchToProps)(Login);