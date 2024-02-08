import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';
import { tags } from '../../constants';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [showModal, setShowModal] = useState(false)
  const [imageData, setImageData] = useState({
    url:'',
    alt:''
  })
  
  const handleClickImg = useCallback((img, alt) => {
    setShowModal(true)
    setImageData({url:img, alt:alt})
  },[])

  const imgRef = useRef()
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  // TODO: implement image pinch or zoom feature 
  const ImageModal = useMemo(()=>{
    document.body.style.overflow = showModal ? "hidden" : "auto"
    return showModal
      ? <div 
          className='ImageModal'
          onClick={()=>setShowModal(false)} 
        >
          <QuickPinchZoom onUpdate={onUpdate}>
            <img ref={imgRef} src={imageData.url} alt={imageData.alt} />
          </QuickPinchZoom>
        </div> 
      : null
  },[showModal, imageData,imgRef, onUpdate])

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, [showModal]);
  

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {tags.map((item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.sort((a, b) => new Date(b._updatedAt) - new Date(a._updatedAt)).map((work, index) => (
          <div className="app__work-item app__flex__works" key={index}>
            <div className="app__work-img app__flex" onClick={()=>handleClickImg(urlFor(work.imgUrl), work.name)}>
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                {work.projectLink&&<a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>}
                {work.codeLink&&<a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {ImageModal}
    
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
