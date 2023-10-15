import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import ForkCard from "../Components/ForkCard"
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT_CATEGORY, SET_CATEGORY_BTN } from "../actionTypes";
import { Backendurl, Bright_Theme, Dark_Theme } from "../Constants";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
// import axios from "axios";
import LoadingSpin from "react-loading-spin";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const CategoryProject = () => {
    const location = useLocation();
    const dispatch = useDispatch()

    const getProjectData = useSelector(state => state.setProjectData)
    const getCategory = useSelector(state => state.getCategory)
    const [getUpcoming, setUpcoming] = useState(getProjectData)
    const getLoading = useSelector(state => state.setLoading)
    const getSelNum = useSelector(state => state.setCategory_list)
    const getCategoryBtn = useSelector(state => state.setCategory_btn);


    const getDate = (timestamp) => {
        var time = new Date(timestamp * 1000)
        var date = time.getDate()
        var nowTime = new Date();
        return date - nowTime.getDate()
    }
    useEffect(() => {
        let titleText = location.pathname.split('/')[1]

        let currentDate = new Date().getTime() / 1000

        switch (titleText) {
            case 'featuredProject': setUpcoming(
                // eslint-disable-next-line
                [...getProjectData.filter(item => item.featured)]); break
            case 'hotProjectList': setUpcoming(
                // eslint-disable-next-line
                [...getProjectData.filter(item => item.featured && item.hot)]); break
            case 'deadProject': setUpcoming(
                // eslint-disable-next-line
                [...getProjectData.filter(item => item.dead)]); break

            case 'upcomingProject': setUpcoming(
                // eslint-disable-next-line
                [...getProjectData.filter(item => {
                    if (getDate(item.launchDate) >= 0) {
                        return item
                    }

                })]); break
            case 'networks': setUpcoming(
                // eslint-disable-next-line
                [...getProjectData.filter(item => {
                    if (location.pathname.split('/')[2].toLowerCase() === item.network.toLowerCase())
                        return item
                })]); break
            // eslint-disable-next-line
            case 'hot_project_list': setUpcoming([...getProjectData.filter(item => { if (item.hot && item.ruged != true && item.dead != true) return item })]); break

            case 'explore':
                setUpcoming([...getProjectData]); break
            // eslint-disable-next-line
            default: setUpcoming([...getProjectData.filter(item => {
                // eslint-disable-next-line
                switch (titleText) {
                    case 'upcoming_project': if (item.launchDate > currentDate) return item; break
                    case 'rugs': if (item.ruged) return item; break
                    case 'dead_project': if (item.dead) return item; break
                    case 'featured_project': if (item.featured) return item; break
                    case 'favorites': if (item.watchlist === true) return item; break
                    case 'launches': if (getDate(item.launchDate) <= 2 && getDate(item.launchDate) >= -2) {
                        return item.featured
                    }; break
                }
            })]); break
        }
        // eslint-disable-next-line
    }, [location, CategoryProject, getProjectData, getCategoryBtn, getCategory, setUpcoming]);

    const getPageTitle = () => {
        let a = location.pathname.split('/')[1]
        switch (a) {
            case 'featuredProject':
                return 'Featured Project';
            case 'hotProjectList':
                return 'Hot Project List';
            case 'networks':
            case 'Cronos':
                return 'Networks-Cronos';
            case 'networks':
            case 'BSC':
                return 'Networks-BSC';
            case 'networks':
            case 'Avax':
                return 'Networks-Avax';
            case 'upcomingProject':
                return 'Upcoming Project';
            case 'whitelists':
                return 'Whitelists';
            case 'rugs':
                return 'Rugs';
            case 'deadProject':
                return 'Dead Project';
            case 'favorites':
                return 'Favorites';
            default:
                return a;
        }

    }

    const onFearDateBtn = (num) => {
        dispatch({ type: PROJECT_CATEGORY, payload: num })
        let a = getCategory
        a.forEach(item => {
            item.state = false
        });
        a[num].state = true
        dispatch({ type: SET_CATEGORY_BTN, payload: a })
    }
    const setTheme = useSelector(state => state.setTheme)

    const [intervalTop, setIntervalTop] = useState(2000);
    const [intervalBottom, setIntervalBottom] = useState(2000);
    const [enableTopSlide, setEnableTopSlide] = useState('');
    const [enableBottomSlide, setEnableBottomSlide] = useState('');
    const [headerBanner, setHeaderBanner] = useState({})


    useEffect(() => {
        fetch(`${Backendurl}getLandingPageAds`)
            .then(res => res.json())
            .then(data => {
                const topSliders = data.find(item => item.category === 'featured' && item.position === 'Top');
                const bottomSliders = data.find(item => item.category === 'featured' && item.position === 'Bottom');

                const headerbanner = data.find(item => item.category === 'headerBanner' && item.position === 'Top');

                setHeaderBanner(headerbanner)

                setEnableBottomSlide(topSliders?.enable)
                setEnableTopSlide(bottomSliders?.enable)

                setIntervalTop(topSliders?.interval)
                setIntervalBottom(bottomSliders?.interval)
                localStorage.setItem('featuredImgTop', JSON.stringify(
                    topSliders?.adsGallery))
                localStorage.setItem('featuredImgBottom', JSON.stringify(
                    bottomSliders?.adsGallery))

            })
    }, [])

    return (
        <div className="main-board" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
            <div className="board-title">
                <h5 className="title" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    {
                        getPageTitle()
                    }
                </h5>

                <div className="category-div" >
                    {getCategory.map((item, index) => {
                        return <button key={index} className="category-button" onClick={() => onFearDateBtn(index)}
                            style={{
                                backgroundColor: item.state ? setTheme === 'brightness' ? '#c3c3c3' : '#555555' : setTheme === 'brightness' ? '#ffffff' : '#111827',
                                color: setTheme === 'brightness' ? '#333333' : '#ffffff',
                                borderColor: setTheme === 'brightness' ? '#f1f1f1' : '#333333'
                            }}>{item.fork}
                        </button>
                    })}
                </div>
            </div>
            <div className="advertisement" style={{
                backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>
                {
                    headerBanner?.adsGallery?.map((item, index) => (
                        <a href={item.adLink} target="_blank">
                            <img className="" key={index} src={item.url} alt="" />
                        </a>
                    ))
                }

                {/* <TopAds title={"defi"} description={"project"} /> */}
            </div>

            <div className="board-main " style={{ backgroundColor: setTheme === 'brightness' ? '#efefef' : '#101624' }}>
                <div className="ad-board-project">
                    <div className=" sticky-top ad-board-project-content" >
                        {
                            enableTopSlide === 'Enable' &&
                            <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false}
                                interval={intervalTop}
                                animation="cubeAnimation"
                                mobileTouch={true}
                                bullets={false}
                                organicArrows={false}
                                className="ad-project-image"
                            >
                                {
                                    localStorage.getItem('featuredImgTop') ? JSON.parse(localStorage.getItem('featuredImgTop')).map((item, index) => (
                                        <div className="w-100" key={index}>
                                            <a href={item.adLink}>
                                                <img className="w-100" src={item.url} />
                                            </a>
                                        </div>
                                    )) : []
                                }
                            </AutoplaySlider>
                        }

                        {
                            enableBottomSlide === 'Enable' &&
                            <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false}
                                interval={intervalBottom}
                                animation="cubeAnimation"
                                mobileTouch={true}
                                bullets={false}
                                organicArrows={false}
                                className="ad-project-image"
                            >
                                {
                                    localStorage.getItem('featuredImgBottom') ? JSON.parse(localStorage.getItem('featuredImgBottom')).map((item, index) => (
                                        <div className="w-100" key={index}>
                                            <a href={item.adLink}>
                                                <img className="w-100" src={item.url} />
                                            </a>
                                        </div>
                                    )) : []
                                }
                            </AutoplaySlider>}
                    </div>
                </div>

                {getLoading ? <div className={"ExampleOfUsage"}>
                    <div className='loading'><LoadingSpin /></div>
                </div> :
                    <div className="container">
                        <div className="project-items row">
                            {
                                // eslint-disable-next-line
                                getUpcoming.map((item, index) => {
                                    // eslint-disable-next-line
                                    if (!getSelNum && getSelNum === 0 || item.fork.toLowerCase() === getCategory[getSelNum].fork.toLowerCase()) return <div key={index} className="card-div" >
                                        <ForkCard
                                            // onWatchList={onWatchList}
                                            avata={item.image}
                                            featured={item.featured}
                                            title={item.forkName}
                                            chain={item.network}
                                            text={item.description}
                                            launchDate={item.launchDate}
                                            socialData={item.socialData}
                                            ruged={item.ruged}
                                            dead={item.dead}
                                            checkValue={item.checkValue}
                                            id={item._id}
                                            watchlist={item.watchlist}
                                            projectLink={'/project/' + index}
                                            functionalityData={item.functionalityData} />
                                    </div>
                                })}
                            {
                                // eslint-disable-next-line
                                (getUpcoming.length === 0 || getUpcoming.filter(item => {
                                    if (!getSelNum && getSelNum === 0 || item.fork.toLowerCase() === getCategory[getSelNum].fork.toLowerCase()) return item
                                }).length === 0) && <div className="no-data">
                                    <h3 style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                                        {"There is no data."}
                                    </h3>
                                </div>}
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
export default CategoryProject;