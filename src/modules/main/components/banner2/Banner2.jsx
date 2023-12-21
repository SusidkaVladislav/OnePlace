import React, { useState, useEffect } from 'react';
import { Hidden } from "@mui/material";
import './Banner2.css';
import slide1 from './slide1.png';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import slide4 from './slide4.png';


const Banner2 = () => {
  const [currentDiv, setCurrentDiv] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDiv((currentDiv + 1) % 4);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentDiv]);

  return (
    <div>
       <Hidden mdDown>
          <div className='bg2'>
        <div className="bg1 unselectable"> 
          {currentDiv === 0 && (
                <div className='slide slide1'>
                  <div className='text'>
                  <h2>Навушники</h2>
                  </div>
                  <img className='image' src={slide1}></img>
                </div>
          )}
          {currentDiv === 1 && (
            <div className='slide slide2'>
            <div className='text'>
            <h2>Чохли для</h2>
            <h2>cмартфонів</h2>
            </div>
            <img className='image' src={slide2}></img>
          </div>
          )}
          {currentDiv === 2 && (
          <div className='slide slide3'>
          <div className='text'>
          <h2>На смартфони</h2>
          <h2>До -47%</h2>
          </div>
          <img className='image' src={slide3}></img>
        </div>
          )}
          {currentDiv === 3 && (
          <div className='slide slide4'>
          <div className='text'>
          <h2>Чоловічі футболки</h2>
          </div>
          <img className='image' src={slide4}></img>
        </div>
          )}
        </div>
        </div>
      </Hidden>
      <Hidden mdUp>
      <div className='bg2'>
        <div className="bg1-sm unselectable"> 
          {currentDiv === 0 && (
                <div className='slide-sm slide1'>
                  <div className='text'>
                  <h2 className="text-sm">Навушники</h2>
                  </div>
                  <img className='image-sm' src={slide1}></img>
                </div>
          )}
          {currentDiv === 1 && (
            <div className='slide-sm slide2'>
            <div className='text'>
            <h2 className="text-sm">Чохли для</h2>
            <h2 className="text-sm">смартфонів</h2>
            </div>
            <img className='image-sm' src={slide2}></img>
          </div>
          )}
          {currentDiv === 2 && (
          <div className='slide-sm slide3'>
          <div className='text'>
          <h2 className="text-sm">На смартфони</h2>
          <h2 className="text-sm">До -47%</h2>
          </div>
          <img className='image-sm' src={slide3}></img>
        </div>
          )}
          {currentDiv === 3 && (
          <div className='slide-sm slide4'>
          <div className='text'>
          <h2 className="text-sm">Чоловічі футболки</h2>
          </div>
          <img className='image-sm' src={slide4}></img>
        </div>
          )}
        </div>
        </div>
      </Hidden>
    </div>
   
   
  );
};

export default Banner2;
