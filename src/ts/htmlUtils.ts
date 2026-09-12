type Opt = {
    id?:string,
    className?: string,
    textContent?: string
}

// Returns a button with: id, text, function
export function createButton (text:string, func:()=>void, opt:Opt={}) {
    let button = createElement("button", opt)
    button.textContent = text
    button.addEventListener("click", func)
    return button
}

// Returns document element with id
export function createElement(type:string, opt:Opt={}){ 
    let newElem = document.createElement(type)
    if (opt["id"]) {newElem.id = opt["id"]}
    if (opt["className"]) {newElem.className = opt["className"]}
    if (opt["textContent"]) {newElem.textContent = opt["textContent"]}


    return newElem
}

export function getElement(id:string){
    return document.getElementById(id)
}

export function createSvg (type:string) {
    return document.createElementNS("http://www.w3.org/2000/svg", type)
}