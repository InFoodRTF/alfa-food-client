import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "mobx-react";
import AuthUser from "./ViewModel/AuthUser";
import Token from "./ViewModel/Token";
import AuthStore from "./Store/AuthStore";
import statusResponse from "./Api/Response/StatusResponse";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let authStore = new AuthStore(new AuthUser(), new Token(), statusResponse.Wait);

root.render(
  <React.StrictMode>
      <Provider authStore={authStore} >
    <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
