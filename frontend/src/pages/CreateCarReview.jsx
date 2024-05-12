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
import API_BASE_URL from '../utils/apiConfig';


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
      const response = await axios.get(`${API_BASE_URL}/api/cars/${car_id}`)
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
        // navigate('/dashboard')
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




 




<div className="form-container2">

<div className="card car-card2 ">

  <div className="card-left">
    <div className="top">
      <h3 className="card-title">{car.brand} </h3>
      <hr />
    </div>
    <div className="car-img2">
      <img data-aos='slide-up' src={`${API_BASE_URL}${car.img}`} className="card-img-top img" alt="..." />

    </div>

    <Flex gap="0" horizontal className='ratin'>
      <Rate tooltips={desc} value={car.rating} className='rate' disabled />
      {car.rating !== 0 ? <span className='rate'>{`${car.numReviews} reviews`}</span> : <small className='rate'> No reviews</small>}
    </Flex>

  </div>

  <div data-aos='slide-up' className="card-body card-right ">
    {/* <hr /> */}
  
   

        <form onSubmit={handleReview}>
          <h3>Review</h3>


          <div className="row frm-rw2">
            <Flex gap="middle" horizontal>
              <Rate tooltips={desc} onChange={setValue} value={value} />
              {value ? <span>{desc[value - 1]}</span> : null}
            </Flex>


          </div>
          <div className="row frm">
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
</div>






  )
}

export default CreateCarReview
