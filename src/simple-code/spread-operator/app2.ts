{
    const obj = {
        foo: 123,
        hoge: 44,
        name: "obj-name",
    };
    const newObj = Object.assign({}, obj);
    console.log(newObj);
    const objToUpdate = { added: "HEY", foo: "Updated foo" };
    const addedObj = Object.assign({}, obj, objToUpdate);
    console.log(addedObj);

    console.log(`obj === result: ${obj === newObj}`);
    const copyObj = { ...obj };
    console.log(`obj === result: ${obj === copyObj}`);

    console.log("-----")
    const person = {
        _name: "YUTO",
        set name(value: string) {
            this._name = "yuto";
        }
    };
    const department = {
        name: "R&D",
    };
    console.log({ ...person, ...department });
    console.log(Object.assign(person, department));
}