import React, { Component } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './optionPage.css'
class OptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
 
 redirect:false,
 socket:null,
 roomId:''

          }
        this.createRoom=this.createRoom.bind(this);

        this.joinRoom=this.joinRoom.bind(this);

    }



    createRoom()
    {
        
        
        fetch('http://localhost:4000/generateRoomId').then(response => response.json()).then((response)=>{
            
            console.log(response)
           
          
            if(response.success)
            {
                this.props.setRoom(response.roomId)
             
                this.setState({redirect:true})
            }
        })
    }


    joinRoom()
    {
        if(!this.state.roomId) 
        {

            alert("Please Enter room Id");
            return;
        }
                this.props.setRoom(this.state.roomId)
                this.setState({redirect:true})
            
        
    }

    render() { 
       console.log(this.props.state)
       if(this.state.redirect)
       {
           return <Redirect to='/room' />
       }
        return (
            <div className='outerContainer'>

        <div className='Form_Container'>

        <div className='header'>
        <div> <h4>Welcome, {this.props.state.name}</h4></div>
                   </div>
           <div className='createRoom'>
               <div className='createRoomTitle'><h3>create Room:-</h3></div>
               <button className='createRoomButton' onClick={this.createRoom}> Click</button>
               </div>
               <div className='Join'>
                 <h4>Join Room</h4>
               <div className='joinContainers'>
               <div className='connectUser'>
                   <h8>Connect to Single User</h8>
                   <input placeholder='Enter Unique Id:-' />
                       <button>Call</button>
                   </div>

               <div className='joinRoom'>


               <h8>Join Video Call</h8>
                   <input placeholder='Enter Unique Room Id:-' onChange={(e)=>this.setState({roomId:e.target.value})} />
                       <button onClick={this.joinRoom}>Join</button>
                   </div>
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

setRoom:(room)=>dispatch(Actions.SetRoomIdAction(room)),


})
    

export default  connect(mountStateToProps,mountDispatchToProps)(OptionPage);