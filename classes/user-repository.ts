import { User } from "./user";

export class UsersRepository{
    private list: User[] = [];
    
    constructor(){}

    public addUser(user: User): User{
        this.list.push(user)
        return user;
    }

    public editUser(id: string, name: string){
        let user = this.list.find(u=>u.id === id)
        if(user)
            user.name = name;
    }

    public getUsersList(): User[] {
        return this.list;
    }

    public getUser(id: string): User | undefined {
        return this.list.find(u=>u.id === id)
    }

    public getUsersRoom(room: string): User[] {
        return this.list.filter(u=>u.room === room);
    }

    public removeUser(id: string){
        const tempUser = this.getUser(id);
        this.list = this.list.filter(u=> u.id !== id);
        return tempUser;
    }

}