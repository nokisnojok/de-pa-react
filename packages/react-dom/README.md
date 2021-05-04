# `@de-pa/react-dom`

This package serves as the entry point to the DOM for @de-pa/React. It is intended to be paired with the generic React package, which is shipped as `@de-pa/react` to npm. based on `react-dom` and add dependency injection pattern.

## Installation

```sh
npm install @de-pa/react @de-pa/react-dom injection-js
```

## Usage

### In the browser

```js
import { Component, IComponent, InjectionProvider } from '@de-pa/react';
import { render } from '@de-pa/react-dom';

class Service {
    method() {
        return 'hello world';
    }
}

@IComponent()
class App extends Component {
    constructor(public service: Service) {
        super()
    }
    render() {
        return <div>{this.service.method()}</div>
    }
}

render(<InjectionProvider providers={[Service]}><App /></InjectionProvider>,document.body)
```
## API

### `@de-pa/react-dom`

- `findDOMNode`
- `render`
- `unmountComponentAtNode`
