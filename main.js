import { createElement, Component, render } from './toy-react';
class MyComponent extends Component {
    render() {
        return <div>
            {this.children}
        </div>
    }
}

render(<MyComponent id='mc' class='mce'>
    <div>123</div>
    <div>456
    <h1>789</h1>
    </div>
</MyComponent>, document.body);

