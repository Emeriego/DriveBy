import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Flex, Rate, Image } from 'antd'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { carActions } from '../store';
import defaultImg from './assets/default.jpeg'
import '../utils/spin.css'
import API_BASE_URL from '../utils/apiConfig';


import './signup.css'



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
    <div className="form-container">
      <div className="left-p">
      <Col span={16}><span>
              <div className="car-title">
                <span><h4>{car.brand + " " + car.model}</h4></span>
              </div>
            </span></Col>
        <div className="img-container">
          {/* <img src={`./assets/${car.img}`} alt="" /> */}
          <Image
            // width={500}
            style={{ width: '100%', height: '100%' }}
            // src={`./assets/${car.img}`}
            src={`${API_BASE_URL}/${car.img}`}          />
        </div>
        <Flex gap="middle" horizontal>
              <Rate tooltips={desc} disabled value={car.rating} />
              {car.rating ? <span>{desc[car.rating - 1]}</span> : null}
            </Flex>
      </div>
      <div className='right-p' >

        {/* <h3>View car</h3> */}

  
        <div className="row frm">

          <div className="col">
            <hr />

            <h5>Brand: <span><b>**</b>{car.brand}</span></h5>
            <h5>Model: <span><b>**</b>{car.model}</span></h5>
            <h5>Color: <span><b>**</b>{car.color}</span></h5>
            <h5>Horse Power: <span><b>**</b>{car.power + "HP"}</span></h5>
            <h5>Rate per Hour: <span><b>**</b>{car.price}</span></h5>
            <h5>Posted By: <span><b>**</b>{car.user.username}</span></h5>

            
          </div>
          <div className="google-login">
          <span>See <a href="" className="google">Guide</a> to learn how it works</span>
          <button onClick={goToBook} type="submit" className="btn btn-primary">Book</button>

        </div>
        </div>
        

      </div>
    </div>

  )
}

export default Car
