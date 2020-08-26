import { createElement, Component, render } from './toy-react';
class MyComponent extends Component {
    constructor() {
        super();
        this.state = { a: 1 };
    }
    render() {
        return <div>
            <button onClick={() => { this.setState({a:++this.state.a}) }}>click</button>
            {this.state.a.toString()}
        </div>
    }
}

render(<MyComponent >
</MyComponent>, document.body);

