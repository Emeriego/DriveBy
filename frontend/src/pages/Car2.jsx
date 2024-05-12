import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Flex, Rate, Image } from 'antd'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { carActions } from '../store';
import defaultImg from './assets/default.jpeg'
import '../utils/spin.css'
import API_BASE_URL from '../utils/apiConfig';


import './car.css'



const Car = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car_id } = useParams();
  const [car, setCar] = useState(null);
  const [msg, setMsg] = useState([]);

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [value, setValue] = useState(4);
  console.log(car_id)

  const Spinner = () => (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );

  const getCar = () => {
    return axios.get(`${API_BASE_URL}/api/cars/${car_id}`)
      .then((response) => {
        dispatch(carActions.fetchSelectedCar(response.data));
        setCar(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMsg(msg => ([
          ...msg,
          {
            "type": "error",
            "body": "Error fetching cars"
          }
        ]));
        Navigate('/')
        // Handle the error as needed, such as displaying a message to the user
        throw error; // Rethrow the error to propagate it further if necessary
      });
  }
  useEffect(() => {
    getCar();
  }, []);


  if (!car) {
    return <Spinner />;
  }
  const goToBook = () => {
    navigate(`/book/${car_id}`);
  }

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
        
          <h5>Brand: <span><b>**</b>{car.brand}</span></h5>
          <h5>Model: <span><b>**</b>{car.model}</span></h5>
          <h5>Color: <span><b>**</b>{car.color}</span></h5>
          <h5>Horse Power: <span><b>**</b>{car.power + "HP"}</span></h5>
          <h5>Rate per Hour: <span><b>**</b>{car.price}</span></h5>
          <h5>Posted By: <span><b>**</b>{car.user.username}</span></h5>
          <div className="btns2">
            <div className="">
              <Link to={`/book/${car.id}`} className="btn btn-primary">Book</Link>

            </div>
          </div>
        </div>
      </div>


    </div>

  )
}

export default Car
