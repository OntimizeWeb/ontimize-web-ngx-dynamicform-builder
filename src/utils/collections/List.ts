export interface List<E> extends Array<E> {
    // Query Operations
    size(): number;
    isEmpty(): boolean;
    contains(o: E): boolean;
    toArray(): Array<E>;

    // Bulk Modification Operations
    containsAll(c: Array<E>): boolean;
    pushAll(c: Array<E>): List<E>;
    removeAll(c: Array<E>): List<E>;
    clear();

    // Positional Access Operations
    get(index: number): E;
    set(index: number, element: E): List<E>;
    remove(index: number): E;
}
