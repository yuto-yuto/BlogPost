{
    interface Product<T extends string | number> {
        id: T;
        name: string;
    }
    type MyString = string;

    function lookByIdNumber(args: { id: MyString, name: string }): Product<MyString> {
        return {
            id: args.id,
            name: args.name,
        };
    }
}