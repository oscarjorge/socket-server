import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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