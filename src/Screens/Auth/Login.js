import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SET_LOGIN_USER } from "../../actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl } from "../../Constants";
import axios from 'axios';


function Login() {
  const setTheme = useSelector(state => state.setTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInput = useRef(null);
  const passswordInput = useRef(null);

  const [, setEmailErr] = useState(false)
  const getData = () => {
    axios.post(Backendurl + 'loginUser', inputLoginData())
      .then(res => {
        if (res.data.length > 0) {
          console.log(res.data)
          localStorage.setItem('login-user', res.data[0].email);
          dispatch({ type: SET_LOGIN_USER, payload: true })
          navigate("/dappdefi", { replace: false });
        } else if (res.data.length === 0) {
          toast('Access  Please contact with admin!')
        }
      })
  }

  const onLogin = () => {
    if (emailInput.current.value === "") setEmailErr(true)
    else if (emailInput.current.value.length === '') setEmailErr(true)
    else getData()
  }

  const inputLoginData = () => {
    let data = {
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
            <h4>Login</h4>
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label">Email:</label>
            <span className="required-star">*</span>
            <input type="email" ref={emailInput}
              className="form-control"
              placeholder="Email"
              name="email"
              // value="leomark34@gmail.com"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          <div className="d-flex auth-input">
            <label className="modal-input-label">Password:</label>
            <span className="required-star">*</span>
            <input type="password" ref={passswordInput}
              className="form-control"
              placeholder="password"
              name="password"
              // value="Thequickbrownfox"
              style={{
                backgroundColor: setTheme === 'brightness' ? Bright_Theme.header_divBackground : Dark_Theme.header_divBackground,
                color: setTheme === 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color,
                borderColor: setTheme === 'brightness' ? '#ced4da' : '#ced4da'
              }} />
          </div>
          {/* <div className="signup-link-div">
            <Link to='/signup' >
              Signup
            </Link>
          </div> */}
          <div className="login-btn-div">
            <button className="btn btn-primary" onClick={() => onLogin()}>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
}



export default Login;
