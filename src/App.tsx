import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from "./ViewModel/User";
import {observer} from "mobx-react";
import Token from "./ViewModel/Token";

let log = new User();
let x = new Token();

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
                <input type='button' onClick={() => x.CheckInServer(log)}/>
              Learn React
            </header>
          </div>
        </div>
    );
  }
}

export default App;
