import 'reflect-metadata';
import {ReflectiveInjector, Inject} from 'injection-js';
import {ClassComponent, InjectionProvider} from './ReactWorkTags';

function findInjectionProviderFibler(fiber) {
  let p = fiber.return;
  while (p) {
    if (p.tag === InjectionProvider) {
      return p;
    }
    p = p.return;
  }
  return null;
}

function findParentFiler(fiber) {
  let p = fiber.return;
  while (p) {
    if (p.tag === ClassComponent) {
      return p;
    }
    p = p.return;
  }
  return null;
}

export function createInjectorProvider(fiber) {
  const providers = fiber.pendingProps.providers || [];
  const pFiber = findParentFiler(fiber);
  const pInjector = pFiber ? pFiber.injector : undefined;
  return createInjector(providers, pInjector);
}

export function createInjector(provides, parentInjector) {
  return ReflectiveInjector.resolveAndCreate(
    provides,
    parentInjector || undefined,
  );
}

// function getParentCtor(ctor) {
//   if (!ctor.prototype) {
//     return Object;
//   }
//   var parentProto = Object.getPrototypeOf(ctor.prototype);
//   var parentCtor = parentProto ? parentProto.constructor : null;
//   return parentCtor || Object;
// }

// function isType(v) {
//   return typeof v === 'function';
// }

// function defineDefualtParameters(ctor) {
//   if (!isType(ctor)) {
//     return;
//   }
//   const paramAnnotations = Reflect.getOwnMetadata('design:paramtypes', ctor);
//   const paramTypes = Reflect.getOwnMetadata('parameters', ctor);
//   if (!paramAnnotations && !paramTypes) {
//     Reflect.metadata('design:paramtypes', [Object, Object])(ctor);
//     Inject('props')(ctor, undefined, 0);
//     Inject('context')(ctor, undefined, 1);
//     const ptor = getParentCtor(ctor);
//     if (ptor !== Object) {
//       defineDefualtParameters(ptor);
//     }
//   }
// }

export function instantiate(ctor, props, context, fiber) {
  // defineDefualtParameters(ctor);
  const pFiber = findParentFiler(fiber);
  const injectionProviderFiber = findInjectionProviderFibler(fiber);
  const pInjector = injectionProviderFiber && injectionProviderFiber.injector;
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
        useValue: pFiber ? pFiber.stateNode : null,
      },
    ],
    pInjector,
  );

  fiber.injector = injector;

  return injector.get(ctor);
}
