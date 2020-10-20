import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import MainContext from './context/MainContext';


ReactDOM.render(
  <React.StrictMode>
    <MainContext>
      <App />
    </MainContext>
  </React.StrictMode>,
  document.getElementById('root')
);
