import React from 'react';
import { Link } from 'react-router-dom';
import './Carcard.css'




const Card = ({src, title, button, navTo, text}) => {

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
