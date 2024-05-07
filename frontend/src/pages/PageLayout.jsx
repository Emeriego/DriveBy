import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer';

const PageLayout = () => {
  return (
    <div className="app-wrapper">

        <Header />
        <Outlet />
        <Footer />

    </div>

  )
}

export default PageLayout
