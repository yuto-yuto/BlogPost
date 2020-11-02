import * as restify from "restify";
import * as winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' }),
    ],
});

const server = restify.createServer();
let calledCount = 0;
server.get('/status', (req, res, next) => {
    res.send(`Log called count: ${calledCount}`);
    next();
});

server.post('/log', (req, res, next) => {
    calledCount++;
    try {
        logger.info(`${req.body.name}: ${req.body.data}`);

        res.send(201, "Created");
    } catch (e) {
        logger.error(`name: ${req.body?.name}, data: ${req.body?.data}`);
        res.send(400, "Bad Request");
    }
    next();
});

server.use(restify.plugins.bodyParser());

const port = 80;
server.listen(port, function () {
    logger.info(`${server.name} listening at ${server.url}`);
});
