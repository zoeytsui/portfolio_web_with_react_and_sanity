import React from 'react';
import { BsFileEarmarkPerson,BsLinkedin, BsGithub, BsWhatsapp } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href='https://bit.ly/3Fj1SNs' target='_blank' rel="noreferrer">
        <BsFileEarmarkPerson />
      </a>
    </div>
    <div>
      <a href='https://hk.linkedin.com/in/zoey-xu-0799451b0' target='_blank' rel="noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href='https://github.com/zoeytsui' target='_blank' rel="noreferrer">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href='https://api.whatsapp.com/send?phone=51114191&text=Take%20a%20coffee%20and%20chat%20with%20me' target='_blank' rel="noreferrer">
        <BsWhatsapp />
      </a>
    </div>
  </div>
);

export default SocialMedia;
