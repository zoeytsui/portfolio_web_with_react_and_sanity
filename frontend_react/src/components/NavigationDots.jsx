/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, {  useState } from 'react';

const NavigationDots = ({ active }) => {
  const [tag,setTag] = useState('about')
  
  return (
    <div className='app__navigation'>
      <div className="app__navigation-flex">
        {['about', 'work', 'skills', 'contact'].map((item, index) => (
          <a
          href={`#${item}`}
          onClick={()=>setTag(item)}
          key={item + index}
          className="app__navigation-dot"
          style={tag === item ? { backgroundColor: '#313BAC' } : {backgroundColor: 'rgb(53, 58, 60)'}}
          />
          ))}
        </div>
    </div>
  )
};

export default NavigationDots;
