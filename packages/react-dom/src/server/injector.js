import {ReflectiveInjector} from 'injection-js';

export function createInjector(providers, parent) {
  return ReflectiveInjector.resolveAndCreate(providers, parent);
}

export function instantiate(ctor, props, context, pInjector, parent) {
  const paramAnnotations = Reflect.getMetadata('design:paramtypes', ctor);
  const paramTypes = Reflect.getMetadata('parameters', ctor);
  const notDecoratorMetadata = !paramAnnotations && !paramTypes;
  const injector = createInjector(
    [
      notDecoratorMetadata
        ? {
            provide: ctor,
            useFactory(props, context, updater) {
              return new ctor(props, context, updater);
            },
            deps: ['props', 'context', 'updater'],
          }
        : ctor,
      {
        provide: 'props',
        useValue: props,
      },
      {
        provide: 'context',
        useValue: context,
      },
      {
        provide: 'updater',
        useValue: null,
      },
      {
        provide: 'parent',
        useValue: parent,
      },
    ],
    pInjector,
  );

  return injector.get(ctor);
}
