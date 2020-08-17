import React, { Component } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './room.css'
import Peer from 'peerjs'

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
 
 redirect:false,
 socket:null,
 users:[],
 


          }

          this.socket=io('localhost:4000');

          this.myPeer = new Peer(
               
     )
     this.id='';
          this.peers={};  
          this.stream=null;       
          this.myVideoGrid=React.createRef();
          this.videoGrid=React.createRef();
      this.connectToNewUser=this.connectToNewUser.bind(this)
      this.addVideoStream=this.addVideoStream.bind(this)
     
        
    }
    

    componentDidMount()
    {
      
    
        
        const myVideo = document.createElement('video')
          myVideo.muted = true
          
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {
            
            this.stream=stream;
            myVideo.srcObject = stream;
            myVideo.className='myVideo'
            myVideo.addEventListener('loadedmetadata', () => {
              myVideo.play()
            })
            this.myVideoGrid.current.append(myVideo)
            this.myPeer.on('call', call => {
                alert("call aaya")
              call.answer(stream)
              const video = document.createElement('video')
              call.on('stream', userVideoStream => {
                this.addVideoStream(video, userVideoStream)
              })
            })
            
        
            this.socket.on('user-connected', userId => {
                alert("new user"+userId)
                this.connectToNewUser(userId, stream)
              })
        })

      
        this.socket.on('user-disconnected', userId => {
          if (this.peers[userId]) this.peers[userId].close()
        })
        
        this.myPeer.on('open', id => {
            alert(id)
            this.id=id
          this.socket.emit('join', {name:this.props.state.name,email:this.props.state.email,roomId:this.props.state.roomId,userId:id},(response)=>{
            if(!response.success)
            {
                alert(response.message);
                this.setState({redirect:true})   
            }

        })
        })
    }

   

     connectToNewUser(userId, stream) {
        const call = this.myPeer.call(userId, stream)
        const video = document.createElement('video')
        if(call)
        {
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
          video.remove()
        })
      
        this.peers[userId] = call
      }}
      
      addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        this.videoGrid.current.append(video)
      }

    



    render() { 
       console.log(this.props.state)
       if(this.state.redirect)
       {
          return <Redirect to='/' />
       }
        return (

            <div className='outerContainer'>

        <div className='Container'>

        <div className='header'>
        <div className='nameH'> <h4>Welcome, {this.props.state.name}</h4></div>
        <div className='roomId'><h4>Room Id:-{this.props.state.roomId}</h4></div>
       </div>

       <div className='videoGrid'>
        <div className='videoGridMain'>

            <div className='myVideoGrid' ref={this.myVideoGrid}>
               
                </div>
            </div>




        <div className='videoGridUsers' ref={this.videoGrid}>

  

            </div>

           </div>
          
            </div>
            </div>
          );
    }
}
const mountStateToProps=(state)=>({
state:state
})

const mountDispatchToProps=(dispatch)=>({



})
    

export default  connect(mountStateToProps,mountDispatchToProps)(Room);