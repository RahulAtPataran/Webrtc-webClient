import {Types} from './types'
let initialState={
    name:'',
    email:'',
}
const reducer=(store=initialState,action)=>{

    switch (action.type) {
        case Types.AddUserName:
            return  {...store,name:action.payload};
            
        case Types.AddEmail:
            
            return {...store,email:action.payload};    
        case Types.SetSocket:
            
            return {...store,socket:action.payload};
        case Types.SetRoomId:
            
            return {...store,roomId:action.payload};  
    
        default:
            return store;
    }

}


export default reducer;