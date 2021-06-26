{
    function func(value: string): string {
        return value;
    }
    function func2(value: number): number {
        return value;
    }
    const str = func("123");
    console.log(str.length);
    // 3

    const num = func2(123);
    // console.log(num.length);
    // Property 'length' does not exist on type 'number'.ts(2339)

    function func3(value: unknown): unknown {
        return value;
    }
    function func4(value: any): any {
        return value;
    }
    const unknownResult = func3(123);
    if (!Object.prototype.hasOwnProperty.call(unknownResult, "length")) {
        console.log("unknownResult doesn't have length property.")
    }
    console.log(func4(123).length);
    // undefined

    function func5<T>(value: T): T {
        return value;
    }

    console.log(typeof func5(12));
    console.log(typeof func5("123"));
    console.log(func5("123").length);
    // number
    // string
    // 3

    type myType = { hoge: string, foo: string };
    const hogeFoo: myType = { hoge: "hoge", foo: "foo" };
    console.log(typeof func5(hogeFoo));
    console.log(func5(hogeFoo).foo);
    console.log(func5(hogeFoo).hoge);
    // object
    // foo
    // hoge
}