import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  useSearchParams } from 'react-router-dom';
import { closemenu } from '../utils/appslice';
import CommentsContainer from './CommentsContainer';

const WatchPage = () => {
    const [searchParam] = useSearchParams();
    console.log(searchParam.get("v"))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closemenu())
    })
  return (
    <div className='flex flex-col'>
       <div className="px-5">
      <iframe
        width="600"
        height="600"
        src={"https://www.youtube.com/embed/" + searchParam.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      </div>
      <CommentsContainer/>
    </div>
   
  )
}

export default WatchPage