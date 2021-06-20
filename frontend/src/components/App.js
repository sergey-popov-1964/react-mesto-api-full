import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Mesto from "./Mesto";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./PtotectedRoute";
import apiAuth from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import Spinner from "./Spinner";
import api from "../utils/api";

function App() {

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [isOpenTooltip, setIsOpenTooltip] = useState(false)
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState(false)
  const [readyResponse, setReadyResponse] = useState(false)

  const [headerState, setHeaderState] = useState({
    email: '',
    link: '',
    text: ''
  })

  function handleHeaderState(email, link, text) {
    setHeaderState({
      email: email,
      link: link,
      text: text,
    })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      setReadyResponse(true)
      return
    }
    apiAuth.checkToken(jwt)
      .then(res => {
        setLoginEmail(res.data.email)
        setLoggedIn(true);
        setReadyResponse(true)
        api.currentToken = jwt;
        history.push('/mesto');
      })
      .catch((error) => {
        localStorage.removeItem('token');
        console.log("Что-то пошло не так", error)
        setReadyResponse(true)
      });
  }, [history])

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    api.currentToken = '';
    history.push('/signin');
  }

  function register(data) {
    apiAuth.registration(data)
      .then(() => {
        setLoggedIn(true);
        history.push('/signin');
        setIsOpenTooltip(true)
        setMessage('Вы успешно зарегистрировались!')
        setTypeMessage(true)
      })
      .catch(() => {
        setIsOpenTooltip(true)
        setMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setTypeMessage(false)
      });
  }

  function login(data) {
    apiAuth.authorization(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoginEmail(data.email);
        setLoggedIn(true);
        api.currentToken = res.token;
        history.push('/mesto');
      })
      .catch((error) => {
        setIsOpenTooltip(true)
        setMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setTypeMessage(false)
        console.log("Что-то пошло не так", error)
      });
  }

  function closePopups() {
    setIsOpenTooltip(false)
  }

  if (!readyResponse) {
    return (
      <div className="root">
        <div className="page">
          <Header/>
          <Spinner/>
        </div>
      </div>
    )

  } else {
    return (
      <>
        <div className="root">
          <div className="page">
            <Header
              email={headerState.email}
              link={headerState.link}
              text={headerState.text}
              exit={onSignOut}
            />
            <Switch>
              <ProtectedRoute
                path="/mesto"
                isLoggedIn={isLoggedIn}
                email={loginEmail}
                component={Mesto}
                exit={onSignOut}
                onHandler={handleHeaderState}
              />
              <Route path="/signin">
                <Login onLogin={login}
                       onHandler={handleHeaderState}
                />
              </Route>
              <Route path="/signup">
                <Register onRegister={register}
                          onHandler={handleHeaderState}/>
              </Route>
              <Route exact path="*">
                {isLoggedIn ? <Redirect to="/mesto"/> : <Redirect to="/signin"/>}
              </Route>
            </Switch>

            <InfoTooltip isOpen={isOpenTooltip}
                         onClose={closePopups}
                         message={message}
                         type={typeMessage}
            />
          </div>
        </div>
      </>
    )
  }
}

export default App;
