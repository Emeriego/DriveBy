import React from 'react';
import { Link } from 'react-router-dom';
import './Carcard.css'




const Card = ({src, title, button, navTo, text}) => {
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




    return (
        <div class="card" style={{width: "18rem;"}}>
            <img src={src} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{text}</p>
                <a href={navTo} class="btn btn-primary">{button}</a>
            </div>
        </div>








    )
}
export default Card;
