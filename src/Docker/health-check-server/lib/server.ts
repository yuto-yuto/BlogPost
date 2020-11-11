import * as restify from "restify";
import { Logger } from "./Logger";

const server = restify.createServer();
const logger = new Logger("restify-server");
let isLastRequestBoss = false;

function respond(
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
) {
    logger.log(`GET request with param [${req.params.name}]`);
    isLastRequestBoss = false;
    if ((req.params.name as string).toUpperCase() === "BOSS") {
        isLastRequestBoss = true;
    }
    res.send('hello ' + req.params.name);
    next();
}
function healthCheck(
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
) {
    res.send(isLastRequestBoss ? 500 : 200);
    next();
}

server.get('/hello/:name', respond);
server.get('/status', healthCheck);
server.head('/hello/:name', respond);

const port = 80;
server.listen(port, function () {
    logger.log(`${server.name} listening at ${server.url}`);
});
