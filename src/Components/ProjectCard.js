import React from "react";
import {
    useSelector
} from 'react-redux';
import { Bright_Theme, Dark_Theme, Font_style } from "../Constants";
import LocalFireDepartmentSharpIcon from '@mui/icons-material/LocalFireDepartmentSharp';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const ProjectItemList = (props) => {

    return (
        <div className="project-item" style={{ backgroundColor: props.bgcolor }}>
            <div className="d-flex">
                <img alt="" className="project-item-image" src={props.data.image} />
                <div className="d-flex project-item-text-div">
                    <p className="project-item-text" style={{ color: props.color }}>{(props.data.forkName).slice(0, 17)}</p>
                    {props.data.functionalityData[4] && <p className="project-item-value" style={{ color: props.color }}>KYC</p>}
                </div>
            </div>
            <div className="d-flex">
                <p className="project-item-description" style={{ color: Font_style.fontColor_1 }}><span className="" style={{ color: props.color }}>{props.data.network}</span></p>
                {props.data.functionalityData[5] && <p className="project-item-description-percent" style={{ color: props.color }}>audited</p>}
            </div>
        </div>
    )
}

const ProjectCard = (props) => {
    // const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    return (
        <div className="fear-card"
            style={{
                backgroundColor: setTheme === 'brightness' ? 'white' : Dark_Theme.cardBackground,
                borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>

            <div className="card-body">
                <div className="d-flex project-card-title">
                    <h4 className="title-text" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>{props.title}</h4>



                    {
                        props.title === 'HOT' && <LocalFireDepartmentSharpIcon className="ml-auto text-danger" />
                    }

                    {
                        props.title === 'TRENDING' && <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="stroke-current text-gray-500 text-success dark:text-gray-400 ml-auto" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M352 144h112v112"></path>
                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 368l121.37-121.37a32 32 0 0145.26 0l50.74 50.74a32 32 0 0045.26 0L448 160"></path>
                        </svg>
                    }

                    {
                        props.title === 'TOP RATED' && <InsertChartOutlinedIcon className="ml-auto text-primary" />
                    }

                </div>
                {
                    // eslint-disable-next-line
                    props.data.map((item, index) => {
                        if (index < 3) return <ProjectItemList key={index} data={item} projectInfo={props.projectInfo[index]} bgcolor={props.color[index].bg} color={props.color[index].txt} />
                    })}
            </div>
        </div>
    )
}
export default ProjectCard;