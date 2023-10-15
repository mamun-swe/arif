// import logo from './logo.svg';
import React, { useState, useEffect, lazy, Suspense } from "react"
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { adminMenu } from "../../initialState";
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_LOADING,
  SET_PROJECT_DATA,
  SET_LOGIN,
  SET_PROJECT_DATA_DEFAULT,
  SET_USER_DATA,
  SET_FORK_DATA,
  SET_NETWORK_DATA,
  SET_WHITELIST_DATA
} from "../../actionTypes";
import { Dark_Theme, Backendurl, ClientId } from "../../Constants";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import axios from 'axios';
import '../../App.css';
import LoadingSpin from "react-loading-spin";
const Menu = lazy(() => import("../../Components/Menu"));
const Header = lazy(() => import("../../Components/Header"));
const Projects = lazy(() => import("./Projects.js"));
const WhiteList = lazy(() => import("./WhiteList.js"));
const Users = lazy(() => import("./User.js"));
const Category = lazy(() => import("./Category.js"));
const Footer = lazy(() => import("../../Components/Footer.js"));
const HeaderBanner = lazy(() => import("./Advertisement/HeaderBanner"));
const LandingPageAds = lazy(() => import("./Advertisement/LandingPageAds"));
const FeaturedAds = lazy(() => import("./Advertisement/FeaturedAds"));
const WhitelistAds = lazy(() => import("./Advertisement/WhitelistAds"));
const ProjectPageAds = lazy(() => import("./Advertisement/ProjectPageAds"));


function Admin() {
  const location = useLocation()
  const navigate = useNavigate()
  const setTheme = useSelector(state => state.setTheme)
  // const setLoginUser = useSelector(state => state.setLoginUser)
  const dispatch = useDispatch();
  const [user, setUser] = useState(localStorage.getItem('login-user'));
  // const [getLoading, setLoading] = useState(false)
  
  const web3auth = new Web3Auth({
    chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
    clientId: ClientId // get your clientId from https://developer.web3auth.io
  });
  useEffect(() => {
    setUser(localStorage.getItem('login-user'))


    if (!user) navigate('/login', { replace: false })
    dispatch({ type: SET_LOADING, payload: true })
    axios.get(Backendurl).then(resp => {
      dispatch({ type: SET_PROJECT_DATA, payload: resp.data })
      dispatch({ type: SET_PROJECT_DATA_DEFAULT, payload: resp.data })
      dispatch({ type: SET_LOADING, payload: false })
      axios.get(Backendurl + 'getUser').then(resp1 => {
        dispatch({ type: SET_USER_DATA, payload: resp1.data })
        axios.get(Backendurl + 'getCategory').then(resp2 => {
          // console.log('Line 56', resp2.data)
          dispatch({ type: SET_FORK_DATA, payload: resp2.data.fork })
          dispatch({ type: SET_NETWORK_DATA, payload: resp2.data.network })
          axios.get(Backendurl + 'getwhitelist').then(resp3 => {
            dispatch({ type: SET_WHITELIST_DATA, payload: resp3.data })

          })
        })

      })

    });
  }, [dispatch, location, navigate, user]);

  // eslint-disable-next-line
  const initModal = async () => {
    await web3auth.initModal();
    await web3auth.connect()
  }
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (adapterName) => {
    dispatch({ type: SET_LOGIN, payload: adapterName })
    console.log("connected to wallet", adapterName, web3auth.provider)
  })
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting")
  })
  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected")
  })
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("errored", error)
  })

  return (

    <div className="App">
      <div className='body-main'>
        <Menu menu={adminMenu} />
        <div className='main-body' style={{ backgroundColor: setTheme === 'brightness' ? '#f4f5f5' : Dark_Theme.divBackground }}>
          <Header />
          <Suspense fallback={<LoadingSpin />}>
            <Routes>
              {
                user !== undefined && <>
                  <Route path='/' element={<Projects />} />
                  <Route path={'users'} element={<Users />} />
                  <Route path={'category'} element={<Category />} />
                  <Route path={'whitelist'} element={<WhiteList />} />
                  <Route path={'advertisement/banner-header'} element={<HeaderBanner />} />
                  <Route path={'advertisement/landing-page'} element={<LandingPageAds />} />
                  <Route path={'advertisement/featured'} element={<FeaturedAds />} />
                  <Route path={'advertisement/whitelistAds'} element={<WhitelistAds />} />
                  <Route path={'advertisement/projectPageAds'} element={<ProjectPageAds />} />
                </>
              }
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Admin;
