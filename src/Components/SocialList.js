import React from "react";
import { useSelector } from 'react-redux'; import { Bright_Theme, Dark_Theme } from "../Constants";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
const SocialList = (props) => {

    const setTheme = useSelector(state => state.setTheme)

    return (
        <div className="pl-2">
            <div className="social-button d-flex" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.sub_divBackground : Dark_Theme.sub_divBackground }}>
                <div className="social-sub-div" disabled={props.data.tel !== '' ? true : false}>

                    {props.data.tel !== '' ? <a rel="noreferrer" href={props.data.tel} target='_blank'>
                        <img alt="" className="social-image" src={props.data.tel !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/telegram_black_dcykam.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_white_yxmbzs.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_inactive_gqqzgo.png"} />
                    </a> :
                        <img alt="" className="social-image" src={props.data.tel !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717166/leoads/icons/telegram_black_dcykam.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_white_yxmbzs.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/telegram_inactive_gqqzgo.png"} />
                    }
                </div>
                <div className="social-sub-div" disabled={props.data.twt !== '' ? true : false}>
                    {props.data.twt !== '' ? <a rel="noreferrer" href={props.data.twt} target='_blank'>
                        <img alt="" className="social-image" src={props.data.twt !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_black_ry7hgo.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_white_mabfyp.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_inactive_szpwhb.png"} />
                    </a> :
                        <img alt="" className="social-image" src={props.data.twt !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_black_ry7hgo.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_white_mabfyp.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717167/leoads/icons/twitter_inactive_szpwhb.png"} />

                    }
                </div>
                <div className="social-sub-div" disabled={props.data.web !== '' ? true : false}>
                    {props.data.web !== '' ? <a rel="noreferrer" href={props.data.web} target='_blank'>
                        <img alt="" className="social-image" src={props.data.web !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_black_c53pzx.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_white_jztjqc.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_inactive_jiwdwa.png"} />
                    </a> :
                        <img alt="" className="social-image" src={props.data.web !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_black_c53pzx.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_white_jztjqc.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717168/leoads/icons/website_inactive_jiwdwa.png"} />

                    }
                </div>
                <div className="social-sub-div" disabled={props.data.dis !== '' ? true : false}>
                    {props.data.dis !== '' ? <a rel="noreferrer" href={props.data.dis} target='_blank'>
                        <img alt="" className="social-image" src={props.data.dis !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_black_lovbow.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717163/leoads/icons/discord_white_y6mr0o.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_inactive_rhg0l7.png"} />
                    </a> :
                        <img alt="" className="social-image" src={props.data.dis !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_black_lovbow.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717163/leoads/icons/discord_white_y6mr0o.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717162/leoads/icons/discord_inactive_rhg0l7.png"} />

                    }
                </div>
                <div className="social-sub-div" disabled={props.data.face !== '' ? true : false}>
                    {props.data.face !== '' ? <a rel="noreferrer" href={props.data.face} target='_blank'>
                        <img alt="" className="social-image" src={props.data.face !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/facebook_black_knh9tg.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/facebook_white_ivgquy.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/facebook_inactive_yh6bmp.png"} />
                    </a> :
                        <img alt="" className="social-image" src={props.data.face !== '' ? setTheme === 'brightness' ? "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/facebook_black_knh9tg.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717165/leoads/icons/facebook_white_ivgquy.png" : "https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717164/leoads/icons/facebook_inactive_yh6bmp.png"} />

                    }
                </div>
                <div className="social-sub-div" style={{
                    color: `${props.data.email !== '' ? 'white' : '#5e5e55'}`
                }} disabled={props.data.email !== '' ? true : false}>
                    {props.data.email !== '' ? <a rel="noreferrer" style={{
                        color: `${props.data.email !== '' ? 'white' : '#5e5e55'}`
                    }} href={'mailto:' + props.data.email}>
                        <BarChartOutlinedIcon />
                    </a> :
                        <BarChartOutlinedIcon />
                    }
                </div>

            </div>
        </div>
    )
}
export default SocialList;