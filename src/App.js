import React, { useEffect } from 'react';

/* router */
import { HashRouter, Switch } from "react-router-dom";

/* redux */
import { connect } from "react-redux";
import { rx_me, rx_authenticated } from "./modules/members";

/* cookie */
import { getCookie } from "./cookie";

/* material-ui */
// import { CircularProgress, Box } from "@material-ui/core";

/* components */
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Home from "./containers/Home";
import LoadingBar from './components/LoadingBar';

function App({rx_authenticated, authenticated, loading1, rx_me}) {

  useEffect(() => {
    console.log('[app.js]입니다.');

    //쿠키에 myToken값이 있으면 로그인된상태로 주기위한 조건
    if (getCookie('myToken')) {
      rx_authenticated(true); //해당 리덕스(변수)로 true/false 로 로그인 상태 체크
      rx_me(getCookie('me')); //로그인할때 쿠키에 저장한 나의 정보를 리덕스(변수)에 넣기
      console.log('myToken이 존재하므로 로그인된거로 처리');
    }
    console.log('//[app.js]입니다.');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  
  
  return (
    <HashRouter>
      <LoadingBar open={loading1}>
        <Switch>
          <PrivateRoute
            path="/home"
            authenticated={authenticated}
            component={Home}
          />
          <PublicRoute
            path="/signup"
            authenticated={authenticated}
            component={SignUp}
          />
          <PublicRoute
            path={["/", "/login"]}
            authenticated={authenticated}
            component={Login}
          />
        </Switch>
      </LoadingBar>
    </HashRouter>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.members.authenticated,
  loading1: state.chats.loading1
});

const mapDispatchToProps = (dispatch) => ({
  rx_authenticated: (val) => {
    dispatch(rx_authenticated(val));
  },
  rx_me: (val) => {
    dispatch(rx_me(val));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);