import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const options = {
  timeout: 5000,
  position: "bottom center"
};

ReactDOM.render((
  <BrowserRouter>
      <App />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
