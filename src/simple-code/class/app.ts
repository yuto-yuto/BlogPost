import { CommandExecutor, ExecutorBase, ProcessExecutor } from "./Abstract";
import { BaseClass } from "./BaseClass";
import { Person, PersonClass, Yuto } from "./ClassWithInterface";
import { Developer, ExtendedClass } from "./ExtendedClass";
import { PersonHolder } from "./Generics";
import { PrivateConstructor } from "./PrivateConstructor";
import { Singleton, Singleton2 } from "./Singleton";
import { call1 } from "./without/Caller1";
import { call2 } from "./without/Caller2";

{
    call1();
    call2();
}

{
    console.log("---- class ----");
    const instance = new BaseClass();
    console.log(instance.exposedProp);
    instance.exposedProp = 22;
    console.log(instance.exposedProp);

    console.log(instance.readonlyProp);

    console.log(BaseClass.staticProp);
    BaseClass.staticProp = "update-static-prop";
    console.log(BaseClass.staticProp);
    console.log(BaseClass.readonlyStaticProp);
    // BaseClass.readonlyStaticProp = "update-error";

    instance.callPublicFunc();
    instance.callPublicFunc();
    const instance2 = new BaseClass();
    instance2.callPublicFunc();

}

{
    console.log("---- class implements interface ----");
    const yuto = new Yuto();
    console.log(yuto.name)
    yuto.introduce();
    yuto.develop();

    const person = new PersonClass("Joe");
    console.log(person.name);
    person.introduce();
}

{
    console.log("---- extended class ----");
    const martin = new ExtendedClass("Martin");
    console.log(martin.name);
    martin.introduce();

    const anonymous = new Developer("anonymous");
    console.log(anonymous.name);
    anonymous.introduce();
    anonymous.develop();

    const downCasted: PersonClass = anonymous;
    downCasted.introduce();
    // downCasted.develop(); // error
}

{
    console.log("---- class private constructor ----");
    const instance = PrivateConstructor.create("name1");
    instance.sayHello();
    // const error = new PrivateConstructor(); // error
    // Constructor of class 'PrivateConstructor' is private and only accessible within the class declaration.ts(2673)
}

{
    console.log("---- singleton class ----");
    console.log(Singleton.getInstance.count);
    console.log(Singleton.getInstance.count);
    (Singleton as any)._count = 0;
    console.log(Singleton.getInstance.count);
    (Singleton as any).instance = undefined;
    console.log(Singleton.getInstance.count);

    console.log(Singleton2.getInstance.count);
    (Singleton2 as any).instance = undefined;
    // console.log(Singleton2.getInstance.count);

}

{
    console.log("---- Generic class ----");
    const holder1 = new PersonHolder<Yuto>();
    holder1.push("first", new Yuto());
    holder1.push("second", new Yuto());
    holder1.push("third", new Yuto());
    const yuto = holder1.get("second");
    // holder1.push("error", new PersonClass("person1")); // error
    // Argument of type 'PersonClass' is not assignable to parameter of type 'Yuto'.
    // Types of property 'name' are incompatible.
    //   Type 'string' is not assignable to type '"Yuto"'.ts(2345)

    const holder2 = new PersonHolder<PersonClass>();
    holder2.push("first", new PersonClass("person1"));
    holder2.push("second", new PersonClass("person2"));
    const person1 = holder1.get("first");

    const holder3 = new PersonHolder<Developer>();
    holder3.push("dev1", new Developer("Bob"));
    holder3.push("dev2", new Developer("Alex"));
    const alex = holder3.get("dev2");

    const holder4 = new PersonHolder<Person>();
    holder4.push("first", new Yuto());
    holder4.push("second", new PersonClass("person2"));
    holder4.push("dev2", new Developer("Alex"));
}

{
    console.log("---- Abstract class ----");
    const instance = new CommandExecutor(11, "hoooo");
    instance.execute();
    console.log(`ID: ${instance.id}`);

    const instance2 = new ProcessExecutor(99);
    instance2.execute();
    console.log(`ID: ${instance2.id}`);
    instance2.putBug();

    const executors = new Map<number, ExecutorBase>();
    executors.set(instance.id, instance);
    executors.set(instance2.id, instance2);
    const executor = executors.get(99);
    executor?.execute();
    console.log(`ID: ${instance.id}`);
    // executor.putBug(); // error
}
