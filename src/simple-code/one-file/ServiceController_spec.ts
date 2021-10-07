import "mocha";
import { expect } from "chai";
import { MyService, ServiceController, Services } from "./ServiceController";

describe("ServiceController", () => {
    let instance: ServiceController;

    beforeEach(() => {
        instance = new ServiceController();
    });

    describe("start", () => {
        it("should always be successful", () => {
            instance.on("Service1", (value: boolean) => {
                expect(value).to.be.true;
            });
            instance.start("Service1");
        });

        it("should set true to specified services", (done) => {
            instance.on("Service1", (value: boolean) => {
                try {
                    expect(value).to.be.true;
                    done();
                } catch (e) {
                    done(e);
                }
            });
            instance.start("Service1");
        });

        describe("should set true for all services when no argument is specified", () => {
            it("first", (done) => {
                let count = Services.length;
                instance.on("Service1", (value: boolean) => {
                    try {
                        expect(value).to.be.true;
                        if (--count === 0) {
                            done();
                        }
                    } catch (e) {
                        done(e);
                    }
                });
                instance.on("Service2", (value: boolean) => {
                    try {
                        expect(value).to.be.true;
                        if (--count === 0) {
                            done();
                        }
                    } catch (e) {
                        done(e);
                    }
                });
                instance.on("Service3", (value: boolean) => {
                    try {
                        expect(value).to.be.true;
                        if (--count === 0) {
                            done();
                        }
                    } catch (e) {
                        done(e);
                    }
                });
                instance.start();
            });

            it("second", (done) => {
                let count = Services.length;
                const createListener = (name: MyService) => {
                    instance.on(name, (value: boolean) => {
                        try {
                            expect(value).to.be.true;
                            if (--count === 0) {
                                done();
                            }
                        } catch (e) {
                            done(e);
                        }
                    });
                };
                createListener("Service1");
                createListener("Service2");
                createListener("Service3");
                instance.start();
            });

            it("third", (done) => {
                let enabled = [false, false, false];
                const createListener = (name: MyService, index: number) => {
                    instance.on(name, (value: boolean) => {
                        try {
                            expect(value).to.be.true;
                            enabled[index] = true;
                            if (enabled.every((x) => x === true)) {
                                done();
                            }
                        } catch (e) {
                            done(e);
                        }
                    });
                };
                createListener("Service1", 0);
                createListener("Service2", 1);
                createListener("Service3", 2);
                instance.start();
            });

            it("fourth", (done) => {
                const createListener = (name: MyService) => new Promise<void>((resolve, reject) => {
                    instance.on(name, (value: boolean) => {
                        try {
                            expect(value).to.be.true;
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    });
                });

                Promise.all([
                    createListener("Service1"),
                    createListener("Service2"),
                    createListener("Service3"),
                ])
                    .then(() => done())
                    .catch((e) => done(e));

                instance.start();
            });
        });
    });
});
