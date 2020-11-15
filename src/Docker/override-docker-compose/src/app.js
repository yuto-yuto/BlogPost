console.log("=== START ===")

console.log(`Running for ${process.env.MODE}`);
console.log(`FOO : ${process.env.FOO}`)
console.log(`HOGE: ${process.env.HOGE} `)

console.log("----secrets----")
const secret = require("./config/secrets.json");
console.log(`user: ${secret.user}`);
console.log(`pass: ${secret.password}`);

console.log("=== END ===")