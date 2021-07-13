{
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

    function func(key: string): void {
        if (key === "hello" || key === "goodbye" || key === "hey") {
            greeting[key]();
            return;
        }
        console.log("not executed.");
    }

    function func1(key: "hello" | "goodbye" | "hey"): void {
        greeting[key]();
    }

    type GreetingType = "hello" | "goodbye" | "hey";
    function func2(key: GreetingType): void {
        greeting[key]();
    }

    enum GreetingEnum {
        Hello = "hello",
        Goodbye = "goodbye",
        Hey = "hey",
    }
    function func3(key: GreetingEnum): void {
        greeting[key]();
    }

    type GreetingKey = keyof GreetingInterface;
    function func4(greetingKey: GreetingKey) {
        greeting[greetingKey]();
    }

    function getHelloString(): string {
        return "hello";
    }
    const hello = getHelloString();

    console.log("---- func ----")
    func("hey");
    func("undefined-key");

    console.log("---- func1 ----")
    func1("hey");
    // func1(hello);
    // func1("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)

    console.log("---- func2 ----")
    func2("hey");
    // func2("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)

    console.log("---- func3 ----")
    // func3("hey"); // error
    // Argument of type '"hey"' is not assignable to parameter of type 'GreetingEnum'.ts(2345)
    func3(GreetingEnum.Hey);
    func3(GreetingEnum.Hello);
    if (hello in GreetingEnum) {
        func2(hello as GreetingEnum);
    }

    console.log("---- func4 ----")
    func4("hey");
    func4(GreetingEnum.Hello);
    // func4("hogehoge"); // error
    // Argument of type '"hogehoge"' is not assignable to parameter of type '"hello" | "goodbye" | "hey"'.ts(2345)
}