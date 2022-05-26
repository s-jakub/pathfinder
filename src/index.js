import * as ReactDOMClient from 'react-dom/client'
import React from 'react';
import './index.css';
import App from './App';
import { store } from './store/store'
import { Provider } from 'react-redux';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

