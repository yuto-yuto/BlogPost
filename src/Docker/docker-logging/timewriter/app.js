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

    console.log(datetime);
}, 10);

function toTwoDigit(value) {
    return value.toString().padStart(2, "0");
}