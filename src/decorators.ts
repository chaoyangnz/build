function copyProperties(target: any, source: any) {
  for(let key of Reflect.ownKeys(source)) {
    if(key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc: any = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

function copyPrototypes(obj: any, ...mixinClasses: Function[]) {
  const prototype = {} // new __proto__
  const mixinClassPrototypes = mixinClasses.map(mixinClass => mixinClass.prototype)
  mixinClassPrototypes.push(Object.getPrototypeOf(obj))
  for (let mixinClassPrototype of mixinClassPrototypes) {
    copyProperties(prototype, mixinClassPrototype)
  }
  Object.setPrototypeOf(obj, prototype);
}

export const callable = (property: string) => {
  return <T extends new (...args: any[]) => void>(targetClass: T) => {
    return new Proxy(targetClass, {
      construct(target: any, args: any[], newTarget?: any): object {
        const obj = new target(...args)
        const Callable = (...args: any[]) => {
          targetClass.prototype[property].apply(obj, args)
        }
        copyProperties(Callable, obj); // copy instance properties
        copyPrototypes(Callable, targetClass);
        return Callable;
      }
    })
  }
}

export const mixin = (...mixins: any[]) => (targetClass: any) => {
  function copyProperties(target: any, source: any) {
    for(let key of Reflect.ownKeys(source)) {
      if(key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        let desc: any = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(targetClass, mixin); // copy static properties
    copyProperties(targetClass.prototype, mixin.prototype); // copy prototype
  }

  return new Proxy(targetClass, {
    construct(target: any, args: any[], newTarget?: any): object {
      const obj = new target(...args)
      for(let mixin of mixins) {
        copyProperties(obj, new mixin());
      }
      return obj;
    }
  })
}


