# [@de-pa/react](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@de-pa/react.svg?style=flat)](https://www.npmjs.com/package/react) 

@de-pa/React is a JavaScript library for building user interfaces. Added dependency injection design pattern base on [react](https://reactjs.org/).

## Installation
```
npm i @de-pa/react @de-pa/react-dom injection-js reflect-metadata --save
```

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

### note

React has released two packages separately. It is very difficult to develop @de-pa/react based on react. So I think to develop a @de-pa/preact based on [preact](https://github.com/nokisnojok/preact), welcome to use

### License

@de-pa/React is [MIT licensed](./LICENSE).
