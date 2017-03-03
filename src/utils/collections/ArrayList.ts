import { List } from './List';

export class ArrayList<E> extends Array<E> implements List<E> {
    // Query Operations
    size(): number {
        return this.length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    contains(o: E): boolean {
        return this.indexOf(o) > -1;
    }
    toArray(): Array<E> {
        return (<Array<E>>this);
    }

    // Bulk Modification Operations
    containsAll(c: Array<E>): boolean {
        let r: boolean = true,
            l: number = c.length;
        var i: number;

        for (i = 0; i < l && r; i++) {
            if (!this.contains(c[i])) {
                r = false;
            }
        }
        return r;
    }
    pushAll(c: Array<E>): List<E> {
        c.forEach(d => this.push(d));
        return this;
    }
    removeAll(c: Array<E>): List<E> {
        c.forEach(d => {
            if (this.contains(d)) {
                this.remove(this.indexOf(d));
            }
        });
        return this;
    }
    clear() {
        this.splice(0, this.length);
    }

    // Positional Access Operations
    get(index: number): E {
        return this[index];
    }
    set(index: number, element: E): List<E> {
        this[index] = element;
        return this;
    }
    remove(index: number): E {
        return this.splice(index, 1)[0];
    }
}
