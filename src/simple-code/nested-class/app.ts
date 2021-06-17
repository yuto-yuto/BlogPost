const globalTestTimestamp = "2021-06-20T11:11:11.111Z";
function createPayloadFuncs(key: string) {
    return {
        true: () => {
            return {
                timestamp: globalTestTimestamp,
                key,
                payload: true,
            };
        },
        false: () => {
            return {
                timestamp: globalTestTimestamp,
                key,
                payload: false,
            };
        },
    };
}
abstract class BooleanBase {
    public static timestamp = "2021-06-20T10:15:18.123Z";
    public static get true() {
        return {
            timestamp: BooleanBase.timestamp,
            key: this.name,
            payload: true,
        };
    }
    public static get false() {
        return {
            timestamp: BooleanBase.timestamp,
            key: this.name,
            payload: false,
        };
    }
}
abstract class NumberBase {
    public static timestamp = "2021-06-22T22:22:22.222Z";
    public static create(data: number) {
        return {
            timestamp: NumberBase.timestamp,
            key: this.name,
            payload: data,
        }
    }
}

class Light extends BooleanBase { }
class Speed extends NumberBase { }

class Car {
    private static count = 0;
    private constructor(private carNumber: number) { }
    public static FrontLight = class extends BooleanBase { };
    public static BackLight = createPayloadFuncs("BackLight");
    public AveSpeed = class extends NumberBase { };
    public CurrentSpeed = class extends NumberBase { };
    public extension = {
        honk: () => console.log(`beeee: ${this.carNumber}`),
    };
    public static Factory = class {
        public static create(): Car {
            Car.count++;
            return new Car(Car.count);
        }
    }
}

{
    console.log("---BooleanBase---")
    console.log(BooleanBase.true);
    console.log(BooleanBase.false);

    console.log("---Light---")
    console.log(Light.true);
    console.log(Light.false);

    console.log("---NumberBase---")
    console.log(NumberBase.create(12));

    console.log("---Speed---")
    console.log(Speed.create(120));

    console.log("---Car---")
    const car1 = Car.Factory.create();
    console.log(car1.AveSpeed.create(12));
    console.log(Car.BackLight.false());
    console.log(Car.FrontLight.true);
    console.log(car1.CurrentSpeed.create(80));
    car1.extension.honk();
    const car2 = Car.Factory.create();
    car2.extension.honk();
}
