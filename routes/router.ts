import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { userRepository } from '../sockets/socket';

export const router = Router();


router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok:true,
        message: 'all ok'
    })
})
router.post('/mensajes', (req: Request, res: Response)=>{
    const body = req.body.body;
    const from = req.body.from;

    const server = Server.instance;
    const payload = {
        body,
        from
    }
    server.io.emit('message-new', payload)
    res.json({
        ok:true,
        body,
        from
    })
})
router.post('/mensajes/:id', (req: Request, res: Response)=>{
    
    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;

    const payload = {
        body,
        from
    }

    const server = Server.instance;
    server.io.in(id).emit('message-private', payload)
    res.json({ok:true})
    
})

router.get('/users', (req: Request, res: Response)=>{
    const server = Server.instance;
    server.io.sockets.allSockets()
    .then(a=>{
        console.log(Array.from(a));
        res.json({ok:true, clients: Array.from(a)})
    })
    .catch(err=>{
        res.json({ok:false, err: err})
    })    
    
})
router.get('/users/info', (req: Request, res: Response)=>{
    res.json({ok:true, clients: userRepository.getUsersList()})
    // const server = Server.instance;
    // server.io.sockets.allSockets()
    // .then(a=>{
    //     console.log(Array.from(a));
    //     res.json({ok:true, clients: Array.from(a)})
    // })
    // .catch(err=>{
    //     res.json({ok:false, err: err})
    // })    
    
    
})