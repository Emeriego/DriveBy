import React, { useState } from 'react'
import { Flex, Rate, message } from 'antd';
import { postCarReview } from '../utils/LoadReviews';
import './review.css'
import { refreshToken } from '../utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useEffect } from 'react';
import axios from 'axios';
import { authActions } from '../store';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const CreateCarReview = () => {
  const [value, setValue] = useState(3);
  const [review, setReview] = useState('')
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { car_id } = useParams()
  const [car, setCar] = useState({})
  // console.log("this is car id", car_id)
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
  // console.log('car_id:',car_id)

  const getCarById = async (car_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cars/${car_id}`)
      const data = await response.data
      setCar(data)
    }
    catch (err) {
      console.log(err)
    }
  }


  const handleReview = async (e) => {
    e.preventDefault()
    try {
      if (!isLoggedIn) {
        errorMsg('Please login to review a car')
        setTimeout(() => {
          return navigate('/login')
        }, 2000)

      }
      else {
        const tokens = JSON.parse(localStorage.getItem('authToken'))
        const refreshedTokens = await refreshToken(tokens)
        dispatch(authActions.login(refreshedTokens))
        // console.log('review2222:', tokens)

        const data = await postCarReview({ car: car_id, review, rating: value }, refreshedTokens.access)
      console.log('review feedback:', data)
      }
    }
    catch (err) {
      console.log(err)
    }
    //
    console.log('review:', review)
    console.log('rating:', value)
    successMsg('Review submitted successfully')
    setTimeout(() => {
      return navigate(`/dashboard`)
    }
      , 3000)
  }

  useEffect(() => {
    getCarById(car_id)

  }, [])

  return (




    <div className="form-container">
      {contextHolder}
      <div className="left-pane">
        {/* <div className="img-container">
          <img src="./assets/van.webp" alt="" />
        </div> */}
        <CarCard car={car} />
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
              <textarea
                onChange={(event) => setReview(event.target.value)}
                className="form-control"
                placeholder="tell us more.."
                aria-label="reviews" rows='6'
              />
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

export default CreateCarReview
