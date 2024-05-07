import { createSlice} from "@reduxjs/toolkit"

const bookingSlice = createSlice(
    {
        name: "bookings",
        initialState: {
            carBookings: [],
            allBookings: [],
            msg: ""
        },
        reducers: {
            fetchCarBookings(state, action){
                const carBookings = action.payload
                state.carBookings = []
                carBookings.map(booking => {
                    state.carBookings.push(booking)
                })

                // console.log(state.availProds)
            },
            fetchAllBookings(state, action){
                const allBookings = action.payload
                state.allBookings = []
                allBookings.map(bookings => {
                    state.allBookings.push(bookings)
                })
                // console.log(state.availProds)
            },
            
        }
    })
    export default bookingSlice;
