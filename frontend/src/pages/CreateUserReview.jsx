import React, { useState } from 'react'
import { Flex, Rate, message } from 'antd';
import { postUserReview } from '../utils/LoadReviews';
import './review.css'
import { refreshToken } from '../utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useEffect } from 'react';
import API_BASE_URL from '../utils/apiConfig';

import axios from 'axios';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const CreateUserReview = () => {
  const [value, setValue] = useState(3);
  const [review, setReview] = useState('')
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user_id } = useParams()
  const [user, setUser] = useState({})


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

  const getUserById = async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${user_id}`)
      const data = await response.data
      setUser(data)
    }
    catch (err) {
      console.log(err)
    }
  }


  const handleReview = async (e) => {
    e.preventDefault()
    try {
      if (!isLoggedIn) {
        errorMsg('Please login to review this user')
        setTimeout(() => {
          return navigate('/login')
        }, 2000)

      }
      else {
        const tokens = JSON.parse(localStorage.getItem('tokens'))
        const refreshedTokens = await refreshToken(tokens)
        dispatch(authActions.login(refreshedTokens))
        const data = await postUserReview({ user: user_id, review, rating: value })
        console.log('response from postReview', data)
      }
    }
    catch (err) {
      console.log(err)
      errorMsg('Something didnt go right.')
    setTimeout(()=> {
      return navigate('/dashboard')
    }, 3000)
    }
    
    console.log('review:', review)
    console.log('rating:', value)
    successMsg('Thanks for the review.')
    setTimeout(()=> {
      return navigate('/dashboard')
    }, 3000)
  }

  useEffect(() => {
    getUserById(user_id)
  }, [])

  return (




    <div className="form-container">
      {contextHolder}
      <div className="left-pane">
        {/* <div className="img-container">
          <img src="./assets/van.webp" alt="" />
        </div> */}
        {/* <CarCard car={car} /> */}
      </div>
      <div className='right-pane' >

        <form onSubmit={handleReview}>
          <h3>Review</h3>


          <div className="row frm-rw2">
            <Flex gap="middle" horizontal>
              <Rate tooltips={desc} onChange={setValue} value={value} />
              {value ? <span>{desc[value - 1]}</span> : null}
            </Flex>


          </div>
          <div className="row frm-rw2">
            <div className="col">
              <textarea onChange={setReview} className="form-control" placeholder="tell us more.." aria-label="reviews" rows='6' />
            </div>
          </div>

          <div className="google-login">
            <span>Any Complaints? Click <a href="" className="google">here</a> to contact admin. </span>
          </div>
          <button type="submit" className="btn btn-primary">Review</button>
        </form>

      </div>
    </div>


  )
}

export default CreateUserReview
