import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toogleMenu} from '../utils/appslice'
import { YOUTUBE_SEARCH_API } from '../utils/constant';
import { cachedResults } from '../utils/searchSlice';
const Head = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toogleMenu())
  }
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestion , setSuggestion] =useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCached = useSelector(store => store.search)
  useEffect(() => {
   const timer =  setTimeout(() => {
    if(searchCached[searchQuery]) {
      setSuggestion(searchCached[searchQuery])
    }else {
      getSearchSuggestions();
    }
    }, 200)
    return ()=> {
      clearTimeout(timer)
    }
  },[searchQuery]);
  const getSearchSuggestions = async() => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json();
    setSuggestion(json[1])
    dispatch(cachedResults({
      [searchQuery]:json[1]
    }))
  }
  return (
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
      <div className='flex col-span-1'>
      <img 
      onClick={toggleMenuHandler}
      className='h-8 cursor-pointer' alt='' src='https://static.vecteezy.com/system/resources/thumbnails/002/292/406/small/hamburger-menu-line-icon-free-vector.jpg'/>
   <a href='/'>
    <img className='h-8 mx-2' alt='' src='https://png.pngtree.com/png-clipart/20221018/ourmid/pngtree-youtube-social-media-3d-stereo-png-image_6308427.png'/>
    </a>
    </div>
    <div className='col-span-10 px-10'>
      <input type="text" className='px-5 w-1/2 border border-gray-400 p-2 rounded-l-full' value={searchQuery} onChange={(e) => {
        setSearchQuery(e.target.value)
      }} onFocus={()=> setShowSuggestion(true)} onBlur={()=> setShowSuggestion(false)} onScroll={() => setShowSuggestion(false)}/>
      <button className='border border-gray-400 py-2  px-5 rounded-r-full bg-gray-50' >🔍</button>
     {showSuggestion && 
      <div className='fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100'>
      <ul>
        {suggestion.map(item => {
          return <li key= {item} className='py-2 px-3 shadow-sm hover:bg-gray-100'>🔍 {item}</li>
        } )}
       
      </ul>
    </div>
}
    </div>
    
    <div className='col-span-1'>
      <img className='h-8' alt='user' src='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'/>
    </div>
    </div>
  )
}

export default Head