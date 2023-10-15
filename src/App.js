// import logo from './logo.svg';
import React, { useEffect, Suspense, lazy } from "react"
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menuList } from "./initialState";
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_LOADING,
  SET_PROJECT_DATA,
  SET_LOGIN,
  SET_PROJECT_DATA_DEFAULT,
  SET_FORK_DATA,
  SET_NETWORK_DATA,
  SET_CATEGORY_BTN,
  SET_WHITELIST_DATA
} from "./actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl, ClientId } from "./Constants";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import axios from 'axios';
import './App.css';
import initializeAuth from "../src/Firebase/firebase.init";
import LoadingSpin from "react-loading-spin";


const Menu = lazy(() => import("./Components/Menu"));
const Header = lazy(() => import("./Components/Header"));
const Dashboard = lazy(() => import("./Screens/Dashboard.js"));
const ProjectList = lazy(() => import("./Screens/ProjectList.js"));
const CategoryProject = lazy(() => import("./Screens/CategoryProject.js"));
const Footer = lazy(() => import("./Components/Footer.js"));
const AlertDialogSlide = lazy(() => import("./Screens/AlertDialogSlide"));


function App() {
  const setTheme = useSelector(state => state.setTheme)
  // const setMenu = useSelector(state => state.setMenu)
  const getNetwork = useSelector(state => state.getNetwork)
  const dispatch = useDispatch();

  const web3auth = new Web3Auth({
    chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
    clientId: ClientId // get your clientId from https://developer.web3auth.io
  });
  useEffect(() => {
    // console.log("disconnected")
    dispatch({ type: SET_LOADING, payload: true })
    axios.get(Backendurl).then(resp => {

      // eslint-disable-next-line
      dispatch({ type: SET_PROJECT_DATA, payload: resp.data.filter(item => { if (item.approved === true) return item }).sort((a, b) => a.created_at > b.created_at ? -1 : 1) })
      // eslint-disable-next-line
      dispatch({ type: SET_PROJECT_DATA_DEFAULT, payload: resp.data.filter(item => { if (item.approved === true) return item }).sort((a, b) => a.created_at > b.created_at ? -1 : 1) })
      dispatch({ type: SET_LOADING, payload: false })
      axios.get(Backendurl + 'getCategory').then(resp2 => {

        dispatch({ type: SET_FORK_DATA, payload: resp2.data.fork })
        dispatch({ type: SET_NETWORK_DATA, payload: resp2.data.network })
        // Object.assign(resp2.data.fork,{fork:'All',state:true,_id:'',created_at:1})
        resp2.data.fork.unshift({ fork: 'All', state: true, _id: '', created_at: 1 })
        dispatch({ type: SET_CATEGORY_BTN, payload: resp2.data.fork })
        axios.get(Backendurl + 'getWhitelist').then(resp3 => {
          dispatch({ type: SET_WHITELIST_DATA, payload: resp3.data })

        })
      })

    });
  }, [dispatch]);

  // const initModal = async () => {
  //   await web3auth.initModal();
  //   const provider = await web3auth.connect();
  // }
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

  initializeAuth();
  return (
    <Suspense fallback={<div className='load'>
      <div className='sub-load'>
        <LoadingSpin />
      </div>
    </div>}>
      <div className="App">
        <AlertDialogSlide />
        <div className='body-main' >
          <Menu menu={menuList} />
          <div className='main-body' style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
            <Header />

            <Routes>

              <Route path='/' element={<Dashboard />} />

              <Route path={'/project/:id'} element={<ProjectList />} />
              <Route path={'/launches'} element={<CategoryProject />} />
              <Route path={'/explore'} element={<CategoryProject />} />
              {
                // eslint-disable-next-line
                menuList.map((item, index) => {
                  if (!item.submenu) return <Route key={index} path={item.link} element={item.component} />
                  else if (item.submenu) return item.label === 'Networks' ? getNetwork.map((item1, index1) => { return <Route key={index1} path={'networks/' + item1.network} element={<CategoryProject />} /> })
                    : item.submenu.map((item1, index1) => { return <Route key={index1} path={item1.link} element={item1.component} /> })
                })}
            </Routes>

          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

// function App(){
//   return(
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route  path='/admin' element={<Admin/>}/>
//           <Route  path='/' render={<Client/>}/>
//         </Routes>
//       </Router>

//     </div>
//   )
// }


export default App;
