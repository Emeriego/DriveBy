import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authenticateUser } from '../utils/auth'
import { authActions } from '../store'
import './signup.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import API_BASE_URL from '../utils/apiConfig'



AOS.init();

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    console.log(email);
  };
  const getUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    console.log(username);
  };
  const getPhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
    console.log(phone);
  };
  const getPassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const getCpassword = (e) => {
    const cpassword = e.target.value;
    setCpassword(cpassword);
  };
  const getAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const getCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };
  const getFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };
  const getLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };


  const addUserToDB = async (email, password, username, phone, address, firstname, lastname) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, phone, address, firstname, lastname }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  };


  // login this user with the provided details
  const loginUser = async () => {
    try {
      const tokens = await authenticateUser(email, password);
      // Store access token and its expiration time in local storage
      localStorage.setItem('authToken', JSON.stringify(tokens));
      dispatch(authActions.login(tokens));
      // Navigate after successful login
      // setSuccess('Car created successfully')
      // setIsLoading(true)
      // setTimeout(() => {
      //   dispatch(authActions.login(tokens));

      //   setSuccess('')
      //   setIsLoading(false)

      // }, 10000)
      navigate('/home');
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      // setIsLoading(true)
      // setError('Check your details and try again')
      // setTimeout(() => {
      //   setError('')
      //   setIsLoading(false)

      // }, 10000)
      // You might want to display an error message to the user
    }
  };
  // register this user with the provided details
  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match");
      
      return;
    }

    // if (email === "" || password === "" || username === "" || phone === "" || cpassword === "" || address === "" || city === "" || firstname === "" || lastname === "") {
    //   alert("Please fill all the fields");
    //   return;
    // }

    try {
      const data = await addUserToDB(email, password, username, phone, address, firstname, lastname);
      setIsLoading(true)
      setSuccess('Your account has been created successfully')
      setTimeout(() => {
        setIsLoading(false)

        setSuccess('')
      }, 10000)
      loginUser(email, password);
      setTimeout(()=>{
        navigate('/dashboard')
      })

    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      setIsLoading(true)

      setError('Check your details and try again')
      setTimeout(() => {
        setIsLoading(false)

        setError('')
      }, 10000)
      navigate('/login');
      // You might want to display an error message to the user
    }
  };


  return (
    <div className="form-container2">

    <div className="card car-card2 " style={{marginBottom: '0px'}}>

      <div className="card-left">
        <div className="top">
          <h3 className="card-title"> </h3>
          <hr />
        </div>
        <div className="car-img2">
          <img data-aos='slide-up' src="./assets/logo2.png"  className="card-img-top img" alt="..." />

        </div>

       

      </div>

      <div data-aos='slide-up' className="card-body card-right ">
        {/* <hr /> */}
      
        <form className='frm-tag' onSubmit={registerUser}>
          <h3>Signup</h3>
          {error && <div className="alert alert-danger" role="alert">
            {error}
          </div>}
          {success && <div className="alert alert-success" role="alert">
            {success}
          </div>}

          <div className="row frm">
            <div className="col">
              <input type="email" onChange={getEmail} className="form-control" name='email' placeholder="Email" aria-label="Email" />
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <input type="text" onChange={getUsername} className="form-control" placeholder="Username" aria-label="Username" />
            </div>
            <div className="col">
              <input type="text" onChange={getPhone} className="form-control" placeholder="Phone" aria-label="phone" />
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <input type="password" onChange={getPassword} className="form-control" placeholder="Password" aria-label="Password" />
            </div>
            <div className="col">
              <input type="password" onChange={getCpassword} className="form-control" placeholder="Confirm Password" aria-label="Cpassword" />
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <input type="text" onChange={getFirstname} className="form-control" placeholder="First name" aria-label="First name" />
            </div>

          </div> <div className="row frm">
            <div className="col">
              <input type="text" onChange={getLastname} className="form-control" placeholder="Last Name" aria-label="Last name" />
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <input type="text" onChange={getAddress} className="form-control" placeholder="Street Address" aria-label="Street Address" />
            </div>

          </div>
          <div className="row frm">
            <div className="col">
              <input type="text" onChange={getCity} className="form-control" placeholder="City" aria-label="City" />
            </div>


          </div>
          <div className="google-login2">
            <span>Login with <a href="" className="google">Google</a> or <a href="" className="facebook">Facebook</a></span>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>


  </div>





  

  )
}

export default Signup
