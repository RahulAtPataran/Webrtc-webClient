import {Types} from './types'
export const AddNameAction=(name)=>({
    type:Types.AddUserName,
    payload:name,
})

export const AddEmailAction=(email)=>({
    type:Types.AddEmail,
    payload:email,
})
export const SetSocketAction=(socket)=>({
    type:Types.SetSocket,
    payload:socket,
})


export const SetRoomIdAction=(roomId)=>({
    type:Types.SetRoomId,
    payload:roomId,
})