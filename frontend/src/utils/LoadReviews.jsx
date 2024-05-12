import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { reviewActions } from '../store'

const getAllUserReviews = async () => {    
    try {
        const response = await axios.get(`${API_BASE_URL}/reviews/allusers/`)
        return response.data
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }

    
}

const calculateRating = (reviews) => {
    console.log('reviews cal',reviews)
    let total = 0
    if (reviews.length === 0) return 0
    reviews.map(review => {
        total += review.rating
    })
    console.log('total',total)
    return total / reviews.length
    // const average = total / reviews.length
    // return Math.round(average)
}

const userRating = async (user) => {
    const allReviews = useSelector(state => state.reviews.allUserReviews)
    try {
        const userReviews = allReviews.filter(review => review.user === user)
        return calculateRating(userReviews)
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}
const userReviews = async (user) => {
    const allReviews = useSelector(state => state.reviews.allUserReviews)

    try {
        const userReviews = allReviews.filter(review => review.user === user)
        return userReviews
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}


const getAllCarReviews = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reviews/allcars/`)
        return response.data
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}

const carRating = async (car) => {

    try {
        console.log('car-rated',car)
        const carReviews = await axios.get(`API_BASE_URL/reviews/car/${car}/`)
        return calculateRating(carReviews.data)
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}

const carReviews = async (car) => {
    const allReviews = useSelector(state => state.reviews.allCarReviews)

    try {
        const carReviews = allReviews.filter(review => review.car === car)
        return carReviews
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}

const postCarReview = async (review, access) => {
    try {
        // console.log('before posting review at utilskkkkkkkkk',review, access)
        const response = await axios.post('API_BASE_URL/cars/review/create/', JSON.stringify(review),
            { headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}` 
            } })
    
            console.log('result of after posting at utils', response.data)
        return response.data
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}

const postUserReview = async (review) => {
    try {
        const response = await axios.post('http://api.driveby.charwin.tech/reviews/user/create/', review)
        return response.data
    }
    catch (error) {
        console.error('Error:', error)
        return null
    }
}

// const loadReviews = async (dispatch) => {
//     // const dispatch = useDispatch()
//     const allUserReviews = await getAllUserReviews()
//     const allCarReviews = await getAllCarReviews()
//     dispatch(reviewActions.loadAllUserReviews(allUserReviews))
//     dispatch(reviewActions.loadAllCarReviews(allCarReviews))
// }


export {userRating, userReviews, carRating, carReviews, postCarReview, postUserReview }

