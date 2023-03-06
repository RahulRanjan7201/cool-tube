import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {YOUTUBE_VIDEOS_API} from '../utils/constant'
import VideoCard, { RedBorderVideoCard } from './VideoCard';
const VideoConatiner = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  },[])
   const  getVideos= async () =>  {
    const data = await fetch(YOUTUBE_VIDEOS_API)
    const json = await data.json();
    setVideos(json.items)
  }
  return (
    <div className='flex flex-wrap'>
     { videos[0] && <RedBorderVideoCard info={videos[0]}/> }
      {
        videos.map((item) => {
         return <Link to={"/watch?v="+item.id} key={item.id}><VideoCard info={item} key={item.id}/></Link>
        })
      }
    
    </div>
  )
}

export default VideoConatiner