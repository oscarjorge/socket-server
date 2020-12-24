import { Socket } from "socket.io";
import  socketIO  from 'socket.io';

export const disconnect = (client: Socket)=>{
    client.on('disconnect',()=>{
        console.log('cliente desconectado');
    })
}
export const message = (client: Socket, io: socketIO.Server)=>{
    client.on('message',(payload: {from: string, body: string}, callback)=>{
        console.log('mensaje recibido', payload);
        io.emit('message-new', payload)
    })
}