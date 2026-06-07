// Returns a button with: id, text, function
export function createButton (id:string, text:string, func:()=>void) {
    let button = createElement("button", id)
    button.textContent = text
    button.addEventListener("click", func)
    return button
}

// Returns document element with id
export function createElement(type:string, id:string = ""){ 
    let newElem = document.createElement(type)
    newElem.id = id
    return newElem
}

export function getButton(id:string){
    return document.getElementById(id)
}

export function createSvg (type:string) {
    return document.createElementNS("http://www.w3.org/2000/svg", type)
}