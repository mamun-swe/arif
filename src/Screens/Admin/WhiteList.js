import React, { useState, useRef, lazy, Suspense } from "react"
// import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Bright_Theme, Dark_Theme, Backendurl } from "../../Constants";
import { category_buttons } from "../../initialState";
import { SET_WHITELIST_DATA } from "../../actionTypes";
import Switch from '@mui/material/Switch';
import axios from 'axios';
import LoadingSpin from "react-loading-spin";
const RemoveProjectIcon = lazy(() => import('../../Components/Icons/RemoveProjectIcon'));
const EditIcon = lazy(() => import('../../Components/Icons/EditIcon'));

const RemoveModal = (props) => {
    // console.log(props)
    const setTheme = useSelector(state => state.setTheme)
    return (
        <div className="modal" id="myRemoveModalwhitelist"
        >
            <div className="modal-dialog">
                <div className="modal-content"
                    style={{
                        backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground,
                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                        borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                    }}>

                    <div className="modal-header"
                        style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                        <h4 className="modal-title">Removing Project</h4>
                        <button type="button" className="close" data-dismiss="modal"
                            style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>&times;</button>
                    </div>

                    <div className="modal-body">
                        Are you sure you want to remove {props.data.project}?
                    </div>

                    <div className="modal-footer"
                        style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                            onClick={() => props.onRemove(props.data._id)}>Remove</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

const WhiteList = () => {
    // const location = useLocation();
    const dispatch = useDispatch()
    const projectInput = useRef(null)
    const networkInput = useRef(null)
    const websiteInput = useRef(null)
    const getProjectData = useSelector(state => state.setProjectData)
    const network = useSelector(state => state.getNetwork)
    const getWhitelist = useSelector(state => state.getWhitelist)
    const [, setProjectErr] = useState(false)
    const [networkErr, setNetworkErr] = useState(false)
    const [websiteErr, setWebsiteErr] = useState(false)
    const [whitelist, setWhitelist] = useState(false)
    const [isupdate, setIsupdate] = useState(false)
    const [selectData, setSelectData] = useState(0)
    const [getCategory] = useState(category_buttons);
    const getSelNum = useSelector(state => state.setCategory_list)

    const setTheme = useSelector(state => state.setTheme)
    const onAdd = (router) => {
        setProjectErr(false)
        setNetworkErr(false)
        setWebsiteErr(false)
        if (projectInput.current.value === '') setProjectErr(true)
        else if (networkInput.current.value === '-Select One-') setNetworkErr(true)
        else if (websiteInput.current.value === '') setWebsiteErr(true)
        else {
            let getWhitelistdata = getWhitelist
            let aa = getProjectData
            let data = {
                image: getProjectData[aa.map(item => { return item.forkName }).indexOf(projectInput.current.value)].image,
                project: projectInput.current.value,
                website: websiteInput.current.value,
                network: networkInput.current.value,
                whitelist: whitelist
            }
            if (router === 'updateWhitelist')
                data._id = getWhitelist[selectData]._id
            axios.post(Backendurl + router, data)
                .then(res => {
                    if (res.data)
                        switch (router) {
                            case 'addwhitelist': getWhitelistdata.unshift(res.data); break
                            case 'updateWhitelist': getWhitelistdata[getWhitelistdata.map(item => { return item._id }).indexOf(res.data._id)] = res.data; break
                            default:
                                break
                        }

                    dispatch({ type: SET_WHITELIST_DATA, payload: getWhitelistdata })
                    projectInput.current.value = '-Select One-'
                    websiteInput.current.value = ''
                    networkInput.current.value = '-Select One-'
                    setWhitelist(false)
                    setIsupdate(false)
                })
        }
    }
    const onRemove = (id) => {
        axios.post(Backendurl + 'deletewhitelist', { id })
            .then(res => {
                if (res.data) {
                    let aa = getWhitelist;
                    let a = aa.map(item => { return item._id }).indexOf(res.data)
                    aa.splice(a, 1)
                    dispatch({ type: SET_WHITELIST_DATA, payload: aa })

                }

            })
    }
    const onDeleteModal = (data) => {
        setSelectData(data)
    }
    const onChangeWhitelist = () => {
        setWhitelist(whitelist ? false : true)
    }
    const onCancel = () => {
        setIsupdate(false)
        projectInput.current.value = '-Select One-'
        websiteInput.current.value = ''
        networkInput.current.value = '-Select One-'
        setWhitelist(false)
    }
    const onEdit = (num) => {
        setSelectData(num)
        setIsupdate(true)
        projectInput.current.value = getWhitelist[num].project
        websiteInput.current.value = getWhitelist[num].website
        networkInput.current.value = getWhitelist[num].network
        setWhitelist(getWhitelist[num].whitelist)
    }
    return (
        <Suspense fallback={<LoadingSpin />}>
            <div className="main-board"
                style={{ backgroundColor: setTheme === 'brightness' ? '#eaeAEA' : Dark_Theme.divBackground }}>
                {getWhitelist.length > 0 && <RemoveModal data={getWhitelist[selectData]} onRemove={onRemove} />}

                <div className="board-main-project-detail"
                    style={{
                        backgroundColor: setTheme === 'brightness' ? '#f4f5f5' : Dark_Theme.divBackground,
                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                    }}>
                    <div className="project-deatil">
                        <div className="review-body " style={{ backgroundColor: setTheme === 'brightness' ? 'white' : '#161e30' }}>
                            <div className="review-write-body">
                                <div className="">
                                    <h3 className="white-list-title">WHTIELIST</h3>
                                </div>

                                <table className="table table-striped" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Projects</th>
                                            <th>Network</th>
                                            <th>Whitelist</th>
                                            <th>Website</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th>
                                                <select type="input" ref={projectInput} className="form-control" placeholder="Fork type" name="fork"
                                                    style={{
                                                        backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                                        borderColor: networkErr === true ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                                    }}>
                                                    <option>-Select One-</option>
                                                    {getProjectData.map((item, index) => {
                                                        return <option key={index}>{item.forkName}</option>
                                                    })}
                                                </select>
                                                {/* <input ref={projectInput}  className="form-control" 
                                                style={{backgroundColor:setTheme=='brightness'?'#f3f4f6':'#292f3d',
                                                    color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color,
                                                   borderColor:projectErr==true?'#f93e19':projectErr==true?'#f93e19':setTheme=='brightness'?'#212121':'#cdcdcd'}} /> */}
                                            </th>
                                            <th>
                                                <select type="input" ref={networkInput} className="form-control" placeholder="Fork type" name="fork"
                                                    style={{
                                                        backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                                        borderColor: networkErr === true ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                                    }}>
                                                    <option>-Select One-</option>
                                                    {network.map((item, index) => {
                                                        return <option key={index}>{item.network}</option>
                                                    })}
                                                </select>
                                            </th>
                                            <th>
                                                <Switch checked={whitelist} onChange={() => onChangeWhitelist()} defaultValue />
                                            </th>
                                            <th>
                                                <input ref={websiteInput} className="form-control"
                                                    style={{
                                                        backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                                        borderColor: websiteErr === true ? '#f93e19' : setTheme === 'brightness' ? '#212121' : '#cdcdcd'
                                                    }} />
                                            </th>
                                            <th>
                                                {isupdate === false ? <button className="btn btn-primary category-add-btn"
                                                    onClick={() => onAdd('addwhitelist')}>Add</button> :
                                                    <div className="d-flex">
                                                        <button className="btn btn-primary category-add-btn"
                                                            onClick={() => onAdd('updateWhitelist')}>Update</button>
                                                        <button className="btn btn-warning category-add-btn"
                                                            onClick={() => onCancel()}>Cancel</button>
                                                    </div>
                                                }
                                            </th>
                                        </tr>
                                        {
                                            // eslint-disable-next-line
                                            getWhitelist.map((item, index) => {
                                                // eslint-disable-next-line
                                                if (!getSelNum && getSelNum === 0 || item.fork === getCategory[getSelNum].title) return <tr key={index} style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                                                    <td>{index + 1}</td>
                                                    <td className="d-flex">
                                                        <img alt="" className="list-image" src={item.image} />
                                                        <p>{item.project}</p>
                                                        {/* {item.isNew&&<div className="new-label">NEW</div>} */}
                                                    </td>
                                                    <td>{item.network}</td>
                                                    <td>{item.whitelist === true ? 'Open' : 'Close'}</td>
                                                    <td className="last-td">{item.website && <a rel="noreferrer" href={item.website} target='_blank' className="d-flex"><p style={{ color: '#326dec' }}>{item.website !== '' ? 'JOIN NOW' : ''}</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ display: item.website !== '' ? 'block' : 'none' }}
                                                            height="20px" width="20px" viewBox="0 0 24 24" className="new-window">
                                                            <path d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">

                                                            </path>
                                                        </svg>
                                                    </a>}
                                                    </td>
                                                    <td className="d-flex">
                                                        <div className="project-remove-div" onClick={() => onEdit(index)}>
                                                            <EditIcon

                                                                color={setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color} />
                                                        </div>
                                                        <div className="project-remove-div" onClick={() => onDeleteModal(index)} data-toggle="modal" data-target="#myRemoveModalwhitelist">
                                                            <RemoveProjectIcon

                                                                color={setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}
export default WhiteList;