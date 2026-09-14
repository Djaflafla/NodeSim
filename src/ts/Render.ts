import * as html from "./htmlUtils.js"
import { Node,InputNode, OutputNode } from "./Node.js"
import { Menu } from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { Connection } from "./Connection.js"
import { Connector } from "./Connector.js"
import type { NestedConnectors } from "./Connection.js"
import type { ConnectorDict } from "./Connection.js"

const BUTTONSECTION = document.getElementById("buttonSection")!
const NODESPACE = document.getElementById("nodeSpace")!
const TEXTFORCONN = "∆"

export class Renderer {
    
    static renderWS(ws:Workspace){
        Renderer.updateMenu(ws)
        Renderer.updateNode(ws)
        Renderer.printLine(ws)
        console.log(ws.pieceCollection)
        console.log(ws.cm.connMap)
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
                ws.menu.setSelected(node.id, ws)
                Renderer.updateMenu(ws)
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
        

        let connSection = html.createElement("div")
        //create button for conn
        Object.entries(node.connectors.input).forEach(([id, conn])=>{
            let b1 = html.createButton(TEXTFORCONN, ()=>{
                ws.menu.setSelected(conn.id, ws)
                Renderer.updateMenu(ws)
            }, {
                className:"nodeInputConn",
                id:conn.id
            })
            connSection.appendChild(b1)
        })
        Object.entries(node.connectors.output).forEach(([id, conn])=>{
            let b1 = html.createButton(TEXTFORCONN, ()=>{
                ws.menu.setSelected(conn.id, ws)
                Renderer.updateMenu(ws)
            }, {
                className:"nodeOutputConn",
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
        Object.entries(ws.cm.connMap).forEach(([id, conex])=>{
            looopidou(conex.connectionFlow)
        })
        
        function looopidou (array:NestedConnectors):Connector {
            let buffer1:Connector[]=[]
            

            for (let elem of array) {
                if (elem instanceof Connector) {
                    buffer1.push(elem)
                }
                if (Array.isArray(elem)) {
                    buffer1.push(looopidou(elem))
                }
            }
            while (buffer1.length>1){
                let c1= buffer1[buffer1.length-1]
                let c2 = buffer1[buffer1.length-2]
                if ((c1 instanceof Connector) && (c2 instanceof Connector)){
                    console.log(c1, c2)
                    Renderer.print1Line(c1.id, c2.id)
                }
                buffer1.pop()
            }
            return buffer1[0]!
        }
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