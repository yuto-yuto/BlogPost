{
    const greetings = new Map([
        ["hello", { greet: () => console.log("hello") }],
        ["goodbye", { greet: () => console.log("goodbye") }],
        ["hey", { greet: () => console.log("hey") }],
    ]);
    console.log(greetings.get("hello")?.greet());
    console.log(greetings.get("goodbye")?.greet());
    console.log(greetings.get("hey")?.greet());
    console.log(greetings.get("hogehoge")?.greet());

    function func1(greeting: "hello" | "goodbye" | "hey"): void {
        greetings.get(greeting)?.greet();
    }
    console.log("---- func1 ----")
    func1("hey");
    // func1("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)

    type GreetingType = "hello" | "goodbye" | "hey";
    function func2(greeting: GreetingType): void {
        greetings.get(greeting)?.greet();
    }
    console.log("---- func2 ----")
    func2("hey");
    // func2("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)

    enum GreetingEnum {
        Hello = "hello",
        Goodbye = "goodbye",
        Hey = "hey",
    }
    function func3(greeting: GreetingEnum): void {
        greetings.get(greeting)?.greet();
    }
    console.log("---- func3 ----")
    // func3("hey"); // error
    // Argument of type '"hey"' is not assignable to parameter of type 'GreetingEnum'.ts(2345)
    func3(GreetingEnum.Hey);
    func3(GreetingEnum.Hello);


    interface GreetingInterface {
        hello: () => void;
        goodbye: () => void;
        hey: () => void;
    }
    class Greeting implements GreetingInterface {
        public hello() { console.log("hello") }
        public goodbye() { console.log("good bye") }
        public hey() { console.log("hey") }
    }
    const greeting = new Greeting();
    type GreetingKey = keyof GreetingInterface;
    function func4(greetingKey: GreetingKey) {
        greeting[greetingKey]();
    }
    console.log("---- func4 ----")
    func4("hey");
    func4(GreetingEnum.Hello);
    // func4("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)
}