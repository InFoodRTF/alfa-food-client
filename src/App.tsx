import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthUser from "./ViewModel/AuthUser";
import {inject, observer} from "mobx-react";
import Token from "./ViewModel/Token";
import AuthStore from "./Store/AuthStore";

let log = new AuthUser();
let x = new Token();

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
                Edit <code>src/App.tsx</code> {authStore.User.username}.
              </p>
              <input type='text' defaultValue='' onChange={(e) => {
                  authStore.User.ChangeName(e.target.value)
              }}/>
                <input type='text' onChange={(e) =>  authStore.User.ChangePassword(e.target.value)}/>
                <input type='button' onClick={() => authStore.UserAuth()}/>
                Learn React
            </header>
          </div>
        </div>
    );
  }
}

export default App;
