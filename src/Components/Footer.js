import React from "react";
import { useSelector } from 'react-redux';
// import { useMoralis } from "react-moralis";
// import { Web3Auth } from "@web3auth/web3auth";
// import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
// import { SET_THEME, SET_MENU, SET_PROJECT_DATA, SET_LOGIN, SET_CATEGORY_BUTTON } from "../actionTypes";
import { Bright_Theme, Dark_Theme, } from "../Constants";
import './Footer.css'



const Footer = () => {

    const setTheme = useSelector(state => state.setTheme)

    return (
        <div className="footer-bar" style={{
            backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
            borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
        }}>
            <div className="footer-title-div">
                <h5 className="first-h5">About us</h5>
                <h5 className="mid-h5">Terms Conditions</h5>
                <h5 className="last-h5">Legal</h5>
            </div>
            <div className="footer-link-div">
                <a href="mailto:info@forkscreener.com" target="blank" style={{ marginRight: '5px' }}>info@forkscreener.com</a>
                <p className="mid-footerlink-text" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    |</p>
                <h5 style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    For Ads : </h5>
                <a href="mailto:Marketing@forkscreener.com" style={{marginLeft: '4px'}} target="blank"> Marketing@forkscreener.com</a>
            </div>
            <div className="copyright-heart-block">
                <div className="copyright-div">
                    <p style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, margin: 0 }}>
                        &copy; ForkScreener.com - 2023 </p>
                    <p className="mid-copyright-text" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, marginRight: '2px' }}>| </p>
                    <p style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, marginLeft: '4px' }}>
                        All Rights Reserved</p>
                </div>
                <div className="footer-heart">
                    <div className="heart-div d-flex">
                        <p style={{ color: setTheme === 'brightness' ? '#999999' : '#888888', margin: 0 }}>Made with </p>
                        <img alt="" className="heart-img" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/heart_heryak.png" />
                        <p className="" style={{ color: setTheme === 'brightness' ? '#999999' : '#888888', margin: 0 }}>
                            by &nbsp;
                            <span className="bold-font" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>DefiJango&nbsp;</span>
                            team
                            <span className="bold-font" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>&nbsp;v1.1</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="copyright-heart-block-mobile">

                <div className="footer-heart">
                    <div className="">
                        <p style={{ color: setTheme === 'brightness' ? '#999999' : '#888888', margin: 0 }}>Made with </p>
                        <img alt="" className="heart-img" src="https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/heart_heryak.png" />
                        <p className="" style={{ color: setTheme === 'brightness' ? '#999999' : '#888888', margin: 0 }}>
                            by &nbsp;
                            <span className="bold-font" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>DefiJango&nbsp;</span>
                            team
                            <span className="bold-font" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>&nbsp;v1.1</span>
                        </p>
                    </div>
                </div>
                <div className="copyright-div">
                    <p style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, margin: 0 }}>
                        ©ForkScreener.com - 2023  </p>
                    <p className="mid-copyright-text" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, margin: 0 }}>
                        | </p>
                    <p style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color, margin: 0 }}>
                        All Rights Reserved</p>
                </div>
            </div>


        </div>
    )
}
export default Footer;