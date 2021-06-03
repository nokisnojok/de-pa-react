// Type definitions for @de-pa/react-dom 17.0 copy from @types/react-dom

export as namespace DePaReactDOM;

import {
    ReactInstance, Component, ComponentState,
    ReactElement, SFCElement, CElement,
    DOMAttributes, DOMElement, ReactNode, ReactPortal
} from '@de-pa/react';

export function findDOMNode(instance: ReactInstance | null | undefined): Element | null | Text;
export function unmountComponentAtNode(container: Element | DocumentFragment): boolean;

export function createPortal(children: ReactNode, container: Element, key?: null | string): ReactPortal;

export const version: string;
export const render: Renderer;
export const hydrate: Renderer;

export function flushSync<R>(fn: () => R): R;
export function flushSync<A, R>(fn: (a: A) => R, a: A): R;

export function unstable_batchedUpdates<A, B>(callback: (a: A, b: B) => any, a: A, b: B): void;
export function unstable_batchedUpdates<A>(callback: (a: A) => any, a: A): void;
export function unstable_batchedUpdates(callback: () => any): void;

export function unstable_renderSubtreeIntoContainer<T extends Element>(
    parentComponent: Component<any>,
    element: DOMElement<DOMAttributes<T>, T>,
    container: Element,
    callback?: (element: T) => any): T;
export function unstable_renderSubtreeIntoContainer<P, T extends Component<P, ComponentState>>(
    parentComponent: Component<any>,
    element: CElement<P, T>,
    container: Element,
    callback?: (component: T) => any): T;
export function unstable_renderSubtreeIntoContainer<P>(
    parentComponent: Component<any>,
    element: ReactElement<P>,
    container: Element,
    callback?: (component?: Component<P, ComponentState> | Element) => any): Component<P, ComponentState> | Element | void;

export interface Renderer {
    // Deprecated(render): The return value is deprecated.
    // In future releases the render function's return type will be void.

    <T extends Element>(
        element: DOMElement<DOMAttributes<T>, T>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): T;

    (
        element: Array<DOMElement<DOMAttributes<any>, any>>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): Element;

    (
        element: SFCElement<any> | Array<SFCElement<any>>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): void;

    <P, T extends Component<P, ComponentState>>(
        element: CElement<P, T>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): T;

    (
        element: Array<CElement<any, Component<any, ComponentState>>>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): Component<any, ComponentState>;

    <P>(
        element: ReactElement<P>,
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): Component<P, ComponentState> | Element | void;

    (
        element: ReactElement[],
        container: Element | DocumentFragment | null,
        callback?: () => void
    ): Component<any, ComponentState> | Element | void;
}
