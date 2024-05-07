import { createSlice} from "@reduxjs/toolkit"

const carSlice = createSlice(
    {
        name: "cars",
        initialState: {
            allCars: [],
            filteredCars: [],
            selectedCar: {},
            msg: ""
        },
        reducers: {
            fetchall(state, action){
                const cars = action.payload
                state.allCars = []
                cars.map(car => {
                    state.allCars.push(car)
                })
                // console.log(state.availProds)
            },
            fetchFilteredCars(state, action){
                const cars = action.payload
                state.filteredCars = []
                cars.map(car => {
                    state.filteredCars.push(car)
                })
                // console.log(state.availProds)
            },
            fetchSelectedCar(state, action){
                const car = action.payload
                state.selectedCar = car
            }
        }
    })
    export default carSlice;
