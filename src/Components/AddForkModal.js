import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SET_PROJECT_DATA } from "../actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl } from "../Constants";

import axios from "axios"


const AddForkModal = (props) => {
    const setTheme = useSelector(state => state.setTheme)
    const getFork = useSelector(state => state.getFork)
    const network = useSelector(state => state.getNetwork)
    let getProjectData = useSelector(state => state.setProjectData)
    const [getImageData, setImageData] = useState('../images/icons/upload.png')
    const [getForkName, setForkName] = useState(false)
    const [getForkDescription, setForkDescription] = useState(false)
    const [getName, setName] = useState(false)
    const [getNetwork, setNetwork] = useState(false)
    const [getDate, setDate] = useState(false)
    const [checkValue, setValue] = useState('Hello');


    const dispatch = useDispatch()
    const imageInput = useRef(null);
    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const dateInput = useRef(null);
    const forkInput = useRef(null);
    const networkInput = useRef(null);
    const twitterInput = useRef(null);
    const discordInput = useRef(null);
    const telegramInput = useRef(null);
    const websiteInput = useRef(null);
    const facebookInput = useRef(null);
    const emailInput = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    useEffect(() => {

        if (props.getSaveModal_f) {
            axios.post(Backendurl + 'forksave', inputModalData())
                .then(res => {
                    if (res.data)
                        getProjectData.push(res.data)
                    dispatch({ type: SET_PROJECT_DATA, payload: getProjectData })
                })
            props.closeModal();
            formatModal()
        }
    }, [props.getSaveModal_f]);

    useEffect(() => {
        if (props.isEditModal) {
            nameInput.current.value = props.data.item.forkName
            descriptionInput.current.value = props.data.item.description
            forkInput.current.value = props.data.item.fork
            networkInput.current.value = props.data.item.network
            twitterInput.current.value = props.data.item.socialData.twt
            discordInput.current.value = props.data.item.socialData.dis
            telegramInput.current.value = props.data.item.socialData.tel
            websiteInput.current.value = props.data.item.socialData.web
            facebookInput.current.value = props.data.item.socialData.face
            emailInput.current.value = props.data.item.socialData.email

            setValue(props.data.item.checkValue)
            setImageData(props.data.item.image)
        }
    }, [props.isEditModal])

    useEffect(() => {
        if (checkValue === 'yes' && props.data.item.checkValue === 'yes') dateInput.current.value = getEditDate(props.data.item.launchDate)
    }, [checkValue])

    const inputModalData = () => {
        let data = {
            image: getImageData,
            user: props.walletAddress,
            forkName: nameInput.current.value,
            description: descriptionInput.current.value,
            launchDate: checkValue === 'yes' ? new Date(dateInput.current.value).getTime() / 1000 : 0,
            description: descriptionInput.current.value,
            fork: forkInput.current.value,
            network: networkInput.current.value,
            checkValue: checkValue,
            socialData: {
                twt: twitterInput.current.value,
                dis: discordInput.current.value,
                tel: telegramInput.current.value,
                web: websiteInput.current.value,
                face: facebookInput.current.value,
                email: emailInput.current.value
            },
            functionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            functionalityData: [false, false, false, false, false, false]
        }
        return Object.assign(props.data.item, data)
    }

    const forkEdit = () => {
        axios.post(Backendurl + 'forkedit', inputModalData())
            .then(res => {
                if (res.data) {
                    let aa = getProjectData.map(item => item._id).indexOf(res.data._id)
                    getProjectData[aa] = res.data
                    dispatch({ type: SET_PROJECT_DATA, payload: getProjectData })
                }
            })
        props.closeModal();
        formatModal()
    }

    const formatModal = () => {
        nameInput.current.value = ''
        descriptionInput.current.value = ''
        forkInput.current.value = '-Select One-'
        networkInput.current.value = '-Select One-'
        twitterInput.current.value = ''
        discordInput.current.value = ''
        telegramInput.current.value = ''
        websiteInput.current.value = ''
        facebookInput.current.value = ''
        emailInput.current.value = ''
        if (checkValue === 'yes') dateInput.current.value = 'MM/DD/YYYY'

        setValue('Hello')
        setForkName(false)
        setForkDescription(false)
        setName(false)
        setNetwork(false)
        setImageData('../images/icons/upload.png')
    }

    const onForkSave = () => {
        setForkName(false)
        setForkDescription(false)
        setName(false)
        setNetwork(false)
        setDate(false)

        if (nameInput.current.value === '') setForkName(true)
        else if (descriptionInput.current.value === '') setForkDescription(true)
        else if (forkInput.current.value === '-Select One-') setName(true)
        else if (networkInput.current.value === '-Select One-') setNetwork(true)
        else if (checkValue === 'Hello') { setValue('') }
        else if (checkValue != 'Hello') {
            if (checkValue === 'yes' && dateInput.current.value === '') {
                setDate(true)
            } else {
                setForkName(false)
                setForkDescription(false)
                setName(false)
                setNetwork(false)
                setDate(false)
                props.authentication()
            }
        }
    }
    const onForkEdit = () => {
        setForkName(false)
        setForkDescription(false)
        setName(false)
        setNetwork(false)
        setDate(false)

        if (nameInput.current.value === '') setForkName(true)
        else if (descriptionInput.current.value === '') setForkDescription(true)
        else if (forkInput.current.value === '-Select One-') setName(true)
        else if (networkInput.current.value === '-Select One-') setNetwork(true)
        else if (checkValue != 'Hello') {
            if (checkValue === 'yes' && dateInput.current.value === '') {
                setDate(true)
            } else {
                setForkName(false)
                setForkDescription(false)
                setName(false)
                setNetwork(false)
                setDate(false)
                forkEdit()
            }
        }
    }
    const getEditDate = (date) => {
        var a = new Date(date * 1000)
        var b = a.getFullYear() + '-' + (a.getMonth() < 9 ? '0' + (a.getMonth() + 1) : a.getMonth() + 1) + '-' + (a.getDate() < 9 ? '0' + (a.getDate()) : a.getDate())
        return b
    }

    const getNowDate = () => {
        var a = new Date()
        var b = a.getFullYear() + '-' + (a.getMonth() < 9 ? '0' + (a.getMonth() + 1) : a.getMonth() + 1) + '-' + (a.getDate() < 9 ? '0' + (a.getDate()) : a.getDate())
        return b
    }

    const changeHandler = async (event) => {
        var file = event.target.files[0];
        var imageBase64Stringsep
        var reader = new FileReader();
        reader.onload = function () {
            var base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            imageBase64Stringsep = 'data:image/jpeg;base64,' + base64String;
            setImageData(imageBase64Stringsep)
        }
        reader.readAsDataURL(file);
    }

    const closeModal = () => {
        props.closeModal()
        formatModal()
    }

    return (
        <div className="modal" style={{ zIndex: '1021', position: 'absolute', display: props.setModal ? 'block' : 'none', color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
            <div className="modal-dialog">
                <div className="modal-content" style={{
                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                }}>

                    <div className="modal-header" style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>

                        <h4 className="modal-title">Add a Fork</h4>

                        <button type="button" className="close" onClick={() => closeModal()}
                            style={{
                                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                            }}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <div>
                            <span className="btn btn-default btn-file">
                                <input type="file" ref={imageInput} id="cubeUpload" onChange={(e) => changeHandler(e)} />
                                <img alt="" src={getImageData} className='avatar-image' />
                            </span>
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label">Name:</label>
                            <span className="required-star">*</span>
                            <input type="email" ref={nameInput}
                                className="form-control"
                                placeholder="Fork Name"
                                name="name"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getForkName ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }} />
                        </div>


                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label ">Description:</label>
                            <span className="required-star">*</span>

                            <textarea ref={descriptionInput} className="form-control"
                                maxLength={270}
                                placeholder="Description max270 characters" name="description"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getForkDescription ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }}>
                            </textarea>
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label">Launch soon?:</label>
                            <span className="required-star">*</span>
                            <div className="form-control check-radio-div"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: checkValue === "" ? '#f93e19' : setTheme === 'brightness' ? 'white' : '#1d2432'
                                }} >
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        value={checkValue === 'Hello' ? '' : checkValue}
                                        name="radio-buttons-group"
                                        onChange={handleChange}
                                    >
                                        <div className="d-flex">
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        {(checkValue === "yes" || checkValue === "no" || checkValue === "Hello") && <div className="modal-content-div d-flex">
                            <label className="modal-input-label">Launch Date:</label>
                            <span className="required-star">*</span>
                            {checkValue === "Hello" && <p className="form-control hidden-input"></p>}
                            {checkValue === "yes" && <input type="date" ref={dateInput}
                                className="form-control"
                                defaultValue={''}
                                placeholder="MM/DD/YYYY" name="date"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getDate ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }} />
                            }
                            {checkValue === "no" && <p
                                className="form-control"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getDate ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }}>
                                In Development
                            </p>
                            }
                        </div>
                        }



                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label">Fork:</label>
                            <span className="required-star">*</span>
                            <select type="input" ref={forkInput} className="form-control" placeholder="Fork type" name="fork"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getName ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }}>
                                <option>-Select One-</option>
                                {getFork.map((item, index) => {
                                    return <option key={index}>{item.fork}</option>
                                })}
                            </select>
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label">Network:</label>
                            <span className="required-star">*</span>
                            <select ref={networkInput} className="form-control" placeholder="Network type" name="network"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                                    borderColor: getNetwork ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
                                }}>
                                <option>-Select One-</option>
                                {network.map((item, index) => {
                                    return <option key={index}>{item.network}</option>
                                })}
                            </select>
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Twitter:</label>
                            <input type="url" ref={twitterInput} className="form-control" placeholder="Twitter address" name="twitter"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Discord:</label>
                            <input type="url" ref={discordInput} className="form-control" placeholder="Discord address" name="discord"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Website:</label>
                            <input type="url" ref={websiteInput} className="form-control" placeholder="Website address" name="website"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Telegram:</label>
                            <input type="url" ref={telegramInput} className="form-control" placeholder="Telegram address" name="telegram"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Facebook:</label>
                            <input type="url" ref={facebookInput} className="form-control" placeholder="Facebook address" name="facebook"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>

                        <div className="modal-content-div d-flex">
                            <label className="modal-input-label modal-input-label-1">Chart:</label>
                            <input type="email" ref={emailInput} className="form-control" placeholder="Dexscreener/Dextool" name="email"
                                style={{
                                    backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                                    color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color
                                }} />
                        </div>
                    </div>

                    <div className="modal-footer" style={{ borderColor: setTheme === 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border }}>
                        <button type="button" className="btn btn-danger btn-modal-cancel" onClick={() => closeModal()}>Cancel</button>
                        {props.isEditModal ? <button type="button" onClick={() => onForkEdit()} className="btn btn-success btn-modal-ok" data-dismiss="modal">Edit</button>
                            : <button type="button" onClick={() => onForkSave()} className="btn btn-success btn-modal-ok" data-dismiss="modal">Add</button>}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AddForkModal