import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import './index.css';
import { DAppProvider } from "@usedapp/core";
import { MoralisProvider } from "react-moralis";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import LoadingSpin from 'react-loading-spin';
const Admin = lazy(() => import("./Screens/Admin/Admin.js"));
const Login = lazy(() => import("./Screens/Auth/Login.js"));
const App = lazy(() => import('./App'));

const APP_ID = "FWm7tpnQR8GZWawIAJcsPwDafoEwGr9XDhzFva5V";
const SERVER_URL = "https://efmjd0tjt2w2.usemoralis.com:2053/server";
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div className='load'>
      <div className='sub-load'>
        <LoadingSpin />
      </div>
    </div>}>
      <DAppProvider config={{}}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              {/* <Route path='/signup' element={<Signup />} /> */}
              <Route path='/dappdefi/*' element={<Admin />} />
              <Route path='/*' element={<App />} />
            </Routes>
          </Router>
        </Provider>
      </DAppProvider>
    </Suspense>
  </React.StrictMode>
);