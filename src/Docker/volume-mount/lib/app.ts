function isFizz(i: number) { return i % 3 === 0; }
function isBuzz(i: number) { return i % 5 === 0; }

function fizzBuzz1() {
    for (let i = 1; i < 100; i++) {
        let out = `${i}: `;
        if (isFizz(i) && isBuzz(i)) {
            out += "FizzBuzz";
        } else if (isFizz(i)) {
            out += "Fizz";
        } else if (isBuzz(i)) {
            out += "Buzz";
        }
        console.log(out);
    }
}

function fizzBuzz2(seed: number) {
    if (seed > 1) {
        fizzBuzz2(seed - 1);
    }
    let out = `${seed}: `;
    if (isFizz(seed) && isBuzz(seed)) {
        out += "FizzBuzz";
    } else if (isFizz(seed)) {
        out += "Fizz";
    } else if (isBuzz(seed)) {
        out += "Buzz";
    }
    console.log(out);
}

console.log("====== solution 1")
fizzBuzz1();

console.log("====== solution 2")
fizzBuzz2(100);