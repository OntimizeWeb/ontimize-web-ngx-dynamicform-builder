import { List } from './List';

export class Entry<K, V> {
    private k: K;
    private v: V;

    constructor(t: [K, V]) {
        [this.k, this.v] = t;
    }

    getKey(): K {
        return this.k;
    }

    getValue(): V {
        return this.v;
    }
}

export interface Map<K, V> extends Object {
    // Query Operations
    size(): number;
    isEmpty(): boolean;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): V;

    // Modification Operations
    put(key: K, value: V): V;
    remove(key: K, testValue?: V): V;

    // Bulk Operations
    putAll(m: Map<K, V>);
    removeAll(l: Entry<K, V>[]);
    clear();

    // Views
    keySet(): List<K>;
    values(): List<V>;
    entrySet(): List<Entry<K, V>>;

    // Defaultable methods
    getOrDefault(key: K, defaultValue: V): V;
    forEach(action: Function);
    /*default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function) {
        Objects.requireNonNull(function);
        for (Map.Entry<K, V> entry : entrySet()) {
            K k;
            V v;
            try {                k = entry.getKey();
                v = entry.getValue();
            } catch(IllegalStateException ise) {
                // this usually means the entry is no longer in the map.
                throw new ConcurrentModificationException(ise);
            }

            // ise thrown from function is not a cme.
            v = function.apply(k, v);

            try {
                entry.setValue(v);
            } catch(IllegalStateException ise) {
                // this usually means the entry is no longer in the map.
                throw new ConcurrentModificationException(ise);
            }
        }
    }
    putIfAbsent(key : K, value : V);
    replace(key : K, oldValue : V, testValue : V) : V;
    compute(key : K, remappingFunction : Function) : V;
    merge(key : K, value : V, remappingFunction : Function) : V;
    */
}
