import React from 'react';
import { Badge, Descriptions } from 'antd';
import CarCard from '../components/CarCard';
import { authActions } from '../store';
import './profile.css';

import {useSelector} from 'react-redux'
import API_BASE_URL from '../utils/apiConfig';

const Profile = () => {

const loggedInDetail = useSelector(state => state.auth.loggedInDetail)
const {
  firstname, lastname, email, username, address
} = loggedInDetail

const details = [
  {
    key: '7',
    label: 'Full Name',
    span: 3,
    children: firstname + " " + lastname
  },
  {
    key: '1',
    label: 'Email',
    children: email,
  },
  {
    key: '2',
    label: 'Username',
    children: username,
  },
  {
    key: '3',
    label: 'Location',
    span: 3,
    children: address,
  },
  {
    key: '4',
    label: 'Date Joined',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Five Star User XXX',
    span: 2,
    children: "",
  },
  
  {
    key: '6',
    label: 'Status',
    span: 3,
    children: <Badge status="processing" text="Active" />,
  },
  // {
  //   key: '7',
  //   label: 'Negotiated Amount',
  //   children: '$80.00',
  // },
  // {
  //   key: '8',
  //   label: 'Discount',
  //   children: '$20.00',
  // },
  // {
  //   key: '9',
  //   label: 'Official Receipts',
  //   children: '$60.00',
  // },


];
  return (
    <div className="profile">
      <Descriptions title="Profile" layout="vertical" bordered items={details} />
      {/* Profile */}
    </div>

  )
};
export default Profile;
