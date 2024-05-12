import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "./apiConfig";


let authenticateUser = async (email, password) => {
    // const navigate = useNavigate()
    // e.preventDefault()
    let response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": email, "password": password })
    });
    let data = await response.json()
    console.log('data: ', data)
    if (response.status == 200) {
        return data
        // set setAuthToken(data) in store using dispatch
        //  setUser(jwtDecode(data.access))
        // navigate('/')
        // console.log(user, authToken)
    } else {
        console.log("Invalid Credentials")
        // navigate('/login')
        return null
    }
}


let refreshToken = async (tokens) => {
    if (tokens) {
        const decodedToken = jwtDecode(tokens.access);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/login/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "refresh": tokens.refresh })
                });

                if (response.status === 200) {
                    const refreshedTokens = await response.json();
                    return refreshedTokens;
                } else {
                    throw new Error('Refresh token failed');
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                // Handle the error as per your application logic
                return null;
            }
        } else {
            return tokens;
        }
    }
    return null;
};


const setRefreshTokens = async (dispatch, authActions) => {
    const tokens = JSON.parse(localStorage.getItem('authToken'));
    console.log("before refresh:", tokens);
    try {
        const refreshedTokens = await refreshToken(tokens);
        console.log("after refresh", refreshedTokens);
        if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
            localStorage.setItem('authToken', JSON.stringify(refreshedTokens));
            dispatch(authActions.login(refreshedTokens));
            
        } else {
            dispatch(authActions.logout());
            // navigate('/')
        }
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        dispatch(authActions.logout());
        // navigate('/')

    }
};

// let refreshToken = (tokens) => {
//     // const { authToken, user, logout } = useContext(AuthContext)
//     // const tokens = JSON.parse(localStorage.getItem('authToken'))
//     if (tokens) {
//         const decodedToken = jwtDecode(tokens.access);
//         const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

//         // console.log("from token renewal", decodedToken.username, currentTime, decodedToken.exp)
//         if (decodedToken.exp < currentTime) {
//             // Token has expired
//             // console.log('Token has expired');

//             fetch('API_BASE_URL/login/refresh/', {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//             },
//                 body: JSON.stringify({ "refresh": tokens.refresh })
//             })
//                 .then(response => {
//                     if (response.status === 200) {
//                         console.log("responsJson inside refreshToken", response.json())
//                         return response.json();
//                     } else {
//                         throw new Error('Refresh token failed');
//                     }
//                 })
//                 .then(tokens => {
//                     console.log("tokens inside refreshToken",tokens)

//                     // console.log('data from refresh: ', jwtDecode(data.access));
//                     // localStorage.setItem('authToken', JSON.stringify(data));
//                     // dispatch(authActions.login(data))
//                     return tokens
//                     // setUser(jwtDecode(data.access));
//                     // console.log(user, authToken);
//                 })
//                 .catch(error => {
//                     // console.error('Error refreshing token:', error);
//                     // dispatch(authActions.logout())
//                     // navigate('/login');
//                     return null
//                 });
//         }
//         else {
//             return tokens

//         }

//         // dispatch(authActions.logout())
//         // navigate('/login');
//         return null
//     }
// }


// //STUDY AND UNDERSTAND THE FOLLOWING CODE BLOCK -- LOVELY!!
// //////////////////////////////////////////////////////////
// fetch('first-url')
//   .then(response1 => response1.json())
//   .then(data1 => {
//     // Process data from the first fetch
//     console.log(data1);

//     // Make the second fetch using data from the first fetch
//     return fetch('second-url/' + data1.someValue);
//   })
//   .then(response2 => response2.json())
//   .then(data2 => {
//     // Process data from the second fetch
//     console.log(data2);
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('Error:', error);
//   });

// const logoutUser = async () => {
//     const loggedInToken = useSelector(state => state.auth.loggedInToken)
//     localStorage.removeItem('authToken')
    
//     console.log("from logout: ", loggedInToken)
//     // try {
//     //   // Make a POST request to the logout endpoint
//     //   const response = await axios.post('http://api.driveby.charwin.tech/logout', {}, {
//     //     headers: {
//     //       Authorization: `Bearer ${loggedInToken}`
//     //     }
//     //   });
//       dispatch(authActions.logout())
//       // Log the response from the server
//     //   console.log(response.data);
//     // } catch (error) {
//     //   // Log any errors that occur during the request
//     //   console.error('Error:', error);
//     // }
//   };
export { authenticateUser, refreshToken, setRefreshTokens };
