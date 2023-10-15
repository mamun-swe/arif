import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
// import {SET_THEME} from "../actionTypes";
import { Backendurl, Bright_Theme, Dark_Theme } from "../Constants";
import SocialList from "../Components/SocialList";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const LinearProgressBar = ({ label, percent, Icon }) => {
    const setTheme = useSelector(state => state.setTheme)
    return (
        <div className="review-linear-div d-flex">
            <div className="review-type review-progress-type d-flex">
                <Icon style={{ fontSize: '16px', marginRight: '9px' }} />
                <h5 className="progress-label">{label}</h5>
            </div>

            <div className="review-linear-progress" style={{ backgroundColor: setTheme === 'brightness' ? '#dddddd' : '#888888' }}>
                <div className="review-linear-progress-val" style={{ width: percent + '%', backgroundColor: setTheme === 'brightness' ? '#888888' : '#eeeeee' }}></div>
            </div>
            <div className="review-val review-progress-type"><h5 className="progress-label">{percent}%</h5></div>
        </div>
    )
}

const WebsiteScore = (props) => {
    console.log(props)
    const setTheme = useSelector(state => state.setTheme)
    const props_progress = {
        percent: props.progress,
        colorSlice: props.progress >= 80 ? "green" : props.progress >= 50 ? "orange" : "red",
        colorCircle: setTheme === 'brightness' ? "#c8c8c8" : '#27272a',
        fontColor: props.progress >= 80 ? "green" : props.progress >= 50 ? "orange" : "red",
        fontSize: "1.7rem",
        size: 200,
        fontWeight: 700
    };

    return (
        <div className="web-score"
            style={{
                backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>
            <h4 className="web-score-title" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>{props.websiteName}</h4>

            <div className="web-score-progress w-100">
                <CircularProgressBar {...props_progress} />
            </div>

            <div className="d-flex project-title">
                <p className="text-danger">This is Score is not a Financial advise, do your own research, Cryptocurrency is highly volatile & high risk. Owners & Operators of this website are not financial advisors.</p>
            </div>
        </div>
    )
}

const ProjectList = () => {
    const location = useLocation();
    const getProjectData = useSelector(state => state.setProjectData)
    console.log(getProjectData)
    const [getProjectId, setProjectId] = useState(0)
    const [getTotalProgress, setTotalProgress] = useState(0)
    const projectState = 1

    useEffect(() => {
        setProjectId(location.pathname.split('/')[2] * 1)
        let sum = 0
        getProjectData.length > 0 && getProjectData[location.pathname.split('/')[2] * 1].functionData.forEach(item => {
            sum += item
        })
        setTotalProgress(sum)
        // eslint-disable-next-line
    }, [location, ProjectList, getProjectData, setProjectId]);

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
                const topSliders = data.find(item => item.category === 'project' && item.position === 'Top');
                const bottomSliders = data.find(item => item.category === 'project' && item.position === 'Bottom');

                const headerbanner = data.find(item => item.category === 'headerBanner' && item.position === 'Top');

                setHeaderBanner(headerbanner)


                setEnableTopSlide(topSliders?.enable)
                setEnableBottomSlide(bottomSliders?.enable)

                setIntervalTop(topSliders?.interval)
                setIntervalBottom(bottomSliders?.interval)
                localStorage.setItem('projectImgTop', JSON.stringify(
                    topSliders?.adsGallery))
                localStorage.setItem('projectImgBottom', JSON.stringify(
                    bottomSliders?.adsGallery))

            })
    }, [])


    return (
        <div className="main-board" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
            <div className="board-title">
                <h5 className="title" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    {location.pathname.split('/')[1] !== "" ? location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) : 'Dashboard'}
                </h5>
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
            </div>

            <div className="board-main-project-detail"
                style={{
                    backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.divBackground,
                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                }}>

                <div className="project-deatil">
                    <div className="project-detail-title"
                        style={{
                            backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                            borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                        }}
                    >
                        <img alt="" className="project_avatar border-radius-50-p"
                            style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}
                            src={getProjectData[getProjectId] ? getProjectData[getProjectId].image : 'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/question-white_vbqu9m.png'} />
                        <div className="project-detail-data-div">
                            <div className="d-flex-none d-sm-flex">
                                <div className="project-user-name-div">
                                    <p className="project-user project-name">{getProjectData[getProjectId] ? getProjectData[getProjectId].forkName : ''}</p>
                                    <p className="project-user project-chain">{getProjectData[getProjectId] ? getProjectData[getProjectId].network : ''}</p>
                                </div>

                                <div className="review-v">
                                    <div className="d-flex">
                                        {projectState === 0 && <div className="d-flex verified-div">
                                            <img alt="" className="verified-image" src="../" />
                                            <p className="verified-text">VERIFIED COMPANY</p>
                                        </div>}
                                    </div>
                                </div>
                            </div>

                            <div className="project-detail-overview">
                                {getProjectData[getProjectId] ? getProjectData[getProjectId].description : ''}
                            </div>

                            <div className="social-list d-flex">
                                <SocialList data={getProjectData[getProjectId] ? getProjectData[getProjectId].socialData : ''} />
                            </div>
                        </div>
                    </div>
                    <div className="review-body project-ad">
                        <div className="row">
                            <div className="col-sm-12 col-md-8">
                                <div className="row">
                                    <div className="mb-2 margin-top-10 col-12 col-sm-5 col-md-6 col-lg-5 col-xl-5">
                                        <div className="website-score" >
                                            <WebsiteScore progress={getTotalProgress} websiteName={'Websitename Score'} title={'Power Nodes'} chain={'FANTOM'} avatar={'https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717163/leoads/icons/bitcoin_uezh2p.png'} />
                                        </div>
                                    </div>

                                    <div className="review-write-body mb-2 col-12 col-sm-7  col-md-6 col-lg-7 col-xl-7">

                                        <div className="review-div grey-border " style={{
                                            backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                                            borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                                        }}>

                                            <div className="margin-v-10 ">
                                                <h4 className="project-progress-title">Project reliablity score based on:</h4>
                                                <LinearProgressBar Icon={ContactMailOutlinedIcon} label={'KYC'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[0] * 10} />
                                                <LinearProgressBar Icon={SearchOutlinedIcon} label={'Doxxed'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[1] * 10} />
                                                <LinearProgressBar Icon={LockOutlinedIcon} label={'Liquidity Lock'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[2] * 10} />
                                                <LinearProgressBar Icon={DesignServicesOutlinedIcon} label={'Multisign'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[3] * 10} />
                                                <LinearProgressBar Icon={VerifiedUserOutlinedIcon} label={'Audit'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[4] * 10} />
                                                <LinearProgressBar Icon={CampaignOutlinedIcon} label={'Renounced'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[5] * 10} />
                                                <LinearProgressBar Icon={LocalAtmOutlinedIcon} label={'Mint'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[6] * 10} />
                                                <LinearProgressBar Icon={LabelImportantOutlinedIcon} label={'Anti-rug'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[7] * 10} />
                                                <LinearProgressBar Icon={AccountTreeOutlinedIcon} label={'Sustainability'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[8] * 10} />
                                                <LinearProgressBar Icon={CurrencyExchangeOutlinedIcon} label={'invest Staked or Sunk'} percent={getProjectData.length > 0 && getProjectData[getProjectId].functionData[9] * 10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="sticky-top ml-2" style={{ maxWidth: '300px', width: '100%', margin: 'auto' }}>



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
                                                        localStorage.getItem('projectImgTop') ? JSON.parse(localStorage.getItem('projectImgTop')).map((item, index) => (
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
                                                    mobileTouch={true}
                                                    bullets={false}
                                                    organicArrows={false}
                                                    className="ad-image padding-v-15"
                                                >

                                                    {
                                                        localStorage.getItem('projectImgBottom') ? JSON.parse(localStorage.getItem('projectImgBottom')).map((item, index) => (
                                                            <div className="w-100" key={index}>
                                                                <a href={item.adLink}>
                                                                    <img className="w-100" src={item.url} />
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
        </div>
    )
}
export default ProjectList;