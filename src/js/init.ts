import type { Workspace } from "./Workspace.js";
import { renderNodes, renderToLink } from "./Render.js";


export function init (workspace:Workspace) {
    let userInput= document.getElementById("userInput") as HTMLInputElement | null;
    let newNodeButton= document.getElementById("newNodeButton")
    let linkButton = document.getElementById("linkButton")

    if (!newNodeButton || !userInput || !linkButton){return}
        
    linkButton.addEventListener("click", ()=>{workspace.link()})

    newNodeButton.addEventListener("click", ()=>{
        workspace.createNode(userInput.value)
    })
}