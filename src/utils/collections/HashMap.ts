import { List } from './List';
import { ArrayList } from './ArrayList';
import { Map, Entry } from './Map';

export class HashMap<K, V> implements Map<K, V> {
  protected keyList: List<K> = new ArrayList<K>();
  protected hashMap: Object = new Object();

  // Query Operations
  size(): number {
    return this.entrySet().length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  containsKey(key: K): boolean {
    return this.keySet().contains(key);
  }
  containsValue(value: V): boolean {
    return this.values().contains(value);
  }

  // Modification Operations
  put(key: K, value: V): V {
    // Push into tupleMap
    if (!this.keySet().contains(key)) {
      this.keySet().push(key);
    }
    // Set into hashMap
    return this.hashMap[(<any>key)] = value;
  }
  remove(key: K, testValue?: V): V {
    let v: V;
    if (this.containsKey(key)) {
      v = this.get(key);
      if (testValue === null || testValue === undefined || testValue === v) {
        // Remove from tupleMap
        this.keyList.removeAll([key]);
        // Remove from hashMap
        this.hashMap[(<any>key)] = undefined;
        delete this.hashMap[(<any>key)];
      }
    }
    return v;
  }

  // Views
  keySet(): List<K> {
    return this.keyList;
  }
  values(): List<V> {
    return (<List<V>>this.keySet().map(k => this.get(k)));
  }
  entrySet(): List<Entry<K, V>> {
    return (<List<Entry<K, V>>>this.keySet().map(k => new Entry<K, V>([k, this.get(k)])));
  }
  get(key: K): V {
    return (<V>this.hashMap[(<any>key)]);
  }
  getOrDefault(key: K, defaultValue: V): V {
    return this.containsKey(key) ? this.get(key) : defaultValue;
  }

  // Bulk Operations
  putAll(m: Map<K, V>) {
    m.forEach((k, v) => this.put(k, v));
  }
  removeAll(l: Entry<K, V>[]) {
    l.forEach((e: Entry<K, V>) => this.remove(e.getKey(), e.getValue()));
  }
  clear() {
    this.keySet().forEach(k => this.remove(k));
    this.keyList.clear();
  }
  forEach(action: Function) {
    this.entrySet().forEach(entry => {
      action(entry.getKey(), entry.getValue());
    });
  }
  map(action: Function): Array<any> {
    return this.entrySet().map(entry => {
      return action(entry.getKey(), entry.getValue());
    });
  }

  // Other methods
  /*
  putIfAbsent(key : K, value : V) : V {
      if (this.containsKey(key)) {
          return this.put(key, value);
      }
      return;
  }
  replace(key : K, newValue : V, testValue ?: V) : V {
      var v;
      if (this.containsKey(key) && (testValue === null || testValue === undefined || testValue === this.get(key))) {
          v = this.put(key, newValue);
      }
      return v;
  }
  compute(key : K, remappingFunction : Function, value ?: V) : V {
      var newValue : V,
          r : V;

      newValue = ((key, remappingFunction, value, oldValue) => {
          let uv = (value === null || value === undefined),
              uov = (oldValue !== null || oldValue !== undefined);
          return uv ? (
                  remappingFunction.apply(key, oldValue)
              ) : (
                  uov ? remappingFunction.apply(oldValue, value) : value
              );
      })(key, remappingFunction, value, this.get(key));

      if (this.containsKey(key) && (newValue === null || newValue === undefined)) {
          this.remove(key);
      } else {
          r = this.put(key, newValue);
      }
      return r;
  }
  merge(key : K, value : V, remappingFunction : Function) : V {
      return this.compute(key, remappingFunction, value);
  }
  */

}
