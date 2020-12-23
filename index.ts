
import Server from "./classes/server";
import { SERVER_PORT } from "./globals/environment";
import { router } from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();
//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
//CORS
server.app.use( cors({ origin: true, credentials: true }))

//Router init
server.app.use('/', router);
//Server init
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${ SERVER_PORT }`)
})