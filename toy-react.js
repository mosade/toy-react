export function createElement(tagName, attributes, ...children) {
    const el = document.createElement(tagName);
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    console.log(children);
    for (const child of children) {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        }else{
            el.appendChild(child);
        }
    }
    return el;
}