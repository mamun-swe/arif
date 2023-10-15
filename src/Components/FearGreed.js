import React, { useState, useEffect } from "react";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import { useSelector } from 'react-redux';
import { imoji_icon, imoji_icon_1, fearGreedBtn } from "../initialState";
import { Bright_Theme, Dark_Theme } from "../Constants";


const FearGreed = () => {
    // const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    const getProjectData = useSelector(state => state.setProjectData)

    const [getProgressVal] = useState(0)
    const [getFearDateBtn, setFearDateBtn] = useState(fearGreedBtn)    

    const [props_progress, setProps_progress] = useState({
        percent: getProgressVal, // is requirestyle={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}
        colorSlice: getProgressVal >= 80 ? "green" : getProgressVal >= 50 ? "orange" : "red",
        colorCircle: setTheme === 'brightness' ? "#c8c8c8" : '#27272a',
        fontColor: getProgressVal >= 80 ? "green" : getProgressVal >= 50 ? "orange" : "red",
        fontSize: "1.7rem",
        size: 120,
        fontWeight: 700


    });

    const onFearDateBtn = (num) => {
        // eslint-disable-next-line
        let aa = getProjectData.filter(item => { if (getDate(item.launchDate, num)) return item })
        let progressVal = 0;
        
        for (var i = 0; i < aa.length; i++) {
            for (var j = 0; j < 10; j++) {
                progressVal += aa[i].functionData[j]
            }
        }
        progressVal = (progressVal / aa.length).toFixed()
        setProps_progress({
            percent: progressVal,
            colorSlice: progressVal >= 80 ? "green" : progressVal >= 50 ? "orange" : "red",
            colorCircle: setTheme === 'brightness' ? "#c8c8c8" : '#27272a',
            fontColor: progressVal >= 80 ? "green" : progressVal >= 50 ? "orange" : "red",
            fontSize: "1.7rem",
            size: 120,
            fontWeight: 700


        })


        let a = getFearDateBtn
        for (let i = 0; i < 4; i++)a[i].state = false
        a[num].state = true
        setFearDateBtn([...a])

    }
    

    useEffect(() => {
        onFearDateBtn(0)
        // eslint-disable-next-line
    }, [FearGreed, getProjectData]);

    const getDeltaDate = (d) => {
        // eslint-disable-next-line
        switch (d) {
            case 0: return 0;
            case 1: return 1;
            case 2: return 7;
            case 3: return 30;
        }

    }

    const getDate = (date, num) => {
        let nowDay = new Date().getDate()
        let nowDate = new Date().getTime()
        let nowMonth = new Date().getMonth()
        let nowYear = new Date().getYear()
        let d = new Date(nowDate - 86400000 * getDeltaDate(num)).getDate()
        let m = new Date(nowDate - 86400000 * getDeltaDate(num)).getMonth()
        let y = new Date(nowDate - 86400000 * getDeltaDate(num)).getYear()
        let mm = 0
        let dm
        // eslint-disable-next-line
        switch (m) {
            case 0: dm = 31; break
            case 1: dm = 28; break
            case 2: dm = 31; break
            case 3: dm = 30; break
            case 4: dm = 31; break
            case 5: dm = 30; break
            case 6: dm = 31; break
            case 7: dm = 31; break
            case 8: dm = 30; break
            case 9: dm = 31; break
            case 10: dm = 30; break
            case 11: dm = 31; break
        }
        if (nowYear - y > 1) {
            mm = 32
        } else if (nowYear - y === 1) {
            if (m - nowMonth < 11) {
                mm = 32
            } else if (m - nowMonth === 11) {
                mm = nowDay + dm - d
            }
        } else if (nowYear === y) {
            if (nowMonth - m > 1) mm = 32
            else if (nowMonth - m === 1) mm = nowDay + dm - d
            else if (nowMonth === m) mm = nowDay - d
        }
        return mm <= getDeltaDate(num) ? true : false
    }

    
    const propssd = {
        percent: 60, // is require
        colorSlice: "#00a1ff",
        colorCircle: "#00a1ff",
        fontColor: "#365b74",
        fontSize: "1.6rem",
        fontWeight: 400,
        size: 200,
        stroke: 10,
        strokeBottom: 5,
        speed: 60,
        cut: 0,
        rotation: -90,
        opacity: 10,
        fill: "#00897B",
        unit: "%",
        textPosition: "0.35em",
        animationOff: false,
        strokeDasharray: "10,1",
        inverse: false,
        round: false,
        number: true,
        linearGradient: ["#ffff00", "brown"]
    };
    return (
        <div className="fear-card" style={{
            backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
            borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
        }}>

            <div className="d-flex fear-top-div">
                <img alt="" className="bitcoin-image" src='https://res.cloudinary.com/national-institute-of-technology/image/upload/v1655717163/leoads/icons/bitcoin_uezh2p.png' />
                <h5 className="card-title" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>FEAR & GREED INDEX</h5>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="stroke-current text-gray-500 dark:text-gray-400 ml-auto" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
                    <path fill={setTheme === 'brightness' ? Bright_Theme.svgFill : Dark_Theme.svgFill} fillRule="evenodd" clipRule="evenodd" d={imoji_icon_1.data}>
                    </path></svg>
            </div>
            <div className="d-flex fear-progress">
                <CircularProgressBar {...props_progress} />
                <div className="neutral-div">
                    <h5 className="card-neutral">Neutral</h5>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="36" width="36" xmlns="http://www.w3.org/2000/svg">
                        <path fill={imoji_icon[0].color} d={imoji_icon[0].data}>
                        </path></svg>
                    <p className="fear-date" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>Mar 25, 2022</p>
                </div>
            </div>
            <div className="fear-button-div">
                {getFearDateBtn.map((item, index) => {
                    return <button key={index} className="fear-date-button" onClick={() => onFearDateBtn(index)}
                        style={{
                            backgroundColor: item.state ? setTheme === 'brightness' ? '#c3c3c3' : '#555555' : setTheme === 'brightness' ? '#ffffff' : '#111827',
                            color: setTheme === 'brightness' ? '#333333' : '#ffffff',
                            borderColor: setTheme === 'brightness' ? '#f1f1f1' : '#333333'
                        }}>{item.title}</button>
                })}
            </div>
        </div>
    )
}
export default FearGreed;