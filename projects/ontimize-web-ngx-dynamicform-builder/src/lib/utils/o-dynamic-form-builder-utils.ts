class ClassWithChildren<T> {
  children: T[];
}

export class ODynamicFormBuidlerUtils {
  static searchElement<T extends ClassWithChildren<T>>(id: string, array: T[], propertyFn: (T) => string): T {
    let r;
    for (let i = 0; i < array.length; i++) {
      if (id === propertyFn(array[i])) {
        return array[i];
      }
      if (array[i].children && array[i].children.length > 0) {
        if ((r = ODynamicFormBuidlerUtils.searchElement(id, array[i].children, propertyFn)) !== null) {
          return r;
        }
      }
    }
    return null;
  }


  static removeElement<T extends ClassWithChildren<T>>(id: string, array: T[], propertyFn: (T) => string): void {
    for (let i = 0; i < array.length; i++) {
      if (id === propertyFn(array[i])) {
        array.splice(i, 1);
      }
      if (array[i] && array[i].children) {
        ODynamicFormBuidlerUtils.removeElement(id, array[i].children, propertyFn);
      }
    }
  }
}