import React from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import emailjs from 'emailjs-com';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import defaultImg from './assets/default.jpeg'
import { bookingActions } from '../store';
import { differenceInDays, differenceInHours } from 'date-fns';
import { format, parse, isBefore, isAfter, isWithinInterval, isEqual } from 'date-fns';
// import { useNavigate } from 'react-router-dom';


import './signup.css'
import { Col, DatePicker, Rate, Flex, message } from 'antd'
import axios from 'axios';

import { carActions } from '../store';
import { refreshToken } from '../utils/auth';
import { authActions } from '../store';
import SendEmail from '../utils/sendEmail';
import '../utils/spin.css'
import API_BASE_URL from '../utils/apiConfig';
import './car.css'


const CreateBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let bookings = useSelector(state => state.bookings.carBookings)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const { car_id } = useParams();
  const [car, setCar] = useState(null);
  const [msg, setMsg] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [value, setValue] = useState(4);
  const { RangePicker } = DatePicker

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
        console.log("from getCar", response.data)
      })
      .catch((error) => {
        console.error("catch in getcar:", "Error fetching cars:", error);
        errorMsg("Error fetching car")
        setTimeout(() => {
          navigate('/')
        }, 2000);
        // Handle the error as needed, such as displaying a message to the user
        throw error; // Rethrow the error to propagate it further if necessary
      });
  }

  const getBookings = () => {
    return axios.get(`${API_BASE_URL}/api/bookings/${car_id}`)
      .then((response) => {
        dispatch(bookingActions.fetchCarBookings(response.data));
        console.log("from getBookings", response.data)
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        errorMsg("Error fetching bookings")
        setTimeout(() => {
          navigate('/')
        }, 2000);
        // Handle the error as needed, such as displaying a message to the user
        throw error; // Rethrow the error to propagate it further if necessary
      });
  }

  const SetTimeSlot = (values) => {
    if (values && values.length === 2) {
      console.log('Selected Time: ', values[0], values[1]);


      const startDate = format(new Date(values[0]), 'dd MM yyyy HH:mm');
      const endDate = format(new Date(values[1]), 'dd MM yyyy HH:mm');
      setFrom(startDate);
      setTo(endDate);

      const difference = differenceInHours(
        new Date(values[1]),
        new Date(values[0])
      );
      setTotalHours(difference);
      console.log('Difference in hours:', difference);
    } else {
      console.log('No time selected');
    }
  };

  // console.log('Selected Time: ', from, to, totalHours);

  // const onOk = (value) => {
  //   console.log('onOk1: ', value[0]);
  //   console.log('onOk2: ', value[1]);

  // };
  const checkAvailability = (from, to) => {
    // Parse 'from' and 'to' dates from the selection
    const fromDate = parse(from, 'dd MM yyyy HH:mm', new Date());
    const toDate = parse(to, 'dd MM yyyy HH:mm', new Date());

    for (let i = 0; i < bookings.length; i++) {
      const bookingFrom = new Date(bookings[i].start_date);
      const bookingTo = new Date(bookings[i].end_date);

      // Check for overlap between booking and requested dates
      if (
        isWithinInterval(fromDate, { start: bookingFrom, end: bookingTo }) ||
        isWithinInterval(toDate, { start: bookingFrom, end: bookingTo }) ||
        (isBefore(fromDate, bookingFrom) && isAfter(toDate, bookingTo)) ||
        isEqual(fromDate, bookingFrom) || isEqual(toDate, bookingTo) ||
        isEqual(fromDate, bookingTo) || isEqual(toDate, bookingFrom)
        // (
        //   isWithinInterval(fromDate, { start: bookingFrom, end: bookingTo }) ||
        //   isWithinInterval(toDate, { start: bookingFrom, end: bookingTo }) ||
        //   (isBefore(fromDate, bookingTo) && isAfter(toDate, bookingFrom))
        // ) &&
        // !(
        //   isEqual(fromDate, bookingTo) || // Check for exact match of requested start time and existing booking's end time
        //   isEqual(toDate, bookingFrom)    // Check for exact match of requested end time and existing booking's start time
        // )
      ) {
        errorMsg('Car is not available for booking at that time. Please select a different time.');
        setIsAvailable(false); // Set availability to false
        return false;
      }
    }

    successMsg('Car is available for booking');
    setIsAvailable(true); // No overlap found, set availability to true
    return true;
  };

  // Function to parse custom date format into a Date object
  // Function to parse custom date format into a Date object
  // Function to parse custom date format into a Date object
  // Function to parse custom date format into a Date object






  const BookCar = async (access) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/cars/book/${car_id}/`, {
        car_id: car_id,
        startDate: from,
        endDate: to,
        totalHours: totalHours,
        totalPrice: totalHours * car.price,
        status: "Pending"
      }, {
        headers: {
          'Authorization': `Bearer ${access}` // Assuming 'access' is the access token
        }
      });

      console.log("just posted to db", response.data);
      setLoading(false);
      successMsg('Car booked successfully')
      return response.data;
    } catch (error) {
      console.error("Error booking car:", error);
      setLoading(false);

      errorMsg('Could not book car')
      // Handle the error as needed, such as displaying a message to the user
      throw error; // Rethrow the error to propagate it further if necessary
    }
  }




  const handleCreateBooking = async () => {
    if (isLoggedIn === false) {
      return navigate('/login');
    } else {
      if (isAvailable) {
        const tokens = JSON.parse(localStorage.getItem('authToken'))

        try {

          const refreshedTokens = await refreshToken(tokens)
          // console.log('refreshed tokens', refreshedTokens)
          if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
            // localStorage.setItem('authToken', JSON.stringify(refreshedTokens));
            dispatch(authActions.login(refreshedTokens));
            JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
            const response = await BookCar(refreshedTokens.access)
            console.log('response from handleCreateBooking', response)
            successMsg('Car has been booked successfully for the selected time:' + from + ' to ' + to);

            const emailParams = {
              to_name: car.user.username,
              from_name: 'DriveBuy',
              message: `Hello your Car ${car.brand} ${car.model} just got booked. please visit your dashboard to accept the request.`,
            };
            SendEmail(emailParams);
            setTimeout(() => {
            navigate('/dashboard');
            }, 3000);
            // emailjs.send("service_vndygpg","template_2lvalpa",{
            //   from_name: "DriveBuy",
            //   to_name: "Godwin",
            //   message: "Hello your Car Toyota Camry just got booked. please visit your dashboard to accept the request.",
            //   reply_to: "emeriego@gmail.com",
            //   });
          }
        } catch (error) {
          console.log('error', error)
        }



      } else {
        alert('Car is not available for the selected time');
        setMsg([

          {
            "type": "error",
            "body": "Car is not available for the selected time"
          }
        ]);
      }
    }
  }

  // Initialize EmailJS with your user ID

  // Function to send the email


  // Call the sendEmail function when needed
  // sendEmail();


  useEffect(() => {
    getCar();
    getBookings();
  }, []);


  if (!car) {
    return <Spinner />;
  }
  return (
    <div className="form-container2">
{contextHolder}
      <div className="card car-card2 ">

        <div className="card-left">
          <div className="top">
            <h3 className="card-title">You are Booking {car.brand}  </h3>
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
          
            <div className='searchy2'>

              <RangePicker className='date-picker' showTime={{ format: 'HH:mm' }} format="DD MM YYYY HH:mm" onOk={SetTimeSlot} />

            </div>

          <h5>Brand: <span><b>**</b>{car.brand}</span></h5>
          <h5>Model: <span><b>**</b>{car.model}</span></h5>
          <h5>Color: <span><b>**</b>{car.color}</span></h5>
          <h5>Horse Power: <span><b>**</b>{car.power + "HP"}</span></h5>
          <h5>Rate per Hour: <span><b>**</b>{car.price}</span></h5>
          <h5>Posted By: <span><b>**</b>{car.user.username}</span></h5>
          <h5>Number of Hours: <span><b>**</b>{totalHours}</span></h5>
          <h5>Total Cost: <span><b>**</b>{totalHours * car.price}</span></h5>

          <div className="btns2">
            <button  onClick={() => checkAvailability(to, from)} className={`btn btn-primary`}>Check</button>

            <button type="submit" onClick={handleCreateBooking} className={`btn btn-primary ${isAvailable ? "" : "disabled"}`}>Book</button>

          </div>
        </div>
      </div>


    </div>

  )
}

export default CreateBooking
