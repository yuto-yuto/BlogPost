
export class Casher {
    private readonly initialCoinCount = 0;
    // private coinList = new Map<string, number>([
    //     ["1000", this.initialCoinCount],
    //     ["500", this.initialCoinCount],
    //     ["100", this.initialCoinCount],
    //     ["50", this.initialCoinCount],
    //     ["10", this.initialCoinCount],
    // ]);

    private coinList = [1000, 500, 100, 50, 10];

    public getChangeCoins(change: number): Map<number, number> {
        let result = new Map<number, number>();
        let rest = change;
        this.coinList.forEach((coinType) => {
            if (rest > 0) {
                const numberOfCoins = Math.floor(rest / coinType);
                if (numberOfCoins > 0) {
                    rest = rest % coinType;
                    result.set(coinType, numberOfCoins);
                }
            }
        });
        return result;
    }
}