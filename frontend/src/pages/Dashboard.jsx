import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Badge, Descriptions, Col, Row, Divider, Button, Modal, message, Flex, Rate } from 'antd';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { MessageOutlined, BookOutlined, CarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { refreshToken } from '../utils/auth';
import { set } from 'date-fns';
import DefaultImg from './assets/default.jpeg';
import BookingModal from '../components/BookingModal';
import { SendOutlined } from '@ant-design/icons';
import API_BASE_URL from '../utils/apiConfig';

// import './profile.css';


const Dashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(true)
  const [showBookings, setShowBookings] = useState(true)
  const [showPostings, setShowPostings] = useState(true)
  const [messages, setMessages] = useState([])
  const [sentMessages, setSentMessages] = useState([])
  const [bookings, setBookings] = useState([])
  const [book, setBook] = useState([])
  const [postings, setPostings] = useState([])
  const [carBookings, setCarBookings] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const [showMsgDetail, setShowMsgDetail] = useState(false)


  const loggedInDetail = useSelector(state => state.auth.loggedInDetail)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [showSentMessages, setShowSentMessages] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const { firstname, lastname, email, username, address} = loggedInDetail
  // console.log("from dashboard", loggedInDetail)

  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  const getCarBookings = (car) => {
    return axios.get(`${API_BASE_URL}/api/bookings/${car}`)
      .then((response) => {
        setCarBookings(response.data)
        // dispatch(bookingActions.fetchCarBookings(response.data));
        console.log("from getBookings", response.data)
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);


        // Handle the error as needed, such as displaying a message to the user
        throw error; // Rethrow the error to propagate it further if necessary
      });
  }

  const getUserBookings = async (access) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/api/bookings/user/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        }
      )
      console.log(res.data)
      setLoading(false)
      setBookings(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getUserPostings = async (access) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/api/cars/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })
      const data = res.data.filter(car => car.user.username === loggedInDetail.username)
      console.log(data)
      setLoading(false)
      setPostings(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const setupDashboard = async () => {
    if (isLoggedIn === false) {
      return navigate('/login');
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))

      try {

        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await getUserMessages(refreshedTokens.access)
          await getUserBookings(refreshedTokens.access)
          await getUserPostings(refreshedTokens.access)
          await getUserSentMessages(refreshedTokens.access)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  }


  const showModal = async (car) => {
    await getCarBookings(car)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const getBookingById = async (bookingId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/${bookingId}/booking/`)
      return await response.data
      // setCar(data)
    }
    catch (err) {
      console.log(err)
    }
  }


  const showBookModal = async (booking) => {
    const book = await getBookingById(booking)
    setBook(book)
    setIsBookModalOpen(true);
  };
  const handleBookModalOk = () => {
    setIsBookModalOpen(false);
  };

  const confirmBooking = async (access, bookingId) => {
    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/bookings/${bookingId}/confirm/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })
      console.log(res.data)
      setLoading(false)
      setBookings(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const completeBooking = async (access, bookingId) => {
    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/bookings/${bookingId}/complete/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })
      console.log(res.data)
      setLoading(false)
      setBookings(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const rejectBooking = async (access, bookingId) => {
    console.log('searching for refteshed token:', access)
    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/bookings/${bookingId}/reject/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })
      console.log(res.data)
      setLoading(false)
      setBookings(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const cancelBooking = async (access, bookingId) => {
    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/bookings/${bookingId}/cancel/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })
      console.log(res.data)
      setLoading(false)
      setBookings(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleCancel = async (bookingId) => {
    if (isLoggedIn === false) {
      error('Please login to cancel booking')
      return navigate('/login');
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))
      if (tokens === null) {
        error('Please login to cancel booking')
        return navigate('/login');
      }
      try {
        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await cancelBooking(refreshedTokens.access, bookingId)
          getUserBookings(refreshedTokens.access)
          success('Booking cancelled')
          // setTimeout(() => {
          //   navigate('/dashboard')
          // }, 2000)
        }
      } catch (error) {
        console.log('error', error)
        error('Error cancelling booking')
      }
    }
  }


  const handleConfirm = async (bookingId) => {
    if (isLoggedIn === false) {
      error('Please login to confirm booking')
      return navigate('/login');
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))

      try {

        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await confirmBooking(refreshedTokens.access, bookingId)
          success('Booking confirmed')

          setTimeout(() => {
            setIsModalOpen(false)
          }, 2000)
        }

      } catch (error) {
        console.log('error', error)
        error('Error confirming booking')
      }
    }
  }

  const handleComplete = async (bookingId) => {
    if (isLoggedIn === false) {
      error('Please login to complete booking')
      return navigate('/login');
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))

      try {

        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await completeBooking(refreshedTokens.access, bookingId)
          success('Booking completed, please make a review')

          setTimeout(() => {
            setIsModalOpen(false)
          }, 2000)
        }

      } catch (error) {
        console.log('error', error)
        error('Error completing booking')
      }
    }
  }





  const handleReview = (bookingId) => {
    if (isLoggedIn === false) {
      error('Please login to review booking')
      setTimeout(() => {
        navigate('/login');
      }, 2000)

    } else {
      navigate(`/review/${bookingId}/create`)
    }
  }

  const handleReject = async (bookingId) => {
    if (isLoggedIn === false) {
      error('Please login to confirm booking')
      return navigate('/login');
    } else {
      const tokens = JSON.parse(localStorage.getItem('authToken'))

      try {

        const refreshedTokens = await refreshToken(tokens)
        // console.log('refreshed tokens', refreshedTokens)
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
          dispatch(authActions.login(refreshedTokens));
          JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
          await rejectBooking(refreshedTokens.access, bookingId)
          success('Booking successfully rejected')

          setTimeout(() => {
            setIsModalOpen(false)
          }, 2000)
        }

      } catch (error) {
        console.log('error', error)
        error('Error confirming booking')
      }
    }
  }
  const getUserMessages = async (access) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/api/messages/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })

      let recieved = res.data.filter(message => {

        return (message.receiver.username === loggedInDetail.username);
      });

      // console.log('messages', res.data)
      setLoading(false)
      setMessages(recieved)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const getUserSentMessages = async (access) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/api/messages/sent/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
          }
        })


      let sent = res.data.filter(message => {
        return (message.sender.username === loggedInDetail.username);
      });
    
      // console.log('messages', res.data)
      setLoading(false)
      setSentMessages(sent)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const navToUserReview = (bookingId) => {
    navigate(`/review/${bookingId}/create`)
  }

  const navToCarReview = (bookingId) => {
    // console.log('nav2carReview bookingId:', bookingId)
    navigate(`/review/car/${bookingId}/create`)
  }
  // const cancelBooking = async (bookingId) => {
  //   console.log('searching for refteshed token:', access)
  //   try {
  //     setLoading(true)
  //     const res = await axios.post(`${API_BASE_URL}/api/bookings/${bookingId}/cancel/`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${access}`
  //         }
  //       })
  //     console.log(res.data)
  //     setLoading(false)
  //     setBookings(res.data)
  //   } catch (error) {
  //     console.log(error)
  //     setLoading(false)
  //   }
  // }



  useEffect(() => {

    const fetchDataInterval = setInterval(() => {
      setupDashboard()
    
    }, 5000); 

    return () => {
      clearInterval(fetchDataInterval);
    };
    


  }, [])


  return (


    <div className="dashboard-container" data-aos='slide-up'>
      {contextHolder}

      <Row>
        <Col className='d-col-left' span={`${isMobile? "24" : "20"}`}>Dashboard</Col>
        <Col className='d-col-right' span={4}>
          <div className="btns">
            {
              !isMobile &&
              <Button onClick={() => { navigate('/profile') }} className='d-btn' type="primary" size="small">
                View Profile
              </Button>
            }

          </div>

        </Col>

      </Row>
      <Divider orientation="left"><span className='d-toggle' onClick={() => setShowMessages(prev => !prev)}>{showMessages ? "Hide Messages" : "Show Messages"}</span><MessageOutlined /></Divider>

      <Row>
        <Col className='d-col-left msgs' span={`${isMobile? 24 : 20}`}>
          {
            showMessages &&

            (messages.length > 0 ? messages.map((message, index) => {
              return (
                <div key={index} className="card" style={{ width: "80%" }}>
                  <div onClick={() => setShowMsgDetail(prev => !prev)} className="card-header">
                    From: {message.sender.username}
                  </div>
                  {showMsgDetail && <div className="card-body">
                    <p>{message.message}</p>

                    <blockquote className="blockquote mb-0">
                      {/* {message.sender} */}
                    </blockquote>
                  </div>}
                </div>
              )
            }) : <div className="card" style={{ width: "80%" }}>
              <div className="card-header">
                Received Messages
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>Your inbox is empty</p>
                  {/* <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                </blockquote>

              </div>
            </div>)

          }




        </Col>
        {!isMobile &&
          <Col span={4}>
            <Button onClick={() => { navigate('/messages/create') }} className='d-btn' type="primary" size="small">
              Send a Message
            </Button>
          </Col>
        }

      </Row>
      <Divider orientation="left"><span className='d-toggle' onClick={() => setShowSentMessages(prev => !prev)}>{showSentMessages ? "Hide Sent Messages" : "Show Sent Messages"}</span><SendOutlined /></Divider>
      <Row>
        <Col className='d-col-left msgs' span={`${isMobile? 24 : 20}`}>
          {
            showSentMessages &&

            (sentMessages.length > 0 ? sentMessages.map((message, index) => {
              return (
                <div key={index} className="card" style={{ width: "80%" }}>
                  <div onClick={() => setShowMsgDetail(prev => !prev)} className="card-header">
                    To: {message.receiver.username}
                  </div>
                  {showMsgDetail && <div className="card-body">
                    <p>{message.message}</p>

                    <blockquote className="blockquote mb-0">
                      {/* {message.sender} */}
                    </blockquote>
                  </div>}
                </div>
              )
            }) : <div className="card" style={{ width: "80%" }}>
              <div className="card-header">
                Sent Messages
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>You have not sent any Messages</p>
                  {/* <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                </blockquote>

              </div>
            </div>)

          }




        </Col>


        {
          !isMobile &&
          <Col span={4}>
          <Button onClick={() => { navigate('/messages/create') }} className='d-btn' type="primary" size="small">
            Send a Message
          </Button>
        </Col>
        }
       
      </Row>

      <Divider orientation="left"><span className='d-toggle' onClick={() => setShowBookings(prev => !prev)}>{showBookings ? "Hide Bookings" : "Show Bookings"}</span><BookOutlined /></Divider>

      <Row>
        <Col span={`${isMobile? 24 : 20}`}>
          {
            showBookings &&

            <div className="card" style={{ width: "80%" }}>
              <ul className="list-group list-group-flush">

                {
                  bookings.length > 0 ?
                    bookings.map((booking, index) => {
                      return <li key={index} className="list-group-item booking-item"><div onClick={() => showBookModal(booking.id)}>{booking.car.brand} {booking.car.model} <span>From: {booking.start_date} </span> <span>To: {booking.end_date}</span> <span>{booking.status} </span> </div>
                        {
                          (booking.status === 'Pending' || booking.status === 'Confirmed') &&

                          <Button onClick={() => { handleCancel(booking.id) }} className='d-btn-cancel' type="primary" size="small">
                            Cancel
                          </Button>
                        }
                        {(booking.status === 'Completed' || booking.status === 'Rejected') &&

                          <Button onClick={() => { navToCarReview(booking.car.id) }} className='d-btn-review' type="primary" size="small">
                            Review
                          </Button>
                        }
                      </li>
                    }
                    )
                    : <li className="list-group-item">You have not made any Booking yet</li>

                }
                {/* <li className="list-group-item">An item</li> */}

              </ul>
            </div>
          }

          {isBookModalOpen &&
            <Modal title="Bookings" open={isBookModalOpen} onOk={handleBookModalOk} footer={[
              <Button key="submit" type="primary" onClick={handleBookModalOk}>
                Ok
              </Button>
            ]}>
              <div className="form-container-modal">
                <div className='upper-pane' >
                  <div className="msgs">

                  </div>
                  <h3>Booking</h3>


                  <div className="row frm-rw">


                    <div className="selects">
                      <div className="start">from : {book.start_date}</div>
                      <div className="end"> To: {book.end_date}</div>
                      {
                        <Button onClick={() => { navigate(`/review/car/${book.car.id}/create`) }} className='d-btn-review' type="primary" size="small">
                          Review
                        </Button>
                      }
                    </div>


                  </div>

                  <div className="row frm-rw">

                    <div className="col">
                      <hr />

                      <h5>Brand: <span><b>**</b>{book.car.brand}</span></h5>
                      <h5>Model: <span><b>**</b>{book.car.model}</span></h5>
                      <h5>Color: <span><b>**</b>{book.car.color}</span></h5>
                      <h5>Rate per Hour: <span><b>**</b>{book.car.price} </span></h5>
                      <h5>Posted By: <span><b>**</b>{book.car.user.username}</span></h5>
                      <h5>Number of Hours: <span><b>**</b>{book.total_hours}</span></h5>
                      <h5>Total Cost: <span><b>**</b>{book.total_price}</span></h5>




                    </div>
                  </div>

                </div>
                <div className="lower-pane">
                  <div className="img-container">
                    <img alt="" />
                  </div>
                  <Flex gap="middle" horizontal>
                    <Rate tooltips={desc} value={book.car.rating} disabled />
                  </Flex>
                </div>
              </div>
            </Modal>

          }

        </Col>
        {
          !isMobile &&
          <Col span={4}>
          <Button onClick={() => { navigate(`/home`) }} className='d-btn' type="primary" size="small">
            Book a Car
          </Button>
        </Col>
        }
     
      </Row>
      <Divider orientation="left"><span className='d-toggle' onClick={() => setShowPostings(prev => !prev)}>{showPostings ? "Hide Postings" : "Show Postings"}</span><CarOutlined /></Divider>

      <Row>
        <Col span={`${isMobile? 24 : 20}`}>
          {
            showPostings && <div className="card" style={{ width: "80%" }}>
              <ul className="list-group list-group-flush">
                {
                  postings.length > 0 ?
                    postings.map((posting, index) => {
                      return <li key={index} className="list-group-item" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}><Link to={`/cars/${posting.id}`} >{posting.brand} {posting.model}</Link><Button onClick={() => showModal(posting.id)} size="small">View requests</Button></li>
                    }
                    )
                    : <li className="list-group-item">You have not posted any car yet</li>
                }
                {/* <li className="list-group-item">An item</li> */}

              </ul>
            </div>
          }


        </Col>
{
          !isMobile &&
          <Col span={4}>
          <Button onClick={() => { navigate('/createcar') }} className='d-btn' type="primary" size="small">
            Post a Car
          </Button>
        </Col>
}
      
      </Row>
      <Modal title="Bookings" open={isModalOpen} onOk={handleOk} footer={[
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Ok
        </Button>
      ]}>
        <ul className="list-group list-group-flush">
          {
            carBookings.length > 0 ?
              carBookings.map((booking, index) => {
                return <li key={index} className="list-group-item" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}><Link to={`/bookings/${booking.id}`}>{booking.user.first_name} {booking.start_date} {booking.end_date} {booking.status}</Link>
                  {
                    (booking.status === 'Pending' || booking.status === 'pending') && <div>
                      <Button onClick={() => handleConfirm(booking.id)} size='small'>Confirm</Button>
                      <Button onClick={() => handleReject(booking.id)} size='small'>Reject</Button>
                    </div>
                  }
                  {
                    booking.status === 'Confirmed' && <div>
                      <Button onClick={() => handleComplete(booking.id)} size='small'>Complete</Button>

                    </div>
                  }
                  {
                    booking.status === 'Completed' && booking.car.user.id === loggedInDetail.id && <div>
                      <Button onClick={() => navToUserReview(booking.user.id)} size='small'>Review User</Button>

                    </div>
                  }
                  {
                    booking.status === 'Canceled' && booking.car.user.id === loggedInDetail.id && <div>
                      <Button onClick={() => navToUserReview(booking.user.id)} size='small'>Review User</Button>

                    </div>
                  }
                </li>
              }
              )
              : <li className="list-group-item">No booking requests for this car</li>
          }
        </ul>
      </Modal>

    </div >

  )
};
export default Dashboard;
