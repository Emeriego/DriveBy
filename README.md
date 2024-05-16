
# DriveBy, A Peer-to-Peer Car Rental App

Welcome to the Peer-to-Peer Car Rental App! This project aims to create a platform where travelers can rent cars from local owners, providing a convenient and affordable transportation solution for both parties.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Have you ever found yourself in a new city, longing for the convenience of your own car? The Peer-to-Peer Car Rental App solves this problem by connecting travelers with local car owners willing to rent out their vehicles. Whether you're a traveler in need of wheels or a car owner looking to earn some extra cash, this app has you covered.

## Features

- *User Authentication*: Secure registration and login for both travelers and car owners.
- *Car Listing*: Car owners can list their vehicles for rent, providing details such as make, model, year, and availability.
- *Booking System*: Travelers can search for available cars, view details, and book rentals for specific dates.
- *Payment Integration*: Secure payment processing for rental transactions, ensuring a smooth and hassle-free experience.
- *Rating and Review System*: Both travelers and car owners can rate and review each other, fostering trust and accountability within the community.

## Technologies Used

- *Frontend*: ReactJS, Redux, CSS
- *Backend*: Node.js, Express.js, Django
- *Database*: *Firebase Realtime Database (for Node.js backend), PostgreSQL (for Django backend)
- *Authentication*: Firebase Authentication
- *Payment Processing*: Stripe API
- *Deployment*: Gunicorn - backend, Nginx - frontend

## Installation

To run the Peer-to-Peer Car Rental App locally, follow these steps:

1. Clone the repository:

   bash
   git clone https://github.com/Emeriego/DriveBy.git
   

2. Navigate to the project directory:

   bash
   cd peer-to-peer-car-rental-app
   

3. Install dependencies:

   bash
   npm install
   

4. Set up environment variables:
   
   - For Node.js backend: Create a .env file in the root directory and add your Firebase configuration details and Stripe API keys.
   
   - For Django backend: Set up your PostgreSQL database and update the DATABASES configuration in settings.py.

5. Run the app:

   - For Node.js backend:
   
     bash
     npm start
     

   - For Django backend:
   
     bash
     python manage.py runserver
     

6. Open your browser and navigate to http://localhost:5173 to access the app.

## Usage

1. Sign up as a traveler or a car owner.
2. Explore available cars and their details.
3. Book a rental for your desired dates.
4. Complete the payment process securely.
5. Rate and review your experience.

## Contributing

Contributions are welcome! If you'd like to contribute to the Peer-to-Peer Car Rental App, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/yourfeature).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/yourfeature).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

