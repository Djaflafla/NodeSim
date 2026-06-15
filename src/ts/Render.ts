import * as html from "./htmlUtils.js"
import { Node } from "./Node.js"
import { Menu } from "./Menu.js"
import { Workspace } from "./Workspace.js"

const BUTTONSECTION = document.getElementById("buttonSection")!
const NODESPACE = document.getElementById("nodeSpace")!
const TEXTFORCONN = "∆"

export class Renderer {
    
    static renderWS(ws:Workspace){
        Renderer.updateMenu(ws)
        Renderer.updateNode(ws)
        Renderer.updateConn(ws)
        console.log(ws.pieceCollection)
    }

    static updateMenu(ws:Workspace) {
        BUTTONSECTION.replaceChildren()
        // setFuncList if know value


        // forEach function: create button
        ws.menu.optList.forEach(opt=>{
            let b1 = html.createButton(opt, ()=>{ws.doOpt(opt)})
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
        
    static updateConn(ws:Workspace) {
    }

    
    static createNodeDiv(node:Node, ws:Workspace) {
        // Create div to return
        let nodeDiv = html.createElement("div", node.id)
        nodeDiv.className = "nodeDiv"
        
        //create button for name
        let button = html.createButton(node.name!, ()=>{
            ws.menu.setSelected(node.id, ws)
            Renderer.updateMenu(ws)
        })
        button.className = "nameButton"

        
        //create button for conn
        let connSection = html.createElement("div")
        node.connectors.forEach(conn=>{
            let b1 = html.createButton(TEXTFORCONN, ()=>{
                ws.menu.setSelected(conn.id, ws)
            Renderer.updateMenu(ws)
            })
            connSection.appendChild(b1)
        })
        nodeDiv.appendChild(button)
        nodeDiv.appendChild(connSection)
        
        return nodeDiv
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
}