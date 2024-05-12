import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format, parse, isBefore, isAfter, isWithinInterval, isEqual, set } from 'date-fns';
// import { Button, div, Row, Flex } from 'antd';
import { DatePicker, Space, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
// import {Search} from '';
import '../App.css'
import CarCard from '../components/CarCard';
import { carActions } from '../store';
import axios from 'axios';
import { bookingActions } from '../store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API_BASE_URL from '../utils/apiConfig';




AOS.init();
const Home = () => {
    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    const allCars = useSelector(state => state.cars.allCars)
    const allBookings = useSelector(state => state.bookings.allBookings)
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [filteredCars, setFilteredCars] = React.useState([]);
    const [msg, setMsg] = React.useState([]);
    const [isFiltered, setIsFiltered] = React.useState(false);

    const getAllCars = () => {
        return axios.get(`${API_BASE_URL}/api/cars/`)
            .then((response) => {
                dispatch(carActions.fetchall(response.data.reverse()));
                // console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching cars:", error);
                setMsg(msg => ([
                    ...msg,
                    {
                        "type": "error",
                        "body": "Error fetching cars"
                    }
                ]));

                // Handle the error as needed, such as displaying a message to the user
                throw error; // Rethrow the error to propagate it further if necessary
            });
    }

    const getBookings = () => {
        return axios.get(`${API_BASE_URL}/api/bookings/`)
            .then((response) => {
                dispatch(bookingActions.fetchAllBookings(response.data));
                console.log("from getBookings", response.data)
            })
            .catch((error) => {
                console.error("Error fetching cars:", error);

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



        } else {
            console.log('No time selected');
        }
    };


    const checkAvailability = (from, to) => {
        // Parse 'from' and 'to' dates from the selection
        const fromDate = parse(from, 'dd MM yyyy HH:mm', new Date());
        const toDate = parse(to, 'dd MM yyyy HH:mm', new Date());

        let Filteredlist = allCars; // Clear previous filtered cars
        console.log("Filteredlist", Filteredlist)
        // getBookings(); // Retrieve bookings
        for (let i=0; i< allBookings.length; i++) { // Iterate over all cars
            const bookingFrom = new Date(allBookings[i].start_date);
            const bookingTo = new Date(allBookings[i].end_date);
            // Check for overlap or exact match with existing booking
            if (
                isWithinInterval(fromDate, { start: bookingFrom, end: bookingTo }) ||
                isWithinInterval(toDate, { start: bookingFrom, end: bookingTo }) ||
                (isBefore(fromDate, bookingFrom) && isAfter(toDate, bookingTo)) ||
                isEqual(fromDate, bookingFrom) || isEqual(toDate, bookingTo) ||
                isEqual(fromDate, bookingTo) || isEqual(toDate, bookingFrom)
            ) {
                Filteredlist = Filteredlist.filter(car => car.id != allBookings[i].car.id)
            }
        }
        setFilteredCars(Filteredlist.reverse()); // Update the filtered cars list
        setIsFiltered(true); // Set flag to indicate that filtering is done
    };

    // const checkAvailability2 = (from, to) => {

    //     for (let i = 0; i < bookings.length; i++) { // Iterate over all cars
    //         // let isCarAvailable = true; // Flag to track car availability

    //         // for (let j = 0; j < allCars.length; j++) { // Iterate over all bookings
    //             const bookingFrom = new Date(bookings[i].start_date);
    //             const bookingTo = new Date(bookings[i].end_date);

    //             // if (allCars[i].id === bookings[j].car_id) { // Check if the car is booked

    //                 // Check for overlap or exact match with existing booking
    //                 if (
    //                     isWithinInterval(fromDate, { start: bookingFrom, end: bookingTo }) ||
    //                     isWithinInterval(toDate, { start: bookingFrom, end: bookingTo }) ||
    //                     (isBefore(fromDate, bookingTo) && isAfter(toDate, bookingFrom)) ||
    //                     isEqual(fromDate, bookingTo) ||
    //                     isEqual(toDate, bookingFrom)
    //                 ) {
    //                     // filteredCars.filter(car => car.id !== carIdToRemove);
    //                     Filteredlist = Filteredlist.filter(car => car.id !== bookings[i].car_id)
    //                     console.log("Filteredlist", Filteredlist)
    //                     // isCarAvailable = false; // Car is not available
    //                     // break; // Exit the inner loop as we already found a booking for this car
    //                 }
    //             // }
    //         // }


    //     }
    //     setFilteredCars(Filteredlist); // Update the filtered cars list
    //     setIsFiltered(true); // Set flag to indicate that filtering is done
    // };


    useEffect(() => {
        getAllCars()
        getBookings()
    }, [])
    console.log("filteredCars", filteredCars, filteredCars.length)
    return (
        <div className='container home-wrapper'>

            <div data-aos='fade-down' justify='center' className='searchy'>
                <Col span={16}><span>
                    <RangePicker className='date-picker' showTime={{ format: 'HH:mm' }} format="DD MM YYYY HH:mm" onOk={SetTimeSlot} />
                </span></Col>
                <Col span={4}><button className=' search-btn2' style={{backgroundColor: 'transparent', color: 'white'}} onClick={() => checkAvailability(to, from)}>Filter</button></Col>
            </div>
            {
                isFiltered ? <div className='filtered-info'> <h6>Filter - {filteredCars.length} cars are available for booking for the selected period.</h6></div> : <div> <h6></h6></div>
            }
            <div>
                <hr style={{ color: 'olivedrab', backgroundColor: 'red', marginTop: '10px' }} />
            </div>
            <div data-aos="slide-up" justify='center' className='cars-wrapper'>
                {
                    isFiltered ? filteredCars.map(car => {
                        return (
                            <div key={car.id}>
                                <CarCard car={car} />
                            </div>
                        )
                    }) :
                        allCars.map(car => {
                            return (
                                <div key={car.id}>
                                    <CarCard car={car} />
                                </div>
                            )
                        })
                }



            </div>
        </div>
    )
}

export default Home
