import type { Connector } from "./Connector.js"
import * as html from "./htmlUtils.js"
import type { FuncList } from "./Workspace.js"
import { Node } from "./Node.js"
import { Workspace } from "./Workspace.js"
import { Menu } from "./Menu.js"

const BUTTONSECTION = document.getElementById("buttonSection")!
const NODESPACE = document.getElementById("nodeSpace")!


// Create/edit html element
// Print wtv on screen

export class Renderer {
    
    static renderWS(ws:Workspace){
        Renderer.updateMenu(ws)
        Renderer.updateConn(ws)
        Renderer.updateNode(ws)
        console.log(ws.pieceCollection)
    }

    static updateMenu(ws:Workspace) {
        BUTTONSECTION.replaceChildren()
        ws.menu.checkInputValue(ws)

        // forEach function: create button
        ws.menu.funcList.forEach(func=>{
            let b1 = html.createButton(func.type, func.func)
            BUTTONSECTION.appendChild(b1)
        })
    }

    static updateNode(ws:Workspace) {
        // clean old div
        let nodeSpace = NODESPACE
        nodeSpace.replaceChildren()

        ws.pieceCollection.forEach(piece=>{
            if (piece instanceof Node) {
                let div = Renderer.createNodeDiv(piece, ws)
                nodeSpace.appendChild(div)
            }
        })

    }
        
    // static rnode(nodeList:Node[], workspace:Workspace) {
    static updateConn(ws:Workspace) {
    }

    static printLine(id1:string, id2:string) {
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
    
    static createNodeDiv(node:Node, ws:Workspace) {
        let nodeDiv = html.createElement("div", node.id)
        nodeDiv.className = "nodeDiv"

        //create button for name
        let button = html.createButton(node.name!, ()=>{
            ws.menu.inputBar.value = node.name!;
            ws.menu.selectedPiece = node
            Renderer.updateMenu(ws)
        })

        button.className = "nameButton"
        nodeDiv.appendChild(button)
        
        return nodeDiv
    }

        // // create a button for every conn and print value
        // node.connectors.forEach((conn, i) => {
        //     let button = html.createButton(
        //         conn.id,
        //         conn.value,
        //         () => {
        //             workspace.toLink(conn.id);
        //         }
        //     );
        //     nodeDiv.appendChild(button)
        // });

    

    

}





