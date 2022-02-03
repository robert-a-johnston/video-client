import React from 'react'
// import { Typography, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Header from './components/header/Header'
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import Sidebar from './components/sidebar/Sidebar'
import Notifications from './components/notifications/Notifications'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <div>
      <Header/>
      <div className={classes.wrapper}>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </div>
  )
}

export default App
