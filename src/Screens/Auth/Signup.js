// import logo from './logo.svg';
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bright_Theme, Dark_Theme, Backendurl } from "../../Constants";
import axios from 'axios';


function Signup() {
  const setTheme = useSelector(state => state.setTheme)
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passswordInput = useRef(null);
  const pssconfirmInput = useRef(null);

  const [nameErr, setNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr, setpasswordErr] = useState(false)
  const [confirmErr, setConfirmErr] = useState(false)
  useEffect(() => {
  }, []);
  const getData = () => {
    axios.post(Backendurl + 'signupUser', inputSignupData())
      .then(res => {
        toast(res.data)
      })
  }
  const onSignup = () => {
    setNameErr(false)
    setEmailErr(false)
    setpasswordErr(false)
    setConfirmErr(false)
    if (nameInput.current.value === "") setNameErr(true)
    else if (emailInput.current.value === "") setEmailErr(true)
    else if (passswordInput.current.value.length < 8) setpasswordErr(true)
    else if (passswordInput.current.value !== pssconfirmInput.current.value) setConfirmErr(true)
    else getData()
  }

  const inputSignupData = () => {
    let data = {
      username: nameInput.current.value,
      email: emailInput.current.value,
      password: passswordInput.current.value,
      role: 1
    }
    return data
  }

  return (
    <div className="App-login">
      <ToastContainer />
      <div className='body-login'>
        <div className='body-login-content'>
          <div className="login-title">
            <h4>Sign up</h4>
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label">Name:</label>
            <span className="required-star">*</span>
            <input type="text" ref={nameInput}
              className="form-control"
              placeholder="Name"
              name="name"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: nameErr ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label">Email:</label>
            <span className="required-star">*</span>
            <input type="email" ref={emailInput}
              className="form-control"
              placeholder="Email"
              name="email"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: emailErr ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label">Password:</label>
            <span className="required-star">*</span>
            <input type="password" ref={passswordInput}
              className="form-control"
              placeholder="password"
              name="password"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: passwordErr ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label modal-input-label-1">Confirm:</label>
            <input type="password" ref={pssconfirmInput}
              className="form-control"
              placeholder="Confirm"
              name="confirm"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: confirmErr ? '#f93e19' : setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          <div className="signup-link-div">
            <Link to='/login' >
              Login
            </Link>
          </div>
          <div className="login-btn-div">
            <button className="btn btn-primary" onClick={() => onSignup()}>Signup</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
