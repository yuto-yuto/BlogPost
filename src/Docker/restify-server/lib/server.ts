import * as restify from "restify";
import { Logger } from "./Logger";

const server = restify.createServer();
const logger = new Logger("restify-server");

function respond(
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
) {
    logger.log(`GET request with param [${req.params.name}]`);
    res.send('hello ' + req.params.name);
    next();
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

const port = 80;
server.listen(port, function () {
    logger.log(`${server.name} listening at ${server.url}`);
});
