import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '/assets/add1.png'
import sc1 from '/assets/sc1.png'
import sc2 from '/assets/sc2.png'
import sc3 from '/assets/sc3.png'
import Card from '../components/Card'
import './Index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';




AOS.init();


const index = () => {
    return (

        <div className='container'>

            <div className="jumbotron jumbotron-fluid top-jumbo">
                    {/* <h1 className="display-4">Fluid jumbotron</h1> */}
                    {/* <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p> */}
                    <section className="home-container">
                        <div className="banner-header">
                            <img data-aos='slide-right' src={Banner} width='300px' alt="" className="banner" />

                        </div>
                        <div data-aos='slide-left' className="left-header">
                            <span className="hashtag">A Seamless Representation of Quality Rides</span>
                            <h2 className="bold-text">DRIVEBY <br /></h2>
                            <p className="text">
                                Bringing to you the best of peer to peer car rental services in Nigeria. We offer a wide range of cars to suit your needs. Our cars are well maintained and in top condition. We offer the best prices in the market. We are just a click away.

                            </p>
                            <Link to='/home'> <button className="btn h-btn" style={{color: 'white'}}>Check it out</button></Link>

                        </div>

                    </section>
            </div>

            
            <div className="jumbotron jumbotron-fluid">
            <h1 className="display-4 feat-header">Features</h1>

                <div data-aos='slide-up' className="container features">
                    {/* <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p> */}
                    <Card 
                        src={sc1}
                        title= "Simple, Fast, and Secure"
                        text= "Our platform is designed to make your car rental experience as seamless as possible. With just a few clicks, you can browse, book, and unlock."
                        navTo="/home"
                        button="Check it out"
                    />
                    <Card 
                        src={sc2}
                        title= "Robust Dashboard"
                        text= "Our user-friendly dashboard allows you to manage your bookings, track your rental history, and communicate with car owners."
                        navTo="/login"
                        button="Check it out"
                    />
                    <Card 
                        src={sc3}
                        title= "Rate and Review"
                        text= "Share your feedback with the DRIVEBY community by rating and reviewing your car rental experience. Help others make informed decisions."
                        navTo="/login"
                        button="Check it out"
                    />


                </div>
            </div>
            <div data-aos='slide-left' className="jumbotron" style={{marginBottom: "100px"}}>
                <h1 className="display-4">What to Know about DRIVEBY!</h1>
                <p className="lead">We revolutionize transportation with our peer-to-peer car rental app. Easily rent vehicles from local owners, offering affordable and convenient options for short-term use. Seamlessly browse, book, and unlock cars, promoting sustainability and community sharing.</p>
                <hr className="my-4" />
                <p>Experience hassle-free travel with our intuitive and eco-conscious platform.</p>
                <Link className="btn btn-primary btn-lg" to="/guide" role="button">How it works</Link>
            </div>
        </div>

    )
}

export default index
