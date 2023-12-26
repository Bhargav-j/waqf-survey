import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/styles/report.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { store } from "./components/redux/ReduxStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

