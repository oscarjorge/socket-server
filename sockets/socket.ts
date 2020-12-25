import { Socket } from "socket.io";
import  socketIO  from 'socket.io';
import { UsersRepository } from "../classes/user-repository";
import { User } from "../classes/user";

export const userRepository = new UsersRepository();
export const connectClient = (client: Socket, io: socketIO.Server)=>{
    const user = new User(client.id);
    userRepository.addUser(user);
    
    console.log('connectClient', userRepository.getUsersList())
}
export const disconnect = (client: Socket, io: socketIO.Server)=>{
    client.on('disconnect',()=>{
        userRepository.removeUser(client.id);
        io.emit('users', userRepository.getUsersList())
    })
}
export const message = (client: Socket, io: socketIO.Server)=>{
    client.on('message',(payload: {from: string, body: string}, callback)=>{
        console.log('mensaje recibido', payload);
        io.emit('message-new', payload)
    })
}
export const login = (client: Socket, io: socketIO.Server)=>{
    client.on('user-config',(payload: {name: string}, callback)=>{
        console.log('user-config')
        userRepository.editUser(client.id, payload.name);
        io.emit('users', userRepository.getUsersList())
        callback({
            ok:true,
            message: `Usuario ${payload.name} configurado`
        })
        console.log('login', userRepository.getUsersList())
    })
}

export const getUsers = (client: Socket, io: socketIO.Server)=>{
    client.on('get-users',(payload: {name: string}, callback)=>{
        io.to(client.id).emit('users', userRepository.getUsersList())
    })
}