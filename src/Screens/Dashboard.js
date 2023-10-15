import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import ForkCard from "../Components/ForkCard"
import ProjectCard from "../Components/ProjectCard";
import { useDispatch, useSelector } from 'react-redux';
import { SET_CATEGORY_BUTTON, } from "../actionTypes";
import { Backendurl, Bright_Theme, Dark_Theme, } from "../Constants";
import LoadingSpin from "react-loading-spin";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';


const AutoplaySlider = withAutoplay(AwesomeSlider);

const Dashboard = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    const getProjectData = useSelector(state => state.setProjectData)
    const getLoading = useSelector(state => state.setLoading)
    useEffect(() => {
        dispatch({ type: SET_CATEGORY_BUTTON, payload: false })
    }, [dispatch])

    const getHotProjectData = () => {
        // eslint-disable-next-line
        let a = getProjectData.filter((item) => { if (item.hot === true) return item })
        return a
    }

    const getTrendingProjectData = () => {
        // eslint-disable-next-line
        let a = getProjectData.filter((item) => { if (item.trending === true) return item })
        return a
    }

    const getRatedProjectData = () => {
        // eslint-disable-next-line
        let a = getProjectData.filter((item) => { if (item.top === true) return item })
        return a
    }

    const [topInterVal, setTopInterval] = useState(1000);
    const [bottomInterVal, setBottomInterval] = useState(1000);
    const [enableTopSlide, setEnableTopSlide] = useState('');
    const [enableBottomSlide, setEnableBottomSlide] = useState('');
    const [headerBanner, setHeaderBanner] = useState({})

    useEffect(() => {
        fetch(`${Backendurl}getLandingPageAds`)
            .then(res => res.json())
            .then(data => {
                const bottomSliders = data.find(item => item.category === 'landingPage' && item.position === 'Bottom');
                const topSliders = data.find(item => item.category === 'landingPage' && item.position === 'Top');
                const headerbanner = data.find(item => item.category === 'headerBanner' && item.position === 'Top');

                setHeaderBanner(headerbanner)

                setTopInterval(bottomSliders?.interval)
                setBottomInterval(bottomSliders?.interval)

                setEnableBottomSlide(topSliders?.enable)
                setEnableTopSlide(topSliders?.enable)
                localStorage.setItem('topLandingImg', JSON.stringify(topSliders.adsGallery))
                localStorage.setItem('bottomLandingImg', JSON.stringify(bottomSliders.adsGallery))
            })
    }, [])


    return (
        <div className="main-board" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>

            <div className="board-title">
                <h5 className="title" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    {location.pathname.split('/')[1] !== "" ?
                        location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) : 'Dashboard'}
                </h5>
            </div>
            <div className="advertisement"
                style={{
                    backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                    borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                }}>
                {
                    headerBanner?.adsGallery?.map((item, index) => (
                        <a href={item.adLink} target="_blank" key={index} >
                            <img className="" src={item.url} alt="" />
                        </a>
                    ))
                }
            </div>
            <div className="">
                <div className="board-main" style={{ backgroundColor: setTheme === 'brightness' ? '#efefef' : '#101624' }}>
                    <div className="card-div " >
                        {
                            enableTopSlide === 'Enable' && <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false}
                                interval={topInterVal}
                                animation="cubeAnimation"
                                mobileTouch={true}
                                bullets={false}
                                organicArrows={false}
                            >
                                {
                                    localStorage.getItem('topLandingImg') ? JSON.parse(localStorage.getItem('topLandingImg')).map((item, index) => (
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
                            <a href="#">
                                <AutoplaySlider
                                    play={true}
                                    cancelOnInteraction={false}
                                    interval={bottomInterVal}
                                    animation="cubeAnimation"
                                    mobileTouch={true}
                                    bullets={false}
                                    organicArrows={false}
                                    className="mt-2"
                                >
                                    {
                                        localStorage.getItem('bottomLandingImg') ? JSON.parse(localStorage.getItem('bottomLandingImg')).map((item, index) => (
                                            <div className="w-100" key={index}>
                                                <a href={item.adLink}>
                                                    <img className="w-100" src={item.url} />
                                                </a>
                                            </div>
                                        )) : []
                                    }
                                </AutoplaySlider>
                            </a>
                        }
                    </div>

                    <div className="container" >
                        {
                            getLoading
                                ?
                                <div className={"ExampleOfUsage"}>
                                    <div className='loading'><LoadingSpin /></div>
                                </div> :
                                <div className="row d-flex justify-content-center">
                                    {
                                        // eslint-disable-next-line
                                        getProjectData.filter(item => { if (item.landing === true) return item }).map((item, index) => {
                                            if (index < 3) return <div key={index} className="col-lg-6 card-div" >
                                                <ForkCard
                                                    avata={item.image}
                                                    featured={item.featured}
                                                    title={item.forkName}
                                                    chain={item.network}
                                                    text={item.description}
                                                    launchDate={item.launchDate}
                                                    socialData={item.socialData}
                                                    watchlist={item.watchlist}
                                                    id={item._id}
                                                    checkValue={item.checkValue}
                                                    projectLink={'/project/' + index}
                                                    functionalityData={item.functionalityData} />

                                            </div>
                                        })}
                                    { }
                                </div>
                        }

                        <div className="row" style={{ margin: 0, justifyContent: 'center' }}>
                            <div className="col-md-4 card-div" >
                                <ProjectCard
                                    title={'HOT'}
                                    data={getHotProjectData()}
                                    projectInfo={
                                        [{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]
                                    }
                                    color={
                                        [{ bg: '#d3b646', txt: 'black' }, { bg: '#e1c763', txt: 'black' }, { bg: '#f7de7e', txt: 'black' }]
                                    } />
                            </div>
                            <div className="col-md-4 card-div" >
                                <ProjectCard title={'TRENDING'} data={getTrendingProjectData()} projectInfo={[{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]} color={[{ bg: '#4338ca', txt: 'white' }, { bg: '#5d52e1', txt: 'white' }, { bg: '#847bfb', txt: 'white' }]} />
                            </div>
                            <div className="col-md-4 card-div" >
                                <ProjectCard title={'TOP RATED'} data={getRatedProjectData()} projectInfo={[{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]} color={[{ bg: '#047857', txt: 'white' }, { bg: '#159973', txt: 'white' }, { bg: '#47b797', txt: 'white' }]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="board-main row"></div>
            </div>
        </div>
    )
}
export default Dashboard;
