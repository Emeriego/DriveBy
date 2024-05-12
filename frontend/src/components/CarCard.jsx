import React from 'react';
import { Link } from 'react-router-dom';
import './Carcard.css'
import { Rate, Flex } from 'antd';
import { carRating } from '../utils/LoadReviews';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API_BASE_URL from '../utils/apiConfig';


AOS.init();

const CarCard = ({ car }) => {
    // const [rating, setRating] = useState(3)
    // console.log("carxxxx", car)



    // const rt = async (car) => {
    //     const rate = await carRating(car)
    //        console.log("rateyyyyy",car)
    //     setRating(rate)
    // }
    // useEffect(() => {
    //     if (car && car.id) {
    //         rt(car.id);
    //     }
    // }, [car]); // Adding car as a dependency
  
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

 

    return (
        <Link className='cad-wrap' to={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
            <div className="card car-card " style={{ width: "16rem" }}>
                <img data-aos='slide-up' src={`${API_BASE_URL}${car.img}`} className="card-img-top imgg" alt="..." />
                <Flex gap="0" horizontal>
                    <Rate tooltips={desc} value={car.rating} className='rate' disabled/>
                    {car.rating !== 0 ? <span className='rate2'>{`${car.numReviews} reviews`}</span> : <small className='rate'> No reviews</small> }
                </Flex>
                <div data-aos='slide-up' className="card-body cbody">
                    <h5 className="card-title">{`${car.brand}  ${car.model}`}</h5>
                    <div className="card-text det">HP: <span>{car.power}</span></div>
                    <div className="card-text det">Color: <span>{car.color}</span></div>
                    <div className="card-text det">Location: <span>{car.city}</span></div>
                    <div className="card-text det">Rate per hour: <span>{car.price}</span></div>
                </div>
                <div className="btncard">
                    <Link to={`/book/${car.id}`} className="btn btn-primary custom-btn bg-dark">Book</Link>

                </div>

            </div>
        </Link>








    )
}
export default CarCard;
