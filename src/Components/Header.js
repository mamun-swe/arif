import React, { useState, useEffect, useCallback, } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// import { useMoralis } from "react-moralis";
// import { Web3Auth } from "@web3auth/web3auth";
// import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import {
    SET_THEME, SET_MENU, SET_PROJECT_DATA,
    SET_LOGIN_USER,
    SET_LOGIN, SET_CATEGORY_BUTTON,
} from "../actionTypes";
import { Bright_Theme, Dark_Theme, ClientId } from "../Constants";
// import { category_buttons } from "../initialState";
import AddForkModal from './AddForkModal';
import LoadingSpin from "react-loading-spin";


const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    // const { account } = useMoralis();
    const { account } = {};
    // const setLoginUser = useSelector(state => state.setLoginUser)
    // const [, setWalletAddress] = useState('')
    const [headerSignBtn, getHeaderSignBtn] = useState('Sign in')
    const [getForkModal, setForkModal] = useState(false)
    const [getLoading] = useState(false)
    const [getSaveModal, setSaveModal] = useState(false)
    const [getSaveModalFlag, setSaveModalFlag] = useState(false)

    // eslint-disable-next-line
    let getModal_f = false
    const [getSignBtn, setSignBtn] = useState(false)
    const navigate = useNavigate();
    const setTheme = useSelector(state => state.setTheme)
    const setMenu = useSelector(state => state.setMenu)
    const setModal = useSelector(state => state.setLogin)
    // const getCategoryBtn = useSelector(state => state.setCategory_btn)
    const setDefaultProjectData = useSelector(state => state.setDefaultProjectData)

    // const web3auth = new Web3Auth({
    //     chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
    //     clientId: ClientId
    // });
    const initModal = useCallback(async () => {
        // console.log("==>",getSaveModalFlag)
        // await web3auth.initModal();
        // await web3auth.connect()
        // console.log(getSaveModalFlag)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // setWalletAddress(account)
        // console.log(account)
        if (!setModal.reconnected) { getHeaderSignBtn('Sign in') }
        else if (setModal.reconnected) { getHeaderSignBtn('Signed') }
    }, [setModal]);

    
    useEffect(() => {
        if (getSaveModalFlag) {
            console.log('Line 62', getSaveModalFlag)
            if (setModal.reconnected !== true) { initModal() }
            else if (setModal.reconnected) { setSaveModal(true); setSaveModalFlag(false) }
        }
    }, [getSaveModalFlag, initModal, setModal.reconnected]);

    const setBrightDark = () => {
        localStorage.setItem('mode', JSON.stringify(setTheme === 'brightness' ? 'darkness' : 'brightness'))
        dispatch({ type: SET_THEME, payload: setTheme === 'brightness' ? 'darkness' : 'brightness' })
    }

    const setFullMenu = () => {
        dispatch({ type: SET_MENU, payload: setMenu === 'fullmenu' ? 'partmenu' : 'fullmenu' })
    }

    const handleConnectWallet = async () => {
        // if (localStorage.getItem('login-user')) { console.log('alsdflaksd'); setSaveModal(true); }
        // else { console.log('13215454'); initModal() }
        // setSaveModal(true);
    }

    const closeModal = () => {
        getModal_f = false
        setForkModal(false)
    }

    const addFork = async () => {
        setForkModal(true)
        setSaveModal(false)
    }
    const authentication = () => {
        if (localStorage.getItem('login-user')) { console.log('alsdflaksd'); setSaveModal(true); }
        else { console.log('13215454'); setSaveModalFlag(true) }
        //setSaveModalFlag(true);     
        //// setSaveModal(true) 
    }


    // web3auth.on(ADAPTER_EVENTS.CONNECTED, (adapterName) => {
    //     dispatch({ type: SET_LOGIN, payload: adapterName })
    //     // console.log(getSaveModalFlag)
    //     setSaveModal(true);
    //     setSaveModalFlag(false)
    //     // if (getSaveModalFlag) {
    //     //     setSaveModal(true);
    //     //     setSaveModalFlag(false)
    //     // }
    //     // setSaveModalFlag(true)
    //     console.log('Line 106', getSaveModalFlag)
    //     console.log("connected to wallet", adapterName, web3auth.provider)
    // })
    // web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    //     console.log("connecting")
    //     // closeModal()

    // })
    // web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    //     console.log("disconnected")
    // })
    // web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    //     console.log("errored", error)
    // })

    const onSignMenu = () => {
        setSignBtn(!getSignBtn)
    }



    const onExplorer = () => {

        dispatch({ type: SET_CATEGORY_BUTTON, payload: true })
    }

    const onLoginout = () => {

        dispatch({ type: SET_LOGIN_USER, payload: false })
        localStorage.setItem('login-user', '')
        navigate("/login", { replace: false });
    }

    const onSearch = (e) => {
        // console.log(setDefaultProjectData)
        let val
        if (e.target.value === "") val = setDefaultProjectData
        // eslint-disable-next-line
        else val = setDefaultProjectData.filter((item) => { if (item.forkName.toLowerCase().includes(e.target.value)) return item })
        // console.log(val)
        dispatch({ type: SET_PROJECT_DATA, payload: val })
    }

    return (
        <div className="header-bar" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
            {getLoading && <div className={"modal-loading"}>
                <div className='loading'>
                    <LoadingSpin />
                </div>
            </div>}

            <AddForkModal
                walletAddress={account}
                setModal={getForkModal}
                data={{ item: {} }}
                isEditModal={false}
                getSaveModal_f={getSaveModal}
                closeModal={() => closeModal()}
                authentication={() => authentication()}
            />

            <div className="menu-button" onClick={() => setFullMenu()}>
                <div className="menu-button-line" style={{ backgroundColor: setTheme === 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                <div className="menu-button-line" style={{ backgroundColor: setTheme === 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                <div className="menu-button-line" style={{ backgroundColor: setTheme === 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
            </div>
            <div className="defi-logo-tablet-view">
                <a href="/">
                    <div className="logo-div">
                        <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" />
                    </div>
                </a>
            </div>
            <input className="search-input"
                placeholder="Search..."
                onChange={onSearch}
                style={{
                    backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                    color: setTheme === 'brightness' ? '#323232' : '#e6e6e6',
                    backgroundImage: setTheme === 'brightness' ? "url('https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/search_black_m2hdr2.png')" : "url('https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/search_white_qjsds9.png')"
                }} />
            <div className="defi-logo-mobile-view">
                <a href="/">
                    <div className="logo-div">
                        <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" />
                    </div>
                </a>
            </div>

            {/* <button className="explore-btn " 
                    // disabled={location.pathname.split('/')[1]==""?true:false} 
                    onClick={()=>onExplorer()}
                    style={{backgroundColor:setTheme=='brightness'?'white':'#1d2432', 
                            // cursor:location.pathname.split('/')[1]==""?'no-drop':'pointer',
                            color:setTheme=='brightness'?'#007bff':'white'}}>
                        Explore
            </button> */}

            {location.pathname.split('/')[1] !== 'admin' && <Link className="explore-btn" onClick={() => onExplorer()} style={{ color: setTheme === 'brightness' ? '#007bff' : 'white' }} to="explore">Explore</Link>}
            {location.pathname.split('/')[1] !== 'admin' && <Link className="launch-btn" style={{ color: setTheme === 'brightness' ? '#007bff' : 'white' }} to="launches">Launches</Link>}
            {location.pathname.split('/')[1] !== 'admin' && <Link className="whitelist-btn" style={{ color: setTheme === 'brightness' ? '#007bff' : 'white' }} to="whitelists">Whitelists</Link>}
            <button className="btn btn-primary add-fork" onClick={() => addFork()}>
                Add fork
            </button>
            {localStorage.getItem('login-user') && location.pathname.split('/')[1] === 'dappdefi' && <button className="btn btn-danger  add-fork-1" onClick={() => onLoginout()}>
                Logout
            </button>}
            {
            location.pathname.split('/')[1] === 'dappdefi' && !localStorage.getItem('login-user') &&
                <button className="btn write-review"
                    // disabled={setModal ? true : false}
                    onClick={() => handleConnectWallet()}
                    style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}
                >
                    {headerSignBtn}
                </button>
            }

            {location.pathname.split('/')[1] !== 'admin' && <div className="signin-menu-button" onClick={() => onSignMenu()} data-toggle="collapse" data-target='#header-sub-menu'
                style={{
                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                    borderColor: setTheme === 'brightness' ? '#aba9a9' : Dark_Theme.font_color,
                    backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.header_divBackground
                }}>
                S
            </div>}
            <div className="sub-menu panel-collapse collapse" id='header-sub-menu'
                style={{
                    borderColor: setTheme === 'brightness' ? '#d5d5d5' : '#2a2a2a',
                    backgroundColor: setTheme === 'brightness' ? 'white' : '#111827'
                }}>
                <button className="btn add-fork-drop" onClick={() => addFork()}
                    style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    Add fork
                </button>
                {
                    location.pathname.split('/')[1] === 'dappdefi' && !localStorage.getItem('login-user') && <button className="btn write-review-drop"
                        onClick={() => handleConnectWallet()}
                        style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                        {headerSignBtn}
                    </button>
                }

                <Link className="explore-btn-drop" onClick={() => onExplorer()} style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }} to="/explore">Explore</Link>
                <Link className="launch-btn-drop" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }} to="/launches">Launches</Link>
                <Link className="whitelist-btn-drop" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }} to="/whitelists">Whitelists</Link>

            </div>

            <img alt="" className="theme-icon" onClick={() => setBrightDark()} src={setTheme === 'brightness' ? "../images/icons/dark_black.png" : "../images/icons/bright_white.png"} />
        </div>
    )
}
export default Header;