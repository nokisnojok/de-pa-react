import 'reflect-metadata';
import {Inject} from 'injection-js';

const ARROW_ARG = /^([^(]+?)=>/;
const FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;
const FN_ARG_SPLIT = /,/;
const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

function stringifyFn(fn) {
  return Function.prototype.toString.call(fn);
}

function extractArgs(fn) {
  var fnText = stringifyFn(fn).replace(STRIP_COMMENTS, ''),
    args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
  return args;
}

function annotate(fn) {
  const injector = [];

  extractArgs(fn)[1]
    .split(FN_ARG_SPLIT)
    .forEach(arg => {
      arg.replace(FN_ARG, function(all, underscore, name) {
        injector.push(name);
      });
    });

  return injector;
}

export function IComponent() {
  return function(target) {
    const paramTypes =
      Reflect.getOwnMetadata('design:paramtypes', target) || [];
    const paramAnnotations = Reflect.getOwnMetadata('parameters', target) || [];
    const argNames = annotate(target);
    paramTypes.forEach((item, index) => {
      if (item === Object && paramAnnotations[index] == null) {
        Inject(argNames[index])(target, undefined, index);
      }
    });

    return target;
  };
}
