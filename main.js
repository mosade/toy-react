import { createElement ,Component} from './toy-react';
class MyComponent extends Component{
    render(){
        return <div>
            {this.children}
        </div>
    }
}
// let a=<div>123</div>;
let b=<MyComponent id='mc' class='mce'>
    <div>123</div>
    <div>456</div>
</MyComponent>

document.body.appendChild(b.root);

