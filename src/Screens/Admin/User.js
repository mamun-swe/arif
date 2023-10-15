import React, { useState, useEffect, useRef, lazy, Suspense } from "react"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateProjectData } from '../../services/networkService';
import { SET_USER_DATA } from "../../actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl } from "../../Constants";
import { category_buttons } from "../../initialState";
import Switch from '@mui/material/Switch';
// import { useMoralis } from "react-moralis";
import axios from 'axios';
import LoadingSpin from "react-loading-spin";
const RemoveProjectIcon = lazy(() => import('../../Components/Icons/RemoveProjectIcon'));
const EditIcon = lazy(() => import('../../Components/Icons/EditIcon'));
const RemoveModal = (props) => {
    // console.log(props)
    const setTheme = useSelector(state => state.setTheme)
    return (
        <div className="modal" id="myRemoveModal"
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
                        Are you sure you want to remove {props.data.forkName}?
                    </div>

                    <div className="modal-footer"
                        style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                            onClick={() => props.onUpdateProject(props.data._id, 'deleteUser')}>Remove</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
const User = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const roleInput = useRef(null)
    const nameInput = useRef(null)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const confirmInput = useRef(null)
    const [getCategory] = useState(category_buttons)
    const { account } = {};
    const [, setWalletAddress] = useState('')
    const [, setRemoveProject] = useState('')
    const [getRemoveProjectIndex, setRemoveProjectIndex] = useState(0)
    let getProjectData = useSelector(state => state.setProjectData)
    const [nameErr, setNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr] = useState(false)
    const [confirmErr, setConfirmErr] = useState(false)
    const [selectNum, setSelectNum] = useState(0)
    const setUserList = useSelector(state => state.setUserList)
    const getSelNum = useSelector(state => state.setCategory_list)
    const getCategoryBtn = useSelector(state => state.setCategory_btn)
    useEffect(() => {
        console.log(setUserList)
        setWalletAddress(account)
        getProjectData.sort((a, b) => { return b.created_at - a.created_at });
        // eslint-disable-next-line
    }, [location, User, getProjectData, getCategoryBtn]);

    const getNowDate = (data) => {
        var a = new Date(data * 1000)
        var b = a.getFullYear() + '-' + (a.getMonth() < 9 ? '0' + (a.getMonth() + 1) : a.getMonth() + 1) + '-' + (a.getDate() < 9 ? '0' + (a.getDate()) : a.getDate())

        return b
    }

    const onUpdateProject = async (id, router) => {
        let aa
        await getUpdateProjectData(id, router).then((result) => {
            setRemoveProjectIndex(0)
            // eslint-disable-next-line
            switch (router) {
                case 'deadUser': aa = getDeadUser(result); break
                case 'deleteUser': aa = getDeleteUser(result); break
            }

            dispatch({ type: SET_USER_DATA, payload: aa })
        })


    }


    const getDeleteUser = (data) => {
        let aa = setUserList;
        let a = aa.map(item => { return item._id }).indexOf(data._id)
        aa.splice(a, 1)
        return [...aa]
    }
    const getDeadUser = (data) => {
        let aa = setUserList;
        let a = aa.map(item => { return item._id }).indexOf(data._id)
        aa[a] = data
        return [...aa];
    }
    const onRemove = async (id, index) => {
        setRemoveProject(id)
        setRemoveProjectIndex(index)
    }

    const onEditModal = async (num) => {
        nameInput.current.value = setUserList[num].username
        emailInput.current.value = setUserList[num].email
        roleInput.current.value = setUserList[num].role === 0 ? 'Admin' : 'Customer'
        setSelectNum(num)
    }

    const setTheme = useSelector(state => state.setTheme)


    const onAdminProjectSave = (num) => {
        setEmailErr(false)
        setNameErr(false)
        setConfirmErr(false)
        if (nameInput.current.value === '') setNameErr(true)
        else if (emailInput.current.value === '') setEmailErr(true)
        else {
            if (passwordInput.current.value === confirmInput.current.value) {
                let data = {
                    _id: setUserList[num]._id,
                    username: nameInput.current.value,
                    email: emailInput.current.value,
                    password: passwordInput.current.value === '' ? setUserList[num].password : passwordInput.current.value,
                    role: roleInput.current.value === 'Admin' ? 0 : 1,
                    created_at: setUserList[num].created_at
                }
                axios.post(Backendurl + 'editUser', data)
                    .then(res => {
                        if (res.data) {
                            let aa = setUserList
                            aa[num] = data
                            dispatch({ type: SET_USER_DATA, payload: aa })
                            nameInput.current.value = ''
                            emailInput.current.value = ''
                            roleInput.current.value = 'Customer'
                            passwordInput.current.value = ''
                            confirmInput.current.value = ''
                        }
                    })
            } else if (passwordInput.current.value === confirmInput.current.value)
                setConfirmErr(true)
        }
    }

    return (
        <Suspense fallback={<LoadingSpin />}>
            <div className="main-board" style={{ backgroundColor: setTheme === 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
                {setUserList.length > 0 && <RemoveModal data={setUserList[getRemoveProjectIndex]} onUpdateProject={onUpdateProject} />}
                <table className="table table-striped" style={{ color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Role</th>
                            <th>Dead</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                            <td></td>
                            <td>
                                <input ref={nameInput} className="form-control" placeholder="Username"
                                    style={{
                                        backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                        borderColor: nameErr === true ? '#f93e19' : setTheme === 'brightness' ? '#212121' : '#cdcdcd'
                                    }} />
                            </td>
                            <td>
                                <input ref={emailInput} className="form-control" placeholder="Email"
                                    style={{
                                        backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                        borderColor: emailErr === true ? '#f93e19' : setTheme === 'brightness' ? '#212121' : '#cdcdcd'
                                    }} />
                            </td>
                            <td>
                                <input ref={passwordInput} className="form-control" placeholder="Please enter new password to change"
                                    style={{
                                        backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                        borderColor: passwordErr === true ? '#f93e19' : setTheme === 'brightness' ? '#212121' : '#cdcdcd'
                                    }} />
                            </td>
                            <td>
                                <input ref={confirmInput} className="form-control" placeholder="Confirm password"
                                    style={{
                                        backgroundColor: setTheme === 'brightness' ? '#f3f4f6' : '#292f3d',
                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                        borderColor: confirmErr === true ? '#f93e19' : setTheme === 'brightness' ? '#212121' : '#cdcdcd'
                                    }} />
                            </td>
                            <td>
                                <select type="input" ref={roleInput} className="form-control" placeholder="Fork type" name="fork"
                                    style={{
                                        backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                        color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                        borderColor: setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                    }}>
                                    <option>Admin</option>
                                    <option>Customer</option>
                                </select>
                            </td>

                            <td>
                                <button className="btn btn-primary" onClick={() => onAdminProjectSave(selectNum)}>Save</button>
                                <button className="btn btn-danger">Cancel</button>
                            </td>
                        </tr>
                        {
                            // eslint-disable-next-line
                            setUserList.map((item, index) => {
                                // eslint-disable-next-line
                                if (!getSelNum && getSelNum === 0 || item.fork === getCategory[getSelNum].title)
                                    return <tr key={index} style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {item.username}
                                            {/* <img className="table-avarta" src={item.image}/><p className="table-title">{item.forkName}</p> */}
                                            {/* {item.isNew==true&&<div className="new-label">NEW</div>} */}
                                        </td>
                                        <td>{item.email}</td>

                                        <td>{getNowDate(item.created_at)}</td>
                                        <td>{item.role === 0 ? 'Admin' : item.role === 1 ? 'Customer' : ''}</td>
                                        {/* <td>{item.network}</td>
                            <td>
                                <div className="">
                                    <SocialList data={item.socialData}/>
                                </div>
                            </td> */}
                                        <td className="td-last-user">{item.role !== 0 && <Switch checked={item.dead === true ? true : false} onChange={() => onUpdateProject(item._id, 'deadUser')} defaultValue />}</td>
                                        {/* <td><Switch checked={item.dead==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminDead')} defaultValue/></td>
                            <td><Switch checked={item.ruged==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminRug')} defaultValue/></td> */}
                                        <td className="d-flex">
                                            <div className="project-remove-div" onClick={() => onEditModal(index)} data-toggle="collapse" data-target={'#user-sub-' + index}>
                                                <EditIcon

                                                    color={setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color} />
                                            </div>
                                            {item.role !== 0 ? <div className="project-remove-div" onClick={() => onRemove(item._id, index)} data-toggle="modal" data-target="#myRemoveModal">
                                                <RemoveProjectIcon

                                                    color={setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color} />
                                            </div> : <div className="project-remove-div"></div>}
                                        </td>
                                    </tr>
                            })}

                    </tbody>
                </table>
            </div>
        </Suspense>
    )
}
export default User;