import React, { useState, useMemo } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailValidateError, setShowEmailValidateError] = useState(false)
  const [showMessageValidateError, setShowMessageValidateError] = useState(false)
  const [showNameValidateError, setShowNameValidateError] = useState(false)

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const EmailValidateError = useMemo(()=>{
    return showEmailValidateError
    ? <p className='p-text-error'>Please input your corrected email address</p>
    : null
  },[showEmailValidateError])

  const MessageValidateError = useMemo(()=>{
    return showMessageValidateError
    ? <p className='p-text-error'>What's your message?</p>
    : null
  },[showMessageValidateError])

  const NameValidateError = useMemo(()=>{
    return showNameValidateError
    ? <p className='p-text-error'>Please leave your name</p>
    : null
  },[showNameValidateError])

  const handleSubmit = () => {
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setShowEmailValidateError(true)
      setLoading(false)
      return
    }
    if (!formData.username) {
      setShowNameValidateError(true)
      setLoading(false)
      return
    }
    if (!formData.message) {
      setShowMessageValidateError(true)
      setLoading(false)
      return
    }

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className="p-text">zoey.xmt@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+852 51114191" className="p-text">+852 51114191</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          {NameValidateError}
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
            {EmailValidateError}
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          {MessageValidateError}
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}

      <div className="copyright">
        <p className="p-text">@2024 Zoey Xu</p>
        <p className="p-text">All rights reserved</p>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);
