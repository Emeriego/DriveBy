import React, {useState} from 'react'
import { Modal, Button, Rate, Flex } from 'antd';
import { useEffect } from 'react';
// import defaultImg from '../assets/default.jpeg'
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const BookingModal = ({bookingId, isBookModalOpen, setIsBookModalOpen}) => {
    const [book, setBook] = useState({});

    const getBookingById = async(bookingId) => {
        try {
          const response = await axios.get(`http://api.driveby.charwin.tech/api/bookings/${bookingId}/booking/`)
          return await response.data
          // setCar(data)
        }
        catch (err) {
          console.log(err)
        }
      }
      
      const handleBook = async(bookingId) => {
        // const mybook = bookings.find(booking => booking.id === bookingId);
        const mybook = await getBookingById(bookingId)
        setBook(mybook);
        console.log('mybook', mybook)
        // setIsBookModalOpen(true);
      
    };
      const handleBookModalOk = () => {
        setIsBookModalOpen(false);
      };

      useEffect(()=>{
        handleBook(bookingId)
        console.log("booooo",bookingId)
      }, [])

  return (
    <Modal title="Bookings" open={isBookModalOpen} onOk={handleBookModalOk} footer={[
        <Button key="submit" type="primary"  onClick={handleBookModalOk}>
          Ok
        </Button>
      ]}>
        <div className="form-container-modal">
          <div className='upper-pane' >
            <div className="msgs">

            </div>
            <h3>Booking</h3>


            <div className="row frm-rw">


              {/* <button className='btn' style={{color: 'red'}} onClick={() => checkAvailability(to, from)}>check availability</button> */}
              <div className="selects">
                {/* <div className="start">from : { book.start_date}</div> */}
                {/* <div className="end"> To: {book.end_date }</div> */}
              </div>
              {
                <Button onClick={() => { navigate(`/review/${book.id}/create`) }} className='d-btn' type="primary" size="small">
                  Review
                </Button>}

            </div>

            <div class="row frm-rw">

              <div class="col">
                <hr />

                {/* <h5>Brand: <span><b>**</b>{book.car.brand}</span></h5>
                <h5>Model: <span><b>**</b>{book.car.model}</span></h5>
                <h5>Color: <span><b>**</b>{book.car.color}</span></h5>
                <h5>Rate per Hour: <span><b>**</b>{book.car.price} </span></h5>
                <h5>Posted By: <span><b>**</b>{book.car.user.username}</span></h5> */}
                <h5>Number of Hours: <span><b>**</b>{}</span></h5>
                <h5>Total Cost: <span><b>**</b>{ }</span></h5>




              </div>
            </div>

          </div>
          <div className="lower-pane">
            <div className="img-container">
              <img  alt="" />
            </div>
            <Flex gap="middle" horizontal>
              <Rate tooltips={desc} value={3} />
            </Flex>
          </div>
        </div>
      </Modal>
  )
}

export default BookingModal
