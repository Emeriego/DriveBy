import React, { useState } from 'react'
import { Flex, Rate } from 'antd';
import { Input, Button, message } from 'antd';
import { refreshToken } from '../utils/auth';
import './review.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {authActions} from '../store';
import API_BASE_URL from '../utils/apiConfig';




const CreateMessage = () => {
  const [value, setValue] = useState(3);
  const [myData, setMyData] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
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
  const handleChange = (e) => {
    setMyData({ ...myData, [e.target.name]: e.target.value })
  }

  const postMsg = async (access) => {
    // console.log('searching for refteshed token:', access)
    try {
      // setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/messages/create/`, JSON.stringify(myData),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          },
        })
      console.log('after posting msg', res.data)
      // setLoading(false)
    } catch (error) {
      console.log(error)
      // setLoading(false)
    }
  }
  const handleSend = async (e) => {
    e.preventDefault()
    if (isLoggedIn === false) {
      errorMsg('Please login to send message. Redirecting to login...')
      setTimeout(() => {
      navigate('/login');
      }, 2000)
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))

      try {

        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await postMsg(refreshedTokens.access)
          successMsg('Message sent successfully. Redirecting to dashboard...')
          // console.log('response from sendmsg', res)
          setTimeout(() => {
          navigate('/dashboard');
          }, 2000)
        }

      } catch (error) {
        console.log('error', error)
        errorMsg('Error sending message, please try again later.')
        setTimeout(() => {
        navigate('/messages/create');
        }, 2000)
      }
    }
  }
console.log('data', myData)

  return (




    <div className="form-container">
      <div className="left-pane">
        <div className="img-container">
          <img src="/assets/logo.png" alt="" />
        </div>
      </div>
      <div className='right-pane' >
      {contextHolder}

        <form onSubmit={handleSend}>
          <h3>Message</h3>

          <div className="frm-rw2">
            <input onChange={handleChange} type="text" name='username' className="form-control" placeholder="Recipients username" aria-label="email" />
          </div>

          <div className="row frm-rw2">
            <div className="col">
              <textarea onChange={handleChange} name='message' className="form-control" placeholder="Your message.." aria-label="message" rows='6' />
            </div>


          </div>

          <div className="google-login">
            <span>Any Complaints? Click <a href="" className="google">here</a> to contact admin. </span>
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>

      </div>
    </div>


  )
}

export default CreateMessage
