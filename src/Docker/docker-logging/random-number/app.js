const interval = parseInt(process.env.INTERVAL, 10);
let count = 0;

setInterval(() => {
    console.log(`count: ${++count}, value: ${getRandomInt(100)}`);
}, interval);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}