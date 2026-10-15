type Opt = {
    id?:string,
    className?: string,
    textContent?: string
}

// Returns a button
export function createButton (text:string, func:()=>void, opt:Opt={}) {
    let button = createElement("button", opt)
    button.textContent = text 
    button.addEventListener("click", func)
    return button
}

// Returns document element
export function createElement(tag:string, opt:Opt={}){ 
    let newElem = document.createElement(tag)
    if (opt["id"]) {newElem.id = opt["id"]}
    if (opt["className"]) {newElem.className = opt["className"]}
    if (opt["textContent"]) {newElem.textContent = opt["textContent"]}

    return newElem
}

export function createSvg (type:string) {
    return document.createElementNS("http://www.w3.org/2000/svg", type)
}