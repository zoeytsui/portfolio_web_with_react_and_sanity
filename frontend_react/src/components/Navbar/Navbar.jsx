import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { BsFileEarmarkPerson,BsLinkedin, BsGithub, BsWhatsapp } from 'react-icons/bs';

import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['about', 'work', 'skills', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
              <ul>
                {['about', 'work', 'skills', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <span>
                <a href='https://bit.ly/3Fj1SNs' target='_blank' rel="noreferrer">
                  <BsFileEarmarkPerson />
                </a>
                <a href='https://hk.linkedin.com/in/zoey-xu-0799451b0' target='_blank' rel="noreferrer">
                  <BsLinkedin />
                </a>
                <a href='https://github.com/zoeytsui' target='_blank' rel="noreferrer">
                  <BsGithub />
                </a>
                <a href='https://api.whatsapp.com/send?phone=51114191&text=Take%20a%20coffee%20and%20chat%20with%20me' target='_blank' rel="noreferrer">
                  <BsWhatsapp />
              </a>
              </span>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
