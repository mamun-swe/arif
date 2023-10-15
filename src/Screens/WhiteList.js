import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Backendurl, Bright_Theme, Dark_Theme } from "../Constants";
import { PROJECT_CATEGORY, SET_CATEGORY_BTN } from "../actionTypes";
import './WhiteList.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const WhiteList = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const getProjectData = useSelector(state => state.setProjectData)
    const getCategoryBtn = useSelector(state => state.setCategory_btn)
    const getWhitelist = useSelector(state => state.getWhitelist)
    const getCategory = useSelector(state => state.getCategory)
    const navigate = useNavigate();

    useEffect(() => {
        let a = getCategory
        a.forEach(item => {
            return item.state = false
        })
        dispatch({ type: SET_CATEGORY_BTN, payload: a })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, getProjectData, getCategoryBtn]);

    const setTheme = useSelector(state => state.setTheme)

    const onFearDateBtn = (num) => {
        dispatch({ type: PROJECT_CATEGORY, payload: num })
        let a = getCategory
        a.forEach(item => {
            item.state = false
        });
        a[num].state = true
        dispatch({ type: SET_CATEGORY_BTN, payload: a })
        navigate("/explore", { replace: false });
    }

    const [intervalTop, setIntervalTop] = useState(2000);
    const [intervalBottom, setIntervalBottom] = useState(2000);
    const [enableTopSlide, setEnableTopSlide] = useState('');
    const [enableBottomSlide, setEnableBottomSlide] = useState('');
    const [headerBanner, setHeaderBanner] = useState({})



    useEffect(() => {
        fetch(`${Backendurl}getLandingPageAds`)
            .then(res => res.json())
            .then(data => {
                const topSliders = data.find(item => item.category === 'whitelist' && item.position === 'Top');
                const bottomSliders = data.find(item => item.category === 'whitelist' && item.position === 'Bottom');

                const headerbanner = data.find(item => item.category === 'headerBanner' && item.position === 'Top');

                setHeaderBanner(headerbanner)


                setEnableTopSlide(topSliders?.enable)
                setEnableBottomSlide(bottomSliders?.enable)

                setIntervalTop(topSliders?.interval)
                setIntervalBottom(bottomSliders?.interval)
                localStorage.setItem('whiteListImgTop', JSON.stringify(
                    topSliders?.adsGallery))
                localStorage.setItem('whiteListImgBottom', JSON.stringify(
                    bottomSliders?.adsGallery))

            })
    }, [])

    console.log(setTheme)
    return (
        <div className="main-board"
            style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
            <div className="board-title">
                <h5 className="title" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    {location.pathname.split('/')[1] != "" ? location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) : 'Dashboard'}
                </h5>
                <div className="category-div">
                    {getCategory.map((item, index) => {
                        return <button key={index} className="category-button" onClick={() => onFearDateBtn(index)}
                            style={{
                                backgroundColor: item.state ? setTheme == 'brightness' ? '#c3c3c3' : '#555555' : setTheme == 'brightness' ? '#ffffff' : '#111827',
                                color: setTheme == 'brightness' ? '#333333' : '#ffffff',
                                borderColor: setTheme == 'brightness' ? '#f1f1f1' : '#333333'
                            }}>{item.fork}
                        </button>
                    })}
                </div>
            </div>

            <div className="advertisement" style={{
                backgroundColor: setTheme == 'brightness' ? 'white' : Dark_Theme.cardBackground,
                borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>
                {
                    headerBanner?.adsGallery?.map((item, index) => (
                        <a href={item.adLink} target="_blank" rel="noreferrer">
                            <img className="" key={index} src={item.url} alt="" />
                        </a>
                    ))
                }
            </div>

            <div className="board-main-project-detail"
                style={{
                    backgroundColor: setTheme == 'brightness' ? '#f4f5f5' : Dark_Theme.divBackground,
                    color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                }}>
                <div className="project-deatil" style={{
                    backgroundColor: setTheme == 'brightness' ? 'white' : Dark_Theme.divBackground,
                    color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                }}>
                    <div className="review-body">
                        <div className="row review-write-body">
                            {/* Left part */}
                            <div className="col-sm-12 col-lg-8">
                                <div>
                                    <h3 className="white-list-title">WHITELIST</h3>
                                    <p className="white-list-description">Current list of ICOs where Whitelist is active. Registation is required for participation.</p>
                                </div>
                                <div className="row site-main">
                                    <div className="col-12 col-sm-12 col-lg-8">
                                        {
                                            getWhitelist.map((item, index) => (
                                                <div className="whiteico" key={index}>
                                                    <div id="whitelist_ico" className="">
                                                        <div className="whtico-row">
                                                            <div className="white_ico-icon">
                                                                <a id="ccc" href="https://icodrops.com/themis/" rel="bookmark" data-id="46013">
                                                                    <img src={item.image} className="attachment-thumbnail" alt="" loading="lazy" />
                                                                </a>
                                                            </div>
                                                            <div className="white_info">
                                                                <h3><a href="https://icodrops.com/themis/" rel="bookmark">{item.project}</a> </h3>

                                                                <span className="white-ico-category-name">{item.network}</span>
                                                                <span className="white-ico-category-name">Protocol</span>
                                                            </div>
                                                            <div className="whitelist_date ">
                                                                {item.whitelist ? 'Open' : 'Close'}
                                                            </div>
                                                            <div className="whitelist_meta_icon">
                                                            </div>
                                                            <div id="white_join">
                                                                {
                                                                    item.website && <a href={item.website} target="_blank">{item.website != '' ? 'JOIN NOW' : ''}  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        style={{ display: item.website !== '' ? 'inherit' : 'none' }}
                                                                        height="20px" width="20px" viewBox="0 0 24 24" className="new-window">
                                                                        <path d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">

                                                                        </path>
                                                                    </svg>
                                                                    </a>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="col-12 col-sm-12  col-lg-4">
                                        <div className="add-block-whitelist-mobile">
                                            <div className="sticky-top" style={{ width: '100%', height: 'auto' }}>

                                                {
                                                    enableTopSlide === 'Enable' && <AutoplaySlider
                                                        play={true}
                                                        cancelOnInteraction={false}
                                                        interval={intervalTop}
                                                        mobileTouch={true}
                                                        bullets={false}
                                                        organicArrows={false}
                                                        className="ad-image padding-v-15"
                                                    >

                                                        {
                                                            localStorage.getItem('whiteListImgTop') ? JSON.parse(localStorage.getItem('whiteListImgTop')).map((item, index) => (
                                                                <div className="w-100" key={index}>
                                                                    <a href={item.adLink}>
                                                                        <img className="w-100" src={item.url} alt="" />
                                                                    </a>
                                                                </div>
                                                            )) : []
                                                        }
                                                    </AutoplaySlider>
                                                }


                                                {
                                                    enableBottomSlide === 'Enable' && <AutoplaySlider
                                                        play={true}
                                                        cancelOnInteraction={false}
                                                        interval={intervalBottom}
                                                        mobileTouch={true}
                                                        bullets={false}
                                                        organicArrows={false}
                                                        className="ad-image padding-v-15"
                                                    >
                                                        {
                                                            localStorage.getItem('whiteListImgBottom') ? JSON.parse(localStorage.getItem('whiteListImgBottom')).map((item, index) => (
                                                                <div className="w-100" key={index}>
                                                                    <a href={item.adLink}>
                                                                        <img className="w-100" src={item.url} alt="" />
                                                                    </a>
                                                                </div>
                                                            )) : []
                                                        }
                                                    </AutoplaySlider>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table className="table other-table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Projects</th>
                                            <th>Network</th>
                                            <th>whitelist</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getWhitelist.map((item, index) => (
                                            <tr key={index}
                                                style={{ borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}
                                            >
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img className="list-image" src={item.image} alt="" />
                                                                </td>
                                                                <td>{item.project}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>{item.network}</td>
                                                <td>{item.whitelist ? 'Open' : 'Close'}</td>
                                                <td className="last-td">
                                                    {
                                                        item.website && <a href={item.website} target='_blank' className="d-flex">
                                                            <span style={{ color: '#326dec' }}>{item.website != '' ? 'JOIN NOW' : ''}
                                                            </span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ display: item.website != '' ? 'block' : 'none' }}
                                                                height="20px" width="20px" viewBox="0 0 24 24" className="new-window">
                                                                <path d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">

                                                                </path>
                                                            </svg>
                                                        </a>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Right part */}
                            <div className="col-md-6 col-lg-4">
                                <div className="add-block-whitelist">
                                    <div className="sticky-top" style={{ width: '100%', height: '711px' }}>
                                        {
                                            enableTopSlide === 'Enable' && <AutoplaySlider
                                                play={true}
                                                cancelOnInteraction={false}
                                                interval={2000}
                                                mobileTouch={true}
                                                bullets={false}
                                                organicArrows={false}
                                                className="ad-image padding-v-15"
                                            >
                                                {
                                                    localStorage.getItem('whiteListImgTop') ? JSON.parse(localStorage.getItem('whiteListImgTop')).map((item, index) => (
                                                        <div className="w-100" key={index}>
                                                            <a href={item.adLink}>
                                                                <img className="w-100" src={item.url} alt="" />
                                                            </a>
                                                        </div>
                                                    )) : []
                                                }
                                            </AutoplaySlider>
                                        }

                                        {
                                            enableBottomSlide === 'Enable' && <AutoplaySlider
                                                play={true}
                                                cancelOnInteraction={false}
                                                interval={1500}
                                                mobileTouch={true}
                                                bullets={false}
                                                organicArrows={false}
                                                className="ad-image padding-v-15"
                                            >
                                                {
                                                    localStorage.getItem('whiteListImgBottom') ? JSON.parse(localStorage.getItem('whiteListImgBottom')).map((item, index) => (
                                                        <div className="w-100" key={index}>
                                                            <a href={item.adLink}>
                                                                <img className="w-100" src={item.url} alt="" />
                                                            </a>
                                                        </div>
                                                    )) : []
                                                }
                                            </AutoplaySlider>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhiteList;