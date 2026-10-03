import * as html from "./htmlUtils.js"
import { Node,InputNode, OutputNode } from "./Node.js"
import { Menu } from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { Connection } from "./Connection.js"
import { Connector } from "./Connector.js"
import type { ConnectorDict } from "./Connection.js"
import type { FromConnX } from "./Connection.js"

const BUTTONSECTION = document.getElementById("buttonSection")!
const NODESPACE = document.getElementById("nodeSpace")!
const TEXTFORCONN = "∆"

export class Renderer {
    
    static renderWS(ws:Workspace){
        Renderer.updateMenu(ws)
        Renderer.updateNode(ws)
        Renderer.printLine(ws)
        
    }

    static updateOption (ws:Workspace){
        BUTTONSECTION.replaceChildren()
        // setFuncList if know value
    
        // create button forEach option
        ws.menu.optList.forEach(opt=>{
            let b1 = html.createButton(opt, ()=>{ws.doOpt(opt)})
            BUTTONSECTION.appendChild(b1)
        })

    }

    static updateInputBar(ws:Workspace){
        if (ws.menu.selectedPiece.length>0){
            let array1:string[] = []
            ws.menu.selectedPiece.forEach(p=>{
                array1.push(p.id)
            })
            ws.menu.setInputVal(JSON.stringify(array1))
            return
        }
    }

    static updateMenu(ws:Workspace) {
        Renderer.updateOption(ws)
        Renderer.updateInputBar(ws)
    }

    // render every nodes
    static updateNode(ws:Workspace) {
        // clean old div
        let nodeSpace = NODESPACE
        nodeSpace.replaceChildren()

        Object.entries(ws.pieceCollection).forEach(([id, piece])=>{
            if (piece instanceof Node) {
                let div = Renderer.createNodeDiv(piece, ws)
                nodeSpace.appendChild(div)
            }
        })
    }

    static createNodeDiv(node:Node|InputNode, ws:Workspace) {
        // Create div to return
        let nodeDiv = html.createElement("div", {className:"nodeDiv"})
        let firstDiv = html.createElement("div")
        

        //create button for name
        let button = html.createButton(
            node.name, 
            ()=>{
                ws.menu.updateSelected(node.id, ws)
            }, 
            {className:"nameButton"}
        )
        firstDiv.appendChild(button)

        // add input bar & setButton if type=input
        if (node instanceof InputNode){
            firstDiv.appendChild(node.setButton)
            firstDiv.appendChild(node.inputBar)
        }
        // add Result if outputNode
        if (node instanceof OutputNode){
            firstDiv.appendChild(node.outputBar)
        }
        

        let connSection = html.createElement("div", {className:"connSection"})
        //create button for conn
        node.connectors.forEach((conn)=>{
            let b1 = html.createButton(conn.id, ()=>{
                ws.menu.updateSelected(conn.id, ws)
            }, {
                className:"connButton",
                id:conn.id
            })
            connSection.appendChild(b1)
        })


        nodeDiv.appendChild(firstDiv)
        nodeDiv.appendChild(connSection)
        
        return nodeDiv
    }

    static printLine (ws:Workspace) {
        document.getElementById("connLines")?.replaceChildren()

        // Get connection
        Object.entries(ws.cm.connMap).forEach(([id1, conex])=>{
            let done:string[] = []
            Object.entries(conex.connectedTo).forEach(([id2, connArray])=>{
                let conn = ws.getPiece(id2)
                if (!(conn instanceof Connector)){console.error("not a conn 6543555");return}
                connArray.forEach(conntor=>{
                    if (done.includes(conntor.id)){return}
                    Renderer.print1Line(conn.id, conntor.id)
                })
                done.push(id2)
            })
        })
    }   

    static print1Line(id1:string, id2:string) {
        // get but1 pos
        let but1Pos = html.getElement(id1)?.getBoundingClientRect()
        // get but2 pos
        let but2Pos = html.getElement(id2)?.getBoundingClientRect()
        
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