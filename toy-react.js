const RENDER_TO_DOM = Symbol('render to dom');
export class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)/)) {
            console.log('addlistener');
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
        } else {
            this.root.setAttribute(name, value);
        }
    }
    appendChild(component) {
        const r = document.createRange();
        r.setStart(this.root, this.root.childNodes.length);
        r.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](r);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }

}
export class TextNodeWrapper {
    constructor(type) {
        this.root = document.createTextNode(type);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}
export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
        this._root = null;
        this._range = null;
    }
    setAttribute(name, value) {

        this.props[name] = value;
    }
    appendChild(child) {
        this.children.push(child);
    }
    [RENDER_TO_DOM](range) {
        this._range = range;
        this.render()[RENDER_TO_DOM](range);
    }

    render() {
    }
    rerender() {
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }
    setState(newState) {
        if (this.state === null || typeof this.state === 'object') {
            this.state = newState;
            this.rerender();
            return;
        }

        let merge = (oldState, newState) => {
            for (const k in newState) {
                if (newState[k] !== null && typeof newState === 'object') {
                    merge(oldState[k], newState[k]);
                } else {
                    oldState[k] = newState[k];
                }
            }
        }
        merge(this.setState, newState);
        this.rerender();
    }

}
export function render(component, parent) {
    let a = document.createRange();
    a.setStart(parent, 0);
    a.setEnd(parent, parent.childNodes.length);
    a.deleteContents();
    component[RENDER_TO_DOM](a);
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