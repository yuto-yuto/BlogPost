
export interface ReturnDataType<T> {
    addedItems: T[];
    deletedItems: T[];
}

export abstract class DataHolder<T, K extends number | string> {
    protected currentItems = new Map<K, T>();

    public process(receivedItems: T[]): ReturnDataType<T> {
        const addedItems: T[] = [];
        const deletedItems: T[] = [];

        receivedItems
            .filter((item) => this.isAdded(item))
            .forEach((receivedItem) => {
                addedItems.push(receivedItem);
                this.currentItems.set(this.getId(receivedItem), receivedItem);
            });

        Array.from(this.currentItems.values())
            .filter((currentItem) => this.isDeleted(receivedItems, currentItem))
            .forEach((currentItem) => {
                deletedItems.push(currentItem);
                this.currentItems.delete(this.getId(currentItem));
            });

        return { addedItems, deletedItems };
    }

    protected abstract isAdded(receivedItem: T): boolean;
    protected abstract isDeleted(receivedItems: T[], currentItem: T): boolean;
    protected abstract getId(item: T): K;
}
