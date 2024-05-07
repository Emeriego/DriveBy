import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFound = () => {
  return (
    <div>

      <div className="jumbotron lost">
        <h1 className="display-4">404</h1>
        <p className="lead">You are currently No Where</p>
        <hr className="my-4" />
        <p>Don't worry, we got you.</p>
        <Link className="btn btn-primary btn-lg" to="/" role="button">Go back to landing page</Link>
      </div>
    </div>
  )
}

export default NotFound
