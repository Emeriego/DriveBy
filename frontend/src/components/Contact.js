import React from 'react';
import { FaPortrait} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
           <>
            <div className='about-container'>
                <div className='about-wrapper xx'>
                    <div className='about-header'>
                <div className='strike-through'></div>
                        <div className='about-title'>
                            <h2>Get In Touch</h2>
                            
                        </div>
                       
                        <small className='small-text'>
                            #94 WhiteHouse Street, Calabar, Cross River State.
                        </small>
                        <div className='map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1581.1103334030809!2d8.32124174394795!3d4.947734691426794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1067863cef3e4bcd%3A0xe26b9c0e4ce551d7!2s24%20White%20House%20Street%2C%20540281%2C%20Calabar%2C%20Cross%20River!5e0!3m2!1sen!2sng!4v1680244707860!5m2!1sen!2sng"></iframe>
                        </div>
                        </div>
                        <div className='about-body form-body'>
                            <div className='form-container'>
                                <form className='form'>
                                <small className='form-text'>Available 24/7 response - we will answer your questions and problems</small>

                                    <input  className='fas input-box' type= "text" placeholder="First Name" />
                                    <input placeholder="Last Name" className='input-box' type= "text" />
                                    <input placeholder="Email" className='input-box' type= "email" />
                                    <input placeholder="Phone" className='input-box' type= "phone" />
                                    <textarea placeholder="Describe" className='input-box' type= "text" />
                                    <input value= "SEND" className='form-btn' type= "submit" />


                                </form>
                            </div>
                         

                        </div>
                        </div>
            </div>
           </>
        )
}
export default Contact;