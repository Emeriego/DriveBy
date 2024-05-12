import React from 'react'
import { Dropdown, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './header.css'


import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store';
import { FaPortrait } from 'react-icons/fa'
import LogoutListener from '../utils/LogoutListener';
import logo from '/assets/logo2.png'
import { MenuOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';





const Header = () => {
    const loggedInToken = useSelector(state => state.auth.loggedInToken)
    const loggedInDetail = useSelector(state => state.auth.loggedInDetail)
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = React.useState(true)
    const [isOpenMenu, setOpenMenu] = React.useState(false)

    // const handleMenuClick = (e) => {
    //     message.info('Click on menu item.');
    //     console.log('click', e);
    // };



    const logoutUser = async () => {
        localStorage.setItem('logout', Date.now().toString());
        localStorage.removeItem('authToken')

        // console.log("from logout: ", loggedInToken)
        // try {
        //   // Make a POST request to the logout endpoint
        //   const response = await axios.post('http://api.driveby.charwin.tech/logout', {}, {
        //     headers: {
        //       Authorization: `Bearer ${loggedInToken}`
        //     }
        //   });
        dispatch(authActions.logout())
        console.log("from logout: ", loggedInToken)
        // Log the response from the server
        //   console.log(response.data);
        // } catch (error) {
        //   // Log any errors that occur during the request
        //   console.error('Error:', error);
        // }
    };
    const items = [
        {
            label: (<div style={{ color: 'black !important' }}><Link style={{ backgroundColor: 'transparent', textDecoration: 'none', color: 'black' }} to={`/dashboard`}>Dashboard</Link></div>),
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: (<div style={{ color: 'black !important' }}><Link style={{ backgroundColor: 'transparent', textDecoration: 'none', color: 'black' }} to={`/profile`}>Profile</Link></div>),
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: (<div style={{ color: 'black !important' }}><Link style={{ backgroundColor: 'transparent', textDecoration: 'none', color: 'black' }} to={`/home`}>Book a Car</Link></div>),
            key: '3',
            icon: <UserOutlined />,
            // danger: true,
        },
        {
            label: (<div style={{ color: 'black !important' }}><Link style={{ backgroundColor: 'transparent', textDecoration: 'none', color: 'black' }} to={`/createcar`}>Post a Car</Link></div>),
            key: '4',
            icon: <UserOutlined />,
            // danger: true,
            // disabled: true,
        },
        {
            label: (<span onClick={logoutUser}>Logout</span>),
            key: '5',
            icon: <UserOutlined />,
            // danger: true,
            // disabled: true,
        },
    ];

    const menuProps = {
        items,
        // onClick: handleMenuClick,
    };

    return (
        <div className="header-container">
            <div className="header-wrapper">
                <Link to='/home' className="brand" href="#">
                    <img src={logo} style={{ width: '40px', paddingRight: '10px' }} alt="" />
                    <span className='brand-name'>DriveBy</span>
                    {/* <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" loading="lazy"/> */}
                </Link>
                <div className="menu">


                    <ul className="nav justify-content-center">

                        {
                            !loggedInToken &&
                            <li className="nav-item">
                                <Link to='/signup' className="nav-link" >Signup</Link>
                            </li>
                        }


                        <li className="nav-item">
                            <Link to='/guide' className="nav-link">Guide</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/home`} className="nav-link" href="#" tabindex="-1" aria-disabled="true">Rent a Car</Link>
                        </li>
                    </ul>

                </div>
                <div className="mobile-menu-wrapper">
                    {
                        isOpenMenu ?
                            <UpOutlined
                                onClick={() => setOpenMenu(!isOpenMenu)}
                            />
                            :
                            <DownOutlined
                                onClick={() => setOpenMenu(!isOpenMenu)}
                            />
                    }

                    {
                        isOpenMenu &&
                        <ul className=" mobile-menu nav ">
                            <div className="signature">
                                {
                                    loggedInToken ?
                                        <Space wrap>
                                            <Dropdown.Button className='profile-dropdown ' menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                                                {`${loggedInDetail.username}'s Dashboard`}
                                            </Dropdown.Button>
                                        </Space>

                                        :
                                        // <button type="button" className="btn btn-primary bg-dark">
                                        <Link to='/login'>Login</Link>
                                    // {/* </button> */}
                                }
                            </div>
                            {
                                !loggedInToken &&
                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link" >Signup</Link>
                                </li>
                            }


                            <li className="nav-item">
                                <Link to='/guide' className="nav-link">Guide</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/home`} className="nav-link" href="#" tabindex="-1" aria-disabled="true">Rent a Car</Link>
                            </li>

                        </ul>

                    }

                </div>


                <div className="right-menu">
                    {
                        loggedInToken ?
                            <Space wrap>
                                <Dropdown.Button className='profile-dropdown ' menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                                    {`${loggedInDetail.username}'s Dashboard`}
                                </Dropdown.Button>
                            </Space>

                            :
                            // <button type="button" className="btn btn-primary bg-dark">
                            <Link to='/login'>Login</Link>
                        // {/* </button> */}
                    }


                </div>
            </div>
        </div>

    )
}

export default Header
