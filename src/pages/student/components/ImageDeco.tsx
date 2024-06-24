import React from 'react'
import logoucad from '../../../assets/ucad.jpeg'; 
import deventure from '../../../assets/section.jpg'; 

function ImageDeco() {
  return (
    <div className="relative w-1/2">
    <img className=" h-80 w-full" src={logoucad} alt="image anta diop" />
    <img className=" h-80 w-full" src={deventure} alt="devanture ucad" />
    <p className='absolute top-40 text-white font-bold  text-5xl text-center left-28'>Vote electronique<br/>Club cesi</p>
    <div className="absolute w-full inset-0 bg-black opacity-50 h-80*2"></div>
  </div>
  )
}

export default ImageDeco
