import React from 'react';
import logo from './logo.svg';
import './App.css';
import {inject, observer} from "mobx-react";
import AuthStore from "./Store/AuthStore";
import statusResponse from "./Api/Response/StatusResponse";
import {Link, Navigate} from "react-router-dom";


type props = {
    authStore : AuthStore;
}

@inject("authStore")
@observer
class App extends React.Component{
    get injected(): props{
        return this.props as props;
    }

    render() {
        const {authStore} = this.injected;

    return (
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> {authStore.User.username}
              </p>
              <input type='text' defaultValue='' onChange={(e) => {
                  authStore.User.ChangeUserName(e.target.value)
              }}/>
                <input type='text' onChange={(e) =>  authStore.User.ChangePassword(e.target.value)}/>
                <input type='button' onClick={() => authStore.UserAuth()}/>
                <Link to={'/Profile'} > <button type="button"> toProfile</button> </Link>
                {authStore.ResponseStatus === statusResponse.BadRequest && <p>не прошел запрос</p>}
                {authStore.ResponseStatus === statusResponse.NotServer && <p>не прошел запрос</p>}
                {authStore.ResponseStatus === statusResponse.Ok && <Navigate to={'/Profile'}/>}
                {authStore.ResponseStatus === statusResponse.ServerNotFound && <p>не прошел запрос</p>}
            </header>
          </div>
        </div>
    );
  }
}

export default App;
