import React, { Component } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './home.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
 name:'',
 email:'',
 redirect:false,
 socket:null

          }
          this.submitHandler=this.submitHandler.bind(this);
    }



submitHandler()
{
        this.props.addName(this.state.name);
        this.props.addEmail(this.state.email);
       
    
        this.setState({redirect:true})
    
    
}


    render() { 
        if(this.state.redirect)
        {
            return <Redirect to='/option' />
        }
        return (
            <div className='outerContainer'>

        <div className='Form_Container'>
            <h2>Login</h2>
            <input className='nameInput' onChange={(e)=>this.setState({name:e.target.value})} placeholder='Enter Name' />
            <input className='emailInput' placeholder='Enter Email' onChange={(e)=>this.setState({email:e.target.value})} />
            <button className='submitButton' onClick={this.submitHandler} > Login</button>
            </div>
            </div>
          );
    }
}
const mountStateToProps=(state)=>({
state:state
})

const mountDispatchToProps=(dispatch)=>({

addName:(name)=>dispatch(Actions.AddNameAction(name)),
addEmail:(email)=>dispatch(Actions.AddEmailAction(email)),


})
    

export default  connect(mountStateToProps,mountDispatchToProps)(Home);