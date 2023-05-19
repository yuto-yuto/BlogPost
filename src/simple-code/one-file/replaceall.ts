export { };

{
    const text = "abc bbb abc cc 123";

    console.log(text.replace("a", "z"));   // zbc bbb abc cc 123
    console.log(text.replace(/a/, "z"));   // zbc bbb abc cc 123
    console.log(text.replace(/a/g, "z"));  // zbc bbb zbc cc 123

    console.log("--- replaceAll ---")
    console.log(text.replaceAll("a", "z"));  // zbc bbb zbc cc 123
    // console.log(text.replaceAll(/a/, "z")); // zbc bbb zbc cc 123
    console.log(text.replaceAll(/a/g, "z")); // zbc bbb zbc cc 123

}

console.log()
{
    const text = "abc bbb Abc cc 123";

    console.log(text.replaceAll("a", "z"));  // zbc bbb Abc cc 123
    console.log(text.replaceAll(/[aA]/g, "z")); // zbc bbb zbc cc 123
    console.log(text.replaceAll(/a/gi, "z"));   // zbc bbb zbc cc 123
}

console.log("--- multi strings/characters ---")
{
    const text = "ab bb bc Ab ab cc 123 ba";

    console.log(text.replaceAll(/(ab|bc)/g, "zz"));  // zz bb zz Ab zz cc 123 ba
    console.log(text.replaceAll(/(ab|bc)/gi, "zz")); // zz bb zz zz zz cc 123 ba

    console.log(text.replaceAll(/[ab]/gi, "z")); // zz zz zc zz zz cc 123 zz
}
