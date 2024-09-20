import React from 'react'
import { Select } from 'antd';
import './signup.css'
import { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { refreshToken } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API_BASE_URL from '../utils/apiConfig';



AOS.init();
const CreateCar = () => {
  const loggedInToken = useSelector(state => state.auth.token)
  const [fileList, setFileList] = useState([])
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [car, setCar] = useState({
    brand: '',
    model: '',
    category: '',
    city: '',
    condition: '',
    power: '',
    price: '',
    location: '',
    color: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categories = ['Luxury', 'Trucks', 'Regular', 'Heavy Vehicles'];
  const cities = ['Lagos', 'Abuja', 'Portharcourt', 'Calabar'];
  const conditions = ['Perfect', 'Brand New', 'Good', 'Fair', 'Bad', 'Very Bad'];
  const powers = ['200', '300', '500', '1000'];

  //   return (
  //     <Upload
  //       name="file"
  //       action="${API_BASE_URL}/upload"
  //       headers={{
  //         Authorization: 'Bearer ' + String(loggedInToken)
  //       }}
  //       fileList={fileList}
  //       onChange={({ fileList }) => setFileList(fileList)}
  //       onSuccess={handleUploadSuccess}
  //     >
  //       <Button icon={<UploadOutlined />}>Click to Upload an image</Button>
  //     </Upload>
  //   );
  // };

  // export default CreateCar;


  const handleChange = (e) => {
    const { name, value } = e.target
    setCar({ ...car, [name]: value })
    // console.log(car)
  }
  const handleSelectChange = (value, name) => {
    setCar({ ...car, [name]: value })
    // console.log(car)
  }


  // i am trying to post a car to database but i need to be sure the token is still valid, so i refresh the token before using it. check to see what Ive done wrong
  // const createCar = async (access) => {
  //   try {
  //     // const tokens = JSON.parse(localStorage.getItem('authToken'))
  //     const response = await fetch('${API_BASE_URL}/cars/create/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Authorization': 'Bearer ' + String(loggedInToken)
  //         'Authorization': 'Bearer ' + String(access)
  //       },
  //       body: JSON.stringify(car)
  //     })
  //     const data = await response.json()
  //     console.log("after create", data)
  //     if (data) {
  //       setSuccess('Car created successfully')
  //       setTimeout(() => {
  //         setSuccess('')
  //       }, 3000)
  //       return response

  //     }
  //   } catch (error) {
  //     console.log(error)
  //     setError('An error occured')
  //     setTimeout(() => {
  //       setError('')
  //     }, 3000)
  //     return error
  //   }
  // }

  const handleCreateCar = async (e) => {
    e.preventDefault()
    const tokens = JSON.parse(localStorage.getItem('authToken'))
    const file = e.target.fileInput.files[0]

    try {

      const refreshedTokens = await refreshToken(tokens)
      // console.log('refreshed tokens', refreshedTokens)
      if (refreshedTokens != null && Object.keys(refreshedTokens).length !== 0) {
        // localStorage.setItem('authToken', JSON.stringify(refreshedTokens));
        dispatch(authActions.login(refreshedTokens));
        JSON.stringify(localStorage.setItem('authToken', JSON.stringify(refreshedTokens)))
        const response = await createCar2(refreshedTokens.access, car, file)
        console.log('response', response)
        navigate('/home')
      } else {
        // dispatch(authActions.logout());
        navigate('/login')
      }

    } catch (error) {
      console.log('error', error)
      navigate('/login')
    }
  }

  const createCar2 = async (access, carData, file) => {
    try {
      const formData = new FormData();
      formData.append('brand', carData.brand);
      formData.append('model', carData.model);
      formData.append('category', carData.category);
      formData.append('city', carData.city);
      formData.append('condition', carData.condition);
      formData.append('power', carData.power);
      formData.append('price', carData.price);
      formData.append('location', carData.location);
      formData.append('color', carData.color);

      if (file) {
        formData.append('image', file);
      }
      console.log("before create data", formData);
      const response = await fetch(`${API_BASE_URL}/api/cars/create/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + String(access)
        },
        body: formData
      });

      const data = await response.json();
      console.log("after create", data);
      if (response.ok) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };



  const handleCreateCar2 = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.fileInput.files[0];
      const tokens = JSON.parse(localStorage.getItem('authToken'));
      console.log("my file", file, "my tokens", refreshedTokens)

      const refreshedTokens = await refreshToken(tokens);
      // dispatch(authActions.login(refreshedTokens));
      localStorage.setItem('authToken', JSON.stringify(refreshedTokens));
      console.log('my refreshed tokens', refreshedTokens)
      // Assuming fileList is defined and contains the uploaded file

      const response = await createCar2(refreshedTokens.access, car, file);

      // Check the response from createCar2 to determine success
      if (response.status === 'done') {
        setSuccess(`${response.name} file uploaded successfully`);
        setSuccess('Car created successfully');
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      } else if (response.status === 'error') {
        setError(`${response.name} file upload failed.`);
      }

    } catch (error) {
      setError('An error occurred');
      setTimeout(() => {
        navigate('/createcar');
      }, 3000);
    }
  };

  // const props = {
  //   name: 'file',
  //   action: '${API_BASE_URL}/cars/create/', // Change the action URL to your Django backend endpoint for creating cars
  //   headers: {
  //     Authorization: `Bearer ${loggedInToken}`,
  //   },
  //   onChange(info) {
  //     if (info.file.status === 'uploading') {
  //       setLoading(true);
  //     }
  //     if (info.file.status === 'done') {
  //       setLoading(false);
  //       setSuccess(`${info.file.name} file uploaded successfully`);
  //       setFileList([info.fileList[info.fileList.length - 1]]);
  //     } else if (info.file.status === 'error') {
  //       setLoading(false);
  //       setError(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onRemove(file) {
  //     setFileList([]);
  //     setFile(null);
  //   },
  // };

  const handleCancel = () => {
    navigate('/')
    console.log('cancel')
  }

  useEffect(() => {
    document.title = 'Create Car'

  }, [])

  return (
    <div className="form-container">
      <div className="right-p">
        <div className="img-container">
          <img data-aos='slide-right' src="./assets/logo2.png" alt="" />
        </div>
      </div>
      <div className='left-p' >

        <form data-aos='slide-left' onSubmit={handleCreateCar} id='frm'>
          <h3>Post A Car</h3>


          <div className="row frm-rw2">
            <div className="col">
              <input type="text" onChange={handleChange} name='brand' className="form-control" placeholder="Car Brand" aria-label="brand" />
            </div>
            <div className="col">
              <input type="text" onChange={handleChange} name='model' className="form-control" placeholder="Model and year" aria-label="model" />
            </div>

          </div>

          <div className="row frm-rw2">
            <div className="col">
              <Select onChange={(value) => handleSelectChange(value, 'power')}
                style={{ width: '100%' }} placeholder='Horse Power'>
                {powers.map((power, index) => (
                  <Select.Option key={index} value={power}>{power}</Select.Option>
                ))}
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>               </div>
            <div className="col">
              <Select onChange={(value) => handleSelectChange(value, 'condition')}
                style={{ width: '100%' }} placeholder='Select Condition'>
                {conditions.map((condition, index) => (
                  <Select.Option key={index} value={condition}>{condition}</Select.Option>
                ))}
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>            </div>

          </div>
          <div className="row frm-rw2">
            <div className="col">
              <Select onChange={(value) => handleSelectChange(value, 'category')}
                style={{ width: '100%' }} placeholder='Select Category'>
                {categories.map((category, index) => (
                  <Select.Option key={index} value={category}>{category}</Select.Option>
                ))}
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>
            </div>
            <div className="col">
              <Select onChange={(value) => handleSelectChange(value, 'city')}
                style={{ width: '100%' }} placeholder='Select City'>
                {cities.map((city, index) => (
                  <Select.Option key={index} value={city}>{city}</Select.Option>
                ))}
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>
            </div>

          </div>
          <div className="row frm-rw2">
            <div className="col">
              <input onChange={handleChange} name='location' type="text" className="form-control" placeholder="Street - Car location" aria-label="Street Address" />
            </div>
            <div className="col">
              <input onChange={handleChange} name='color' type="text" className="form-control" placeholder="Color" aria-label="color" />
            </div>

          </div>
          <div className="row frm-rw2">
            <div className="col">
              <input onChange={handleChange} name='price' style={{ width: '100%' }} type="number" className="form-control" placeholder="Price per hour" aria-label="price" />
            </div>
          </div>
          <div className="frm-rw2">
            {/* <Upload
                name="file"
                customRequest={handleCreateCar}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button style={{ width: '100%' }} icon={<UploadOutlined />}>Click to Upload an image</Button>
              </Upload> */}
            {/* <input type="file" name="fileInput" /> */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
              </div>
              <input type="file" name='fileInput' className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
            </div>
          </div>

          <div className="google-login2">
            <span>See <a href="" className="google">Guide</a> to learn how it works</span>
          </div>
          <div className="row frm-rw2">
            <div className="col">
              <button form='frm' type="submit" style={{ width: '100%' }} className="btn btn-primary">Post</button>
            </div>
            <div className="col">
              <button onClick={handleCancel} style={{ width: '100%' }} className="btn btn-primary">Cancel</button>

            </div>

          </div>
        </form>

      </div>
      
    </div>

  )
}

export default CreateCar
