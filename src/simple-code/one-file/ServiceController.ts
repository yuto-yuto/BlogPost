import EventEmitter from "events";

export const Services = ["Service1", "Service2", "Service3"] as const;
export type MyService = typeof Services[number];

abstract class BaseService  {
    abstract readonly key: MyService;
    private _enabled: boolean = false;
    public get enabled(): boolean {
        return this._enabled;
    }
    setEnableState(value: boolean): void {
        this._enabled = value;
    }
}

class Service1 extends BaseService {
    public readonly key = Services[0];
}
class Service2 extends BaseService {
    public readonly key = Services[1];
}
class Service3 extends BaseService {
    public readonly key = Services[2];
}

export class ServiceController {
    private eventEmitter = new EventEmitter();
    private services: BaseService[] = [
        new Service1(),
        new Service2(),
        new Service3(),
    ];

    public start(...enableServices: MyService[]): void {
        enableServices = enableServices.length !== 0 ? enableServices : Object.values(Services);

        this.services
            .filter((service) => enableServices.includes(service.key))
            .forEach((service) => {
                service.setEnableState(true);
                this.eventEmitter.emit(service.key, true);
            });
    }

    public stop(...disableServices: MyService[]): void {
        disableServices = disableServices ?? Services;

        this.services
            .filter((service) => disableServices.includes(service.key))
            .forEach((service) => {
                service.setEnableState(false);
                this.eventEmitter.emit(service.key, false);
            });
    }

    public on(eventName: MyService, listener: (value: boolean) => void): void {
        this.eventEmitter.on(eventName, listener);
    }
}
