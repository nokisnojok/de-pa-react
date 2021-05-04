# `@de-pa/react`

`@de-pa/React` is a JavaScript library besed on `react`.Add a dependency injection pattern.

The `@de-pa/react` package contains only the functionality necessary to define React components. It is typically used together with a React renderer like `@de-pa/react-dom` for the web.

**Note:** API is the same as react.

## Example Usage

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
