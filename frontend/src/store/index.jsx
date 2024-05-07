import {configureStore} from "@reduxjs/toolkit"
import carSlice from "./carSlice"
import authSlice from "./authSlice"
import bookingSlice from "./bookingSlice"
import reviewSlice from "./reviewSlice"

const store = configureStore({
    reducer: {
        cars: carSlice.reducer,
        auth: authSlice.reducer,
        bookings: bookingSlice.reducer,
        reviews: reviewSlice.reducer
    }
})

export const carActions = carSlice.actions;
export const authActions = authSlice.actions;
export const bookingActions = bookingSlice.actions;
export const reviewActions = reviewSlice.actions;


export default store;
