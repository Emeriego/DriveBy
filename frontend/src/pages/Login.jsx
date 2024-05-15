import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../utils/auth';
import { authActions } from '../store';
import './signup.css'
import AOS from 'aos';
import 'aos/dist/aos.css';



AOS.init();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [messageApi, contextHolder] = message.useMessage();
  const successMsg = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const errorMsg = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };




  const getEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    console.log(email);
  };

  const getPassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    console.log(password)
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const tokens = await authenticateUser(email, password);
      // Store access token and its expiration time in local storage
      localStorage.setItem('authToken', JSON.stringify(tokens));
      console.log("logged in XXXXXX")
      dispatch(authActions.login(tokens));
      // Navigate after successful login
      successMsg('Login Successful')
      setTimeout(() => {
      navigate('/dashboard');
      }, 3000);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      errorMsg('Login Failed - Invalid Credentials')
      navigate('/login')
      // You might want to display an error message to the user
    }
  };


  return (
  







<div className="form-container2">

<div className="card car-card2 ">

  <div className="card-left">
    <div className="top">
      <h3 className="card-title"> </h3>
      <hr />
    </div>
    <div className="car-img2">
      <img data-aos='slide-up'  src="./assets/logo.png" className="card-img-top img" alt="..." />

    </div>


  </div>

  <div data-aos='slide-up' className="card-body card-right ">
    {/* <hr /> */}
  
    <form className='frm-tag2' data-aos='slide-left' onSubmit={loginUser}>
          <h3>Login</h3>

          <div className="row frm">
            <div className="col">
              <Input placeholder="Email" type='email' name='email' onChange={getEmail} style={{marginBottom: '5px'}} prefix={<UserOutlined />} />

              {/* <input type="email" className="form-control" placeholder="Email" aria-label="Email" /> */}
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <Input.Password
                placeholder="input password"
                name='password'
                onChange={getPassword}
                prefix={<UserOutlined />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              {/* <input type="password" className="form-control" placeholder="Password" aria-label="Username" /> */}
            </div>

          </div>
          <div className="google-login2">
            <span>Login with <a href="" className="google">Google</a> or <a href="" className="facebook">Facebook</a></span>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
  </div>
</div>


</div>

  )
}

export default Login
