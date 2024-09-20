import React, {useState} from 'react'
import { Modal, Button, Rate, Flex } from 'antd';
import { useEffect } from 'react';
import API_BASE_URL from '../utils/apiConfig';
// import defaultImg from '../assets/default.jpeg'
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const BookingModal = ({bookingId, isBookModalOpen, setIsBookModalOpen}) => {
    const [book, setBook] = useState({});

    const getBookingById = async(bookingId) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/bookings/${bookingId}/booking/`)
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






      <div className="left-side">


<div className="car-title">
  <span><h4>{car.brand + " " + car.model}</h4></span>
</div>



<div className="img-container">
  {/* <img src={`./assets/${car.img}`} alt="" /> */}
  <Image
    // width={500}
    style={{ width: '100%', height: '100%' }}
    // src={`./assets/${car.img}`}
    src={`${API_BASE_URL}/${car.img}`} />
</div>
<div className="rate">

  <Flex gap="middle" horizontal>
    <Rate tooltips={desc} disabled value={car.rating} />
    {car.rating ? <span>{desc[car.rating - 1]}</span> : null}
  </Flex>
</div>
</div>
<div className='right-p' >

{/* <h3>View car</h3> */}


<div className="row frm">

  <div className="col">


  </div>
  <div className="google-login">
    <span>See <a href="" className="google">Guide</a> to learn how it works</span>
    <button onClick={goToBook} type="submit" className="btn btn-primary">Book</button>

  </div>
</div>


</div>
      </Modal>
  )
}
export default BookingModal







