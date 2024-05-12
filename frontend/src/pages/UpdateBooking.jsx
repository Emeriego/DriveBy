import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import emailjs from 'emailjs-com';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import defaultImg from './assets/default.jpeg'
import { bookingActions } from '../store';
import { differenceInDays, differenceInHours } from 'date-fns';
import { format, parse,  isBefore, isAfter, isWithinInterval, isEqual } from 'date-fns';
// import { useNavigate } from 'react-router-dom';


import './signup.css'
import { Col, DatePicker, Rate, Flex } from 'antd'
import axios from 'axios';

import { carActions } from '../store';
import { refreshToken } from '../utils/auth';
import { authActions } from '../store';
import SendEmail from '../utils/sendEmail';
import '../utils/spin.css'

const UpdateBooking = () => {
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

  console.log(car_id)

  const Spinner = () => (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );

  const getCar = () => {
    return axios.get(`API_BASE_URL/cars/${car_id}`)
      .then((response) => {
        dispatch(carActions.fetchSelectedCar(response.data));
        setCar(response.data);
        console.log("from getCar", response.data)
      })
      .catch((error) => {
        console.error("catch in getcar:", "Error fetching cars:", error);
        setMsg([


          {
            "type": "error",
            "body": "Error fetching car"
          }
        ]);
        navigate('/')
        // Handle the error as needed, such as displaying a message to the user
        throw error; // Rethrow the error to propagate it further if necessary
      });
  }

  const getBookings = () => {
    return axios.get(`API_BASE_URL/bookings/${car_id}`)
      .then((response) => {
        dispatch(bookingActions.fetchCarBookings(response.data));
        console.log("from getBookings", response.data)
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMsg([

          {
            "type": "error",
            "body": "Could not fetch bookings"
          }
        ]);
        navigate('/')
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
        (isBefore(fromDate, bookingFrom) && isAfter(toDate, bookingTo))||
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
        setMsg([
          {
            "type": "error",
            "body": "Your date has already been booked. Please select another date."
          }
        ]);
        setIsAvailable(false); // Set availability to false
        return false;
      }
    }
  
    setMsg([
      {
        "type": "success",
        "body": "Your date is available. You can proceed to book."
      }
    ]);
    setIsAvailable(true); // No overlap found, set availability to true
    return true;
  };
  
  // Function to parse custom date format into a Date object
  // Function to parse custom date format into a Date object
// Function to parse custom date format into a Date object
// Function to parse custom date format into a Date object



  


  const UpdateBook = async (access) => {
    setLoading(true);

    try {
      const response = await axios.post(`API_BASE_URL/cars/book/${car_id}/`, {
        car_id: car_id,
        startDate: from,
        endDate: to,
        totalHours: totalHours,
        totalPrice: totalHours * car.price,
        status: "pending"
      }, {
        headers: {
          'Authorization': `Bearer ${access}` // Assuming 'access' is the access token
        }
      });

      console.log("just posted to db", response.data);
      setLoading(false);
      setMsg([

        {
          "type": "success",
          "body": "Car booked successfully!"
        }
      ]);
      return response.data;
    } catch (error) {
      console.error("Error booking car:", error);
      setLoading(false);
      setMsg([

        {
          "type": "error",
          "body": "Could not add car to db"
        }
      ]);
      // Handle the error as needed, such as displaying a message to the user
      throw error; // Rethrow the error to propagate it further if necessary
    }
  }




  const handleUpdateBooking = async () => {
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
            const response = await UpdateBook(refreshedTokens.access)
            console.log('response from handleCreateBooking', response)
            alert('Booking has been updated successfully ');

            const emailParams = {
              to_name: 'Godwin',
              from_name: 'DriveBuy',
              message: "Hello your Car Toyota Camry just got booked. please visit your dashboard to accept the request.",
            };
            SendEmail(emailParams);
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
    handleUpdateBooking();
    getBookings();
  }, []);


  if (!car) {
    return <Spinner />;
  }
  return (
    <div className="form-container">

      <div className='right-pane' >
        <div className="msgs">

        </div>
        <h3>Booking</h3>


        <div className="row frm-rw">

          <div justify='center' className='searchy'>
            <Col span={18}><span>
              <RangePicker className='date-picker' showTime={{ format: 'HH:mm' }} format="DD MM YYYY HH:mm" onOk={SetTimeSlot} />
            </span></Col>
            <Col span={6}><button className='btn search-btn' onClick={() => checkAvailability(to, from)}>Check</button></Col>
          </div>
          {/* <button className='btn' style={{color: 'red'}} onClick={() => checkAvailability(to, from)}>check availability</button> */}
          <div className="selects">
            <div className="start">from : {from}</div>
            <div className="end"> To: {to}</div>
          </div>
          {
            // isAvailable ? <div className="success">This car is available for the selected date</div> : <div className="error">This car is NOT available for the selected date</div>
          }

        </div>
        {
          msg.map((m, index) => (
            <div key={index} className={`msg ${m.type}`}>{m.body}</div>
          ))

        }
        <div class="row frm-rw">

          <div class="col">
            <hr />

            <h5>Brand: <span><b>**</b>{car.brand}</span></h5>
            <h5>Model: <span><b>**</b>{car.model}</span></h5>
            <h5>Color: <span><b>**</b>{car.color}</span></h5>
            <h5>Horse Power: <span><b>**</b>{car.power + "HP"}</span></h5>
            <h5>Rate per Hour: <span><b>**</b>{car.price}</span></h5>
            <h5>Posted By: <span><b>**</b>{car.user}</span></h5>
            <h5>Number of Hours: <span><b>**</b>{totalHours}</span></h5>
            <h5>Total Cost: <span><b>**</b>{totalHours * car.price}</span></h5>




          </div>
        </div>
        <div className="google-login">
          <span>See <a href="" className="google">Guide</a> to learn how it works</span>
        </div>
        <button type="submit" onClick={handleCreateBooking} className={`btn btn-primary ${isAvailable ? "" : "disabled"}`}>Book</button>

      </div>
      <div className="right-pane">
        <div className="img-container">
          <img src={defaultImg} alt="" />
        </div>
        <Flex gap="middle" horizontal>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {value ? <span>{desc[value - 1]}</span> : null}
        </Flex>
      </div>
    </div>

  )
}

export default UpdateBooking
