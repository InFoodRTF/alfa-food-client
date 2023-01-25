import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthUser from "./ViewModel/AuthUser";
import {inject, observer} from "mobx-react";
import Token from "./ViewModel/Token";

let log = new AuthUser();
let x = new Token();
inject()
@observer
class App extends React.Component{

    render() {
    return (
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> {log.username}.
              </p>
              <input type='text' defaultValue='' onChange={(e) => {
                  log.ChangeName(e.target.value)
              }}/>
                <input type='text' onChange={(e) =>  log.ChangePassword(e.target.value)}/>
                <input type='button' onClick={() => x.GetTokenAuth(log)}/>
                Learn React
            </header>
          </div>
        </div>
    );
  }
}

export default App;
