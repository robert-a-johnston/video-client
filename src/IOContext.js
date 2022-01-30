import React, { createContext, useState, useRef, useEffect } from 'react'
// initialize socket io client
import { io } from 'socket.io-client'
// Peer connections are distinct from connections to a server 
// because they allow for direct exchange of information between peers, 
// rather than going through a server.
import Peer from 'simple-peer'

const SocketContext = createContext()

// Connect socket to server domain
const socket = io('http://localhost:5000')

// get children from props

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [stream, setStream] = useState(null)
  const [name, setName] = useState('')
  const [call, setCall] = useState({})
  const [me, setMe] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  // When component mounts 
  useEffect(() => {
    // gets permission to use video/audio
    // navigator is built in that returns a promise
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        // Sets ref to current stream
        myVideo.current.srcObject = currentStream
      })

    // Listen for 'me' action from server gets id
    // Then sets id
    socket.on('me', (id) => setMe(id))

    // Listens for 'callUser' action gets user
    // data from, caller name and signal
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      // set call object
      setCall({ isReceivingCall: true, from, name: callerName, signal })
    })
  }, [])

  // ANSWER CALL FUNCTION
  const answerCall = () => {
    setCallAccepted(true)
    // create peer object
    // trickle: false indicates the only a single event can be emitted from the peer object
    const peer = new Peer({ initiator: false, trickle: false, stream })

    // peer to listen for signal and use socket to emit that data.
    // When answering call
    peer.on('signal', (data) => {
      // socket io emits to the server the information to be sent to other peer
      socket.emit('answerCall', { signal: data, to: call.from })
    })

    // peer to listen for stream and connect with other peer
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }
  
  // CALL FUNCTION
  const callUser = (id) => {
    // create new peer object
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    // listens for call accepted
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)

      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  // END CALL FUNCTION
  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }