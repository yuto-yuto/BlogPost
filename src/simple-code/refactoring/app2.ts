type Data = string | number;

interface DataCreator {
    createData(data: Data): string;
    adaptData(data: string): string;
}

class Communicator {
    private dataCreators: DataCreator[] = [
        new DataCreator1(),
        new DataCreator2(),
        new DataCreator3(),
    ];
    public execute() {
        const originalData = this.fetchData();
        const data = this.dataCreators.map(x => {
            const createdData = x.createData(originalData);
            return x.adaptData(createdData);
        });
        this.sendData(data);
    }
    private fetchData(): string {
        return "test-data";
    }
    private sendData(data: string[]) {
        console.log(data);
    }
}

class DataCreator1 implements DataCreator {
    public createData(data: Data) {
        return `creator1-${data}`;
    }
    public adaptData(data: string) {
        return `***${data}***`;
    }
}
class DataCreator2 implements DataCreator {
    public createData(data: Data) {
        return `creator2-${data}`;
    }
    public adaptData(data: string) {
        return `---${data}---`;
    }
}
class DataCreator3 implements DataCreator {
    public createData(data: Data) {
        return `creator3-${data}`;
    }
    public adaptData(data: string) {
        return `===${data}===`;
    }
}

const instance = new Communicator();
instance.execute();