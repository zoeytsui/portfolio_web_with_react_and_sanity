import React from 'react';
import { BsLinkedin, BsGithub, BsWhatsapp } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href='https://hk.linkedin.com/in/zoey-xu-0799451b0'>
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href='https://github.com/zoeytsui'>
        <BsGithub />
      </a>
    </div>
    <div>
      <a href='https://api.whatsapp.com/send?phone=51114191&text=Take%20a%20coffee%20and%20chat%20with%20me'>
        <BsWhatsapp />
      </a>
    </div>
  </div>
);

export default SocialMedia;
