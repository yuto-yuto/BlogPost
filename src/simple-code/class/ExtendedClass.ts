import { PersonClass } from "./ClassWithInterface";

export class ExtendedClass extends PersonClass { }

export class Developer extends PersonClass {
    public introduce(): void {
        super.introduce();
        console.log("I'm software developer.");
    }
    public develop(): void {
        console.log("I found a bug... Let's ignore.");
    }
}
