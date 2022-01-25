import React from 'react';
import Header from './components/header/Header'
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import Sidebar from './components/sidebar/Sidebar'

import './style.css'
export default function App() {
  return <div className='app'>
    <Header/>
    <div className='vid-container'>
      <VideoPlayer/>
      <Sidebar/> 
    </div>
  </div>
}
