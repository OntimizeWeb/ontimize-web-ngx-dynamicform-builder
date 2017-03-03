export class Type {
  static isNull(a: any): boolean {
    switch (typeof a) {
      case 'undefined':
        return true;
      case 'boolean':
      case 'number':
        return false;
      default:
        return a === null || Object.keys(a).length === 0;
    }
  }

  static isNotNull(a: any): boolean {
    return !Type.isNull(a);
  }

  static areNull(a: Array<any>): boolean {
    let r = false;
    let i = a.length;
    while (!r && i) {
      --i;
      r = Type.isNull(a[i]);
    }
    return r;
  }

  static areNotNull(a: Array<any>): boolean {
    return !Type.areNull(a);
  }
}
