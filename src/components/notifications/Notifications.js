import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

// Import Socket Context variables from IOContext
import { SocketContext } from '../../IOContext'

const Notifications = () => {
  // destructure variables from socket context
  const { answerCall, call, callAccepted } = useContext(SocketContext)

  return (
    // Shown only when incoming call
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications