// apiConfig.js

const API_BASE_URL = 'http://localhost:8000';

export default API_BASE_URL;



// PLEASE READ THIS 

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// this would be the next level axios calls.
// the next axios you'd write must follow this pattern.

// import axios from 'axios';
// import API_BASE_URL from './apiConfig';

// const DEFAULT_HEADERS = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_AUTH_TOKEN'
// };

// // Example API call using Axios
// axios({
//     method: 'post',
//     url: `${API_BASE_URL}endpoint`,
//     data: {
//         // Request data
//     },
//     headers: DEFAULT_HEADERS // Using the default headers
// })
// .then(response => {
//     // Handle response
// })
// .catch(error => {
//     // Handle error
// });

