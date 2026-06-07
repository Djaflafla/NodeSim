import * as html from "./htmlUtils.js"
import { Node } from "./Node.js"
import { Workspace } from "./Workspace.js"


export function renderToLink (workspace:Workspace) {
    let toLink= document.getElementById("toLink")
    if (!toLink){return}
    
    let str = "To Link (out to in): "
    workspace.linkCouple.forEach(conn=>{str+=conn+"  "})
    toLink.textContent=str
    
}

export function renderNodes(nodeList:Node[], workspace:Workspace) {
    // clean old div
    let parent = document.getElementById("wsDiv")
    if (!parent) {return}
    parent.replaceChildren()
    nodeList.forEach((node)=>{
        let div = createNodeDiv(node, workspace)
        parent.appendChild(div)
    })
}




// Create a div for a node

//          <div id="n1">
//             <p id="nId">node 1</p>
//             <button id="conn1">val</button>
//             <button id="conn2">val</button>
//             <button id="conn3">val</button>
//             <p></p>
//             <button id="newConn">New Connector</button>
//             <button id="rmConn">Remove Connector</button>
//             <button id="rmNode">Remove Node</button>
//          </div>

export function createNodeDiv(node:Node, workspace:Workspace) {
    let nodeDiv = html.createElement("div", node.id)
    
    // name section
    let name = html.createElement("p")
    name.textContent = node.name
    nodeDiv.appendChild(name)
    
    // create a button for every conn and print value
    node.connectors.forEach((conn, i) => {
        let button = html.createButton(
            conn.id,
            conn.value,
            () => {
                workspace.toLink(conn.id);
            }
        );
        nodeDiv.appendChild(button)
    });
    

    // Spacing
    nodeDiv.appendChild(html.createElement("p"))

    // Node options
    nodeDiv.appendChild(html.createButton(
        "New conn",
        "New Conn",
        ()=>{workspace.addConn(node)}
    ))
    return nodeDiv
}