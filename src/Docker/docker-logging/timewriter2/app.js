const fs = require("fs");
const interval = parseInt(process.env.INTERVAL, 10);

setInterval(() => {
    const date = new Date();
    const datetime =
        `${date.getFullYear()}-`
        + `${toTwoDigit(date.getMonth())}-`
        + `${toTwoDigit(date.getDate())} `
        + `${toTwoDigit(date.getHours())}:`
        + `${toTwoDigit(date.getMinutes())}:`
        + `${toTwoDigit(date.getSeconds())}.`
        + `${date.getMilliseconds()}`;

    fs.appendFile("/test.log", datetime, (err) => {
        if (err) {
            console.error(err);
        }
    });
}, interval);

function toTwoDigit(value) {
    return value.toString().padStart(2, "0");
}