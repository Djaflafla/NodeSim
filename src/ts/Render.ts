import * as html from "./htmlUtils.js"
import { Node } from "./Node.js"
import { Workspace } from "./Workspace.js"


export function renderToLink (workspace:Workspace) {
    let toLink= document.getElementById("toLink")
    if (!toLink){return}
    
    let str = "To Link (out to in): "
    workspace.connToLink.forEach(conn=>{str+=conn+"  "})
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

export function printConnMap (ws:Workspace) {
    let connMapDiv = document.getElementById("connMapDiv")
    if (!connMapDiv || !ws.connection){return}
    connMapDiv.textContent = ws.connection.toString()
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
    let nodeDiv = html.createElement("div", "nodeDiv")
    
    // name section
    let name = html.createButton(node.id, node.name, ()=>{})
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

export function printLine(id1:string, id2:string) {
    // get but1 pos
    let but1Pos = html.getButton(id1)?.getBoundingClientRect()
    // get but2 pos
    let but2Pos = html.getButton(id2)?.getBoundingClientRect()
    
    // create line
    let line = html.createSvg("line")
    document.getElementById("connLines")?.appendChild(line)

    if (!but1Pos || !but2Pos){return}
    line.setAttribute("x1", (but1Pos.left + but1Pos.width/2).toString())
    line.setAttribute("y1", (but1Pos.top + but1Pos.height/2).toString())
    line.setAttribute("x2", (but2Pos.left + but2Pos.width/2).toString())
    line.setAttribute("y2", (but2Pos.top + but2Pos.height/2).toString())

    // draw line
    line.setAttribute("stroke", "black")
    line.setAttribute("stroke-width", "2")
}