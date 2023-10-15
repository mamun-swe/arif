import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateProjectData } from '../services/networkService';
import { SET_PROJECT_DATA_DEFAULT, SET_PROJECT_DATA } from "../actionTypes";
import { Bright_Theme, Dark_Theme } from "../Constants";
import LoadingSpin from "react-loading-spin";
const SocialList = lazy(() => import("./SocialList"));
const WatchlistIcon = lazy(() => import("./Icons/WatchlistIcon"));


const ForkCard = (props) => {
    const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    // const location = useLocation();
    // const [getCategory, setCategory] = useState(category_buttons)
    const getProjectData = useSelector(state => state.setProjectData)
    const daySpecified = (day) => {
        switch (Number(day[1])) {
            case 1:
                return `${day}st`
            case 2:
                return `${day}nd`
            case 3:
                return `${day}rd`
            case 4:
                return `${day}th`
            case 5:
                return `${day}th`
            case 6:
                return `${day}th`
            case 7:
                return `${day}th`
            case 8:
                return `${day}th`
            case 9:
                return `${day}th`
        }
    }

    const getDate = (timestamp) => {
        var time = new Date(timestamp * 1000)
        var month
        // var date = time.getDate()

        const date = daySpecified(time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`);

        var year = time.getFullYear()
        // eslint-disable-next-line
        switch (time.getMonth()) {
            case 0: month = 'Jan'; break;
            case 1: month = 'Feb'; break;
            case 2: month = 'Mar'; break;
            case 3: month = 'Apr'; break;
            case 4: month = 'May'; break;
            case 5: month = 'Jun'; break;
            case 6: month = 'Jul'; break;
            case 7: month = 'Aug'; break;
            case 8: month = 'Sep'; break;
            case 9: month = 'Oct'; break;
            case 10: month = 'Nov'; break;
            case 11: month = 'Dec'; break;
        }
        return `${date} ${month} ${year}`
    }
    const onUpdateProject = async (id, router) => {
        let aa
        await getUpdateProjectData(id, router).then((result) => {
            aa = getUpdateProject(result)
            dispatch({ type: SET_PROJECT_DATA, payload: aa })
            dispatch({ type: SET_PROJECT_DATA_DEFAULT, payload: aa })
        })


    }
    const getUpdateProject = (data) => {
        let aa = getProjectData;
        let a = aa.map(item => { return item._id }).indexOf(data._id)
        aa[a] = data
        return [...aa]
    }


    return (
        <Suspense fallback={<LoadingSpin />}>
            <div className="fear-card fear-card-fork" style={{
                backgroundColor: setTheme === 'brightness' ? 'white' : '#171f30',
                borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>
                <div className="card-body">
                    <div className="d-flex">
                        <img alt="" className="card-image" src={props.avata} />
                        <div className="card-title">
                            <div className="featured" >
                                <p style={{ backgroundColor: '#4ade80', display: props.featured ? 'block' : 'none' }}>FEATURED</p></div>
                            <Link className="card-title-text-a" to={props.projectLink} ><h4 className="card-title-text" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>{props.title}</h4>
                            </Link>
                            <h4 className="card-title-net text-left">{props.chain}</h4>
                        </div>
                        <div className="favorite-image" onClick={() => onUpdateProject(props.id, 'updateWatchlist')}>
                            <WatchlistIcon iconColor={props.watchlist} />
                        </div>
                    </div>
                    <div className="card-description p-2" style={{
                        backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : '#19202e',
                        borderColor: setTheme === 'brightness' ? '#ededed' : '#2a2a2a',
                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                    }}>
                        <h5 className="description-text text-left" style={{ color: setTheme === 'brightness' ? Bright_Theme.fontColor_3 : Dark_Theme.fontColor_3 }}>{props.text}</h5>
                    </div>
                    <p className="date-launch text-left pl-2" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                        Launch: &nbsp;
                        <span
                            style={{ color: props.checkValue === 'no' ? '#aa2222' : setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}
                        >{props.checkValue === 'yes' ? getDate(props.launchDate) : 'In Development'}</span></p>
                    <SocialList data={props.socialData} />
                    <div className="card-state d-flex">
                        {props.functionalityData[0] && <div className="card-state-text color-red">KYC</div>}
                        {props.functionalityData[1] && <div className="card-state-text color-green">AUDIT</div>}
                        {props.functionalityData[2] && <div className="card-state-text color-darkblue">DOXXED</div>}
                        {props.functionalityData[3] && <div className="card-state-text color-blue">RENOUNCED</div>}
                    </div>

                </div>
                {props.ruged && <div className="mask-card-rug">
                    <div className="rug-text"><h1>RUG</h1></div>
                </div>}
                {props.dead && <div className="mask-card-dead">
                    <div className="dead-text"><h1>DEAD</h1></div>
                </div>}
            </div>
        </Suspense>
    )
}
export default ForkCard;