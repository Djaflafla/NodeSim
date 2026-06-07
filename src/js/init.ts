import type { Workspace } from "./Workspace.js";
import { renderNodes, renderToLink } from "./Render.js";


export function init (workspace:Workspace) {
    let userInput= document.getElementById("userInput") as HTMLInputElement | null;
    let newNodeButton= document.getElementById("newNodeButton")
    let linkButton = document.getElementById("linkButton")

    if (newNodeButton && userInput && linkButton){
        
        newNodeButton.addEventListener("click", ()=>{
            workspace.createNode(
                crypto.randomUUID().slice(30),
                userInput.value
            )
        })
        linkButton.addEventListener("click", ()=>{workspace.link()})
    }
    
    document.addEventListener("render", ()=> {renderNodes(workspace.nodeList, workspace)})
    document.addEventListener("renderToLink", ()=> {renderToLink(workspace)})

}


// link button click
// new node button click