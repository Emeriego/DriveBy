import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


AOS.init();
const Guide = () => {
  return (
    <div className='guide-container' data-aos='slide-up' style={{width: '80%'}}>

      <header className="jumbotron text-center">
        <h1>DriveBuy - The Guide</h1>
      </header>
      <main className="container">
        <section id="search" className="py-4">
          <h2>1. Searching for Cars</h2>
          <p>To find available cars, you can use the search feature in our app. Specify your desired location, date, and time to view a list of available cars.</p>
        </section>
        <section id="login" className="py-4">
          <h2>2. Logging In or Sign up</h2>
          <p>Before you can proceed with booking, you need to log in to your account. If you don't have an account yet, you can sign up for one easily.</p>
        </section>
        <section id="select-car" className="py-4">
          <h2>3. Selecting a Car</h2>
          <p>Once logged in, browse through the list of available cars and select the one that best fits your needs. You can view details such as make, model, year, and price per day.</p>
        </section>
        <section id="booking" className="py-4">
          <h2>4. Making a Booking</h2>
          <p>After selecting a car, choose your desired rental duration and proceed to book it. Make sure to review the booking details, including pickup and return locations.</p>
        </section>
        <section id="payment" className="py-4">
          <h2>6. Payment</h2>
          <p>We offer secure payment options to ensure a smooth transaction.</p>
        </section>
        <section id="acceptance and confirmation of payment" className="py-4">
          <h2>5. Acceptance and Confirmation of Payment by car owner</h2>
          <p>Once you've made a booking request, the car owner will review it and either accept or decline it. You'll receive a notification once the owner responds.</p>
        </section>
        
      
        <section id="completion" className="py-4">
          <h2>8. Completion of Deal</h2>
          <p>On the day of the rental, meet the car owner at the designated location to pick up the car. Conduct a walkthrough inspection to ensure the car's condition matches the listing.</p>
        </section>
        <section id="rating" className="py-4">
          <h2>9. Rating and Review</h2>
          <p>After returning the car, you'll have the opportunity to rate and review your experience. This feedback helps maintain the quality of our service and benefits other users.</p>
        </section>
      </main>
      <footer className="text-center py-3">
        <p>&copy; 2024 Peer to Peer Car Rental App</p>
      </footer>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>


    </div>
  )
}

export default Guide
