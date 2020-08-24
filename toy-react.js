export class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        this.root.appendChild(child.root);
    }
}
export class TextNodeWrapper {
    constructor(type) {
        this.root = document.createTextNode(type);
    }
}
export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(child) {
        this.children.push(child);
    }
    get root() {
        if (!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    }
    render() {
    }

}
export function createElement(type, attributes, ...children) {
    let el;
    if (typeof type === 'string') {
        el = new ElementWrapper(type);
    } else {
        el = new type;
    }
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    const insertChildren = (children) => {
        for (const child of children) {
            if (Array.isArray(child)) {
                insertChildren(child);
            }
            else if (typeof child === 'string') {
                el.appendChild(new TextNodeWrapper(child));
            } else {
                el.appendChild(child);
            }
        }
    }
    insertChildren(children);
    return el;
}