import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { social_inks } from "../initialState";
import { useDispatch, useSelector } from 'react-redux';
import { SET_MENU } from "../actionTypes";
import { Bright_Theme, Dark_Theme } from "../Constants";
import MenuArrow from './Icons/MenuArrow';
import PiggyModal from './PiggyModal';
import infoWhiteImg from '../assets/icons/info_white.png'

const Menu = (props) => {
    const location = useLocation()
    const setTheme = useSelector(state => state.setTheme)
    const setMenu = useSelector(state => state.setMenu)
    const getNetwork = useSelector(state => state.getNetwork)
    const dispatch = useDispatch();

    const setFullMenu = () => {
        dispatch({ type: SET_MENU, payload: 'partmenu' })
    }
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newHeight = window.innerHeight;
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);
        if (windowWidth < 575) {
            dispatch({ type: SET_MENU, payload: 'partmenu' })
        }
        return () => window.removeEventListener("resize", updateWindowDimensions)

    }, [windowWidth]);

    return (
        <div style={{
            backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
            color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
            borderRight: '1px solid',
            borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border,
            width: setMenu == 'fullmenu' ? '230px' : '50px'
        }}>
            <PiggyModal />
            <div className="sidebar d-flex" style={{
                backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                width: setMenu == 'fullmenu' ? '240px' : '50px'
            }}>
                <div className="menu-icons" style={{ width: setMenu == 'fullmenu' ? '40px' : 0, zIndex: 1035 }}>
                    <div className=" defi-logo" style={{
                        backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        display: setMenu == 'fullmenu' ? 'block' : 'none'
                    }}>
                        <Link to='/' >
                            <div className="logo-div m-view-logo">
                                <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" />
                            </div>
                        </Link>
                        <div className="menu-button-mobile d-sm-none ml-2" onClick={() => setFullMenu()}>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                        </div>
                    </div>
                    {/* <nav className="navbar side-bar side-bar-icon" style={{
                        backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        display: setMenu == 'fullmenu' ? 'block' : 'none'
                    }}>
                        <ul className="navbar-nav navbar-body" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                            <div className="row-menu-img"></div>
                            {
                                props.menu.map((item, index) => {
                                    // console.log(item)
                                    return <div key={index} className={item.label === 'Networks' ? 'netIcons' : ''}> {index == 3 && <div className="row-menu-img"></div>}
                                        {
                                            !item.submenu ?
                                                <Link className="nav-link navbar-item arif-test" to={item.link} >

                                                    <div
                                                        className="menu-icons-cl"
                                                        title={item.label}
                                                        data-toggle="collapse"
                                                        data-target={'#' + item.label}
                                                        style={{
                                                            backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                                            color: setTheme == 'brightness' ? Dark_Theme.header_divBackground : Bright_Theme.header_divBackground
                                                        }}>
                                                        {
                                                            setTheme == 'brightness' ? item.brightImage : item.darkImage
                                                        }
                                                    </div>
                                                </Link>
                                                :
                                                <div className="nav-link navbar-item">
                                                    <div className="image-link" title={item.label} data-toggle="collapse" data-target={'#' + item.label} style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                                        {
                                                            setTheme == 'brightness' ? item.brightImage : item.darkImage
                                                        }
                                                    </div>
                                                </div>
                                        }
                                        {

                                            item.submenu ?
                                                <div
                                                    className={`sub-img-menu panel-collapse collapse`}
                                                    id={item.label}
                                                    style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                                    {
                                                        item.label == 'Networks' ? getNetwork.map((item1, index1) => {
                                                            return (
                                                                <Link to={'networks/' + item1.network} key={index1}> <img
                                                                    title={item1.network.toUpperCase()} className="menu-image menu-image-sub"
                                                                    src={'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png'} style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }} />
                                                                </Link>
                                                            )
                                                        })
                                                            :
                                                            item.submenu.map((item1, index1) => {
                                                                return (
                                                                    <Link
                                                                        to={item1.link} key={index1}>
                                                                        <img
                                                                            title={item1.label}
                                                                            className="menu-image menu-image-sub"
                                                                            src={item1.brightImage}
                                                                            style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, backgroundColor: 'white' }} />
                                                                    </Link>
                                                                )
                                                            })}
                                                </div> : <></>}
                                    </div>
                                })}
                        </ul>

                    </nav> */}
                </div>
                {
                    setMenu === 'partmenu' && <div className="menu-icons-sub" >
                        <div className=" defi-logo" style={{
                            backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        }}>
                            <Link to='/' >
                                <div className="logo-div">
                                    <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" />
                                </div>
                            </Link>
                        </div>
                        <nav className="navbar side-bar side-bar-icon" style={{
                            backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        }}>

                            <ul className="navbar-nav navbar-body" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                <div className="row-menu-img"></div>
                                {props.menu.map((item, index) => {
                                    return <div key={index} className={item.label === 'Networks' ? 'netIcons' : ''}>
                                        {/* {index == 3 && <div className="row-menu-img" ></div>} */}
                                        {!item.submenu ? <Link className={`nav-link navbar-item submenu-icon ${localStorage.getItem('mode') ? JSON.parse(localStorage.getItem('mode')) : 'darkness' === 'darkness' ? 'text-white' : 'text-dark'
                                            }`} to={item.link} >
                                            <div className="" title={item.label} data-toggle="collapse" data-target={'#' + item.label} style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                                {setTheme == 'brightness' ? item.brightImage : item.darkImage}
                                            </div>
                                        </Link> :
                                            <div className="nav-link navbar-item">
                                                <div className={`image-link ${localStorage.getItem('mode') ? JSON.parse(localStorage.getItem('mode')) : 'darkness' === 'darkness' ? 'text-white' : 'text-dark'
                                                    }`} title={item.label} data-toggle="collapse" data-target={'#' + item.label}
                                                    style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}
                                                    onClick={() => {
                                                        dispatch({ type: SET_MENU, payload: 'fullmenu' })
                                                    }}
                                                >
                                                    {setTheme == 'brightness' ? item.brightImage : item.darkImage}
                                                </div>
                                            </div>}

                                        {item.submenu ? <div className={`sub-img-menu panel-collapse collapse`} id={item.label} style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                            {item.label == 'Networks' ?
                                                getNetwork.map((item1, index1) => {
                                                    return <Link to={'networks/' + item1.network} key={index1}> <img title={item1.network.toUpperCase()} className="menu-image menu-image-sub" src={'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png'} style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }} /></Link>
                                                })
                                                : item.submenu.map((item1, index1) => {
                                                    return <Link to={item1.link} key={index1}>
                                                        <img title={item1.label} className="menu-image menu-image-sub" src={item1.brightImage} style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, backgroundColor: 'white' }} />
                                                    </Link>
                                                })}
                                        </div> : <></>}
                                    </div>
                                })}
                            </ul>
                        </nav>
                    </div>
                }


                <div className="menu-detail" style={{
                    minWidth: setMenu == 'fullmenu' ? '216px' : 0,
                    borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                }}>
                    <div className=" defi-logo menu-detal-logo" style={{
                        backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        display: setMenu == 'fullmenu' ? 'flex' : 'none',
                        justifyContent: 'space-around'
                    }}>
                        <Link to='/' >
                            <div className="logo-div">
                                <h4 className="defi-title" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                                <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" /> My website</h4>
                            </div>
                        </Link>
                        <Link to='/' >
                            <div className="logo-div d-block d-sm-none ml-2">
                                <img className="logo-image" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655655484/leoads/bitcoin_rtyc0c.png" />
                            </div>
                        </Link>
                        <div className="menu-button-mobile m-view" onClick={() => setFullMenu()}>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                            <div className="menu-button-line" style={{ backgroundColor: setTheme == 'brightness' ? Dark_Theme.header_divBackground : '#c7c9cc' }}></div>
                        </div>
                    </div>
                    <nav className="navbar side-bar navbar-sidebar pl-3 pt-0" style={{
                        paddingLeft: '0px', backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                        display: setMenu == 'fullmenu' ? 'block' : 'none'
                    }}>

                        <ul className="navbar-nav navbar-body" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                            <div className="row-menu" style={{
                                color: setTheme == 'brightness' ? Bright_Theme.fontColor_3 : Dark_Theme.fontColor_3,
                                borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                            }}>OVERVIEW</div>
                            {props.menu.map((item, index) => {
                                return <div key={index} className={item.label === 'Networks' || item.label === 'Upcoming Project' || item.label === 'Whitelists' || item.label === 'Rugs' || item.label === 'Dead Project' || item.label === 'Favorites' ? '' : 'label-name'}>
                                    {
                                        index == 3 && <div className="row-menu" style={{
                                            color: setTheme == 'brightness' ? Bright_Theme.fontColor_3 : Dark_Theme.fontColor_3,
                                            borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                                        }}
                                        >EXPLORER TOOLS</div>
                                    }
                                    {
                                        !item.submenu ?
                                            <Link className="nav-link navbar-item submenu-link p-1" to={item.link}>
                                                <div
                                                    style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}
                                                >
                                                    <li className="nav-item d-flex menu-label-name" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}
                                                        data-toggle="collapse" data-target={'#' + item.label}>
                                                        <p className="submenu-p">{
                                                            setTheme == 'brightness' ? item.brightImage : item.darkImage
                                                        } {item.label}</p>
                                                        {item.submenu ? <MenuArrow color={'#000000'} rotation={'rotate(90deg)'} /> : ''}
                                                    </li>
                                                </div>
                                            </Link> :
                                            <div className="nav-link navbar-item">
                                                <div className="sub-menu-li" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                                    <li className="nav-item d-flex menu-label-name" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}
                                                        data-toggle="collapse" data-target={'#' + item.label}>
                                                        <p className="m-0">
                                                            {setTheme == 'brightness' ? item.brightImage : item.darkImage} {item.label}
                                                        </p>
                                                        {item.submenu ? <MenuArrow color={'#000000'} rotation={'rotate(90deg)'} /> : ''}
                                                    </li>
                                                </div>
                                            </div>}
                                    {
                                        item.submenu ?
                                            <div className="sub-menu-div panel-collapse collapse" id={item.label} style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground }}>
                                                {
                                                    item.label === 'Networks' ?
                                                        getNetwork.map((item1, index1) => {
                                                            return (
                                                                <Link to={'networks/' + item1.network} key={index1}>
                                                                    <li className="nav-item sub-nav-item"
                                                                        style={{
                                                                            color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                                                        }}>
                                                                        <img
                                                                            title={item1.network.toUpperCase()} className="menu-image menu-image-sub"
                                                                            src={
                                                                                setTheme == 'brightness' ?
                                                                                    'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/info_black_momqfm.png' : infoWhiteImg} /> {item1.network}
                                                                    </li>
                                                                </Link>
                                                            )
                                                        })
                                                        :
                                                        item.submenu.map((item1, index2) => {
                                                            return (
                                                                <Link key={index2} to={item1.link}>
                                                                    <li className="nav-item sub-nav-item" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                                                                        {item1.label}
                                                                    </li>
                                                                </Link>
                                                            )
                                                        })
                                                }
                                            </div> : <></>
                                    }
                                </div>
                            })}
                        </ul>
                        {location.pathname.split('/')[1] != 'admin' && <div className="menu-footer" style={{
                            display: setMenu == 'fullmenu' ? 'block' : 'none',
                            backgroundColor: setTheme == 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground
                        }}>
                            <p>Join Fork Screener community</p>
                            <div className="d-flex menu-footer-div">
                                {social_inks.map((item, index) => {
                                    return <a key={index} href={item.link} target="_blank">
                                        <img className="menu-footer-image" src={setTheme == 'brightness' ? item.black_image : item.white_image} />
                                    </a>
                                })}
                            </div>
                            <div className="d-flex piggy-div">
                                <p className="piggy-text">Help us keep the Lights on!</p>
                                <img className="piggy-img" data-toggle="modal" data-target="#piggyModal" src={setTheme == 'brightness' ? 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/piggy_black_sq4nr8.png' :
                                    'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/piggy_white_ximtvn.png'} />
                            </div>
                        </div>
                        }
                    </nav>
                </div>
            </div>
        </div>

    )
}
export default Menu;