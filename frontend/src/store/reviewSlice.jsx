import { createSlice} from "@reduxjs/toolkit"

const reviewSlice = createSlice(
    {
        name: "reviews",
        initialState: {
            allUserReviews: [],
            allCarReviews: [],
            msg: ""
        },
        reducers: {
            loadAllUserReviews(state, action){
                const reviews = action.payload
                state.allUserReviews = []
                reviews.map(review => {
                    state.allUserReviews.push(review)
                })
                // console.log(state.availProds)
            },
            loadAllCarReviews(state, action){
                const reviews = action.payload
                state.allCarReviews = []
                reviews.map(review => {
                    state.allCarReviews.push(review)
                })
                // console.log(state.availProds)
            }
        }
    })
    export default reviewSlice;
