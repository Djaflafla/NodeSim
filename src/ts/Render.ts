import type { Connector } from "./Connector.js"
import * as html from "./htmlUtils.js"
import { Node } from "./Node.js"
import { Workspace } from "./Workspace.js"

const BUTTONSECTION = document.getElementById("buttonSection")
const FAKEID = "fakeID"


// Create/edit html element
// Print wtv on screen

export class Renderer {
    static rnode(nodeList:Node[], workspace:Workspace) {
        // clean old div
        let parent = document.getElementById("wsDiv")
        if (!parent) {return}
        parent.replaceChildren()
        nodeList.forEach((node)=>{
            let div = Renderer.createNodeDiv(node, workspace)
            parent.appendChild(div)
        })
    }

    static renderToLink (workspace:Workspace) {
        let toLink= document.getElementById("toLink")
        if (!toLink){return}
        
        let str = "To Link (out to in): "
        workspace.connToLink.forEach(conn=>{str+=conn+"  "})
        toLink.textContent=str
    }

    static createNodeDiv(node:Node, workspace:Workspace) {
        let nodeDiv = html.createElement("div", "nodeDiv")
        
        // name section
        let nameButton = html.createButton(node.id, node.name, ()=>{})
        nodeDiv.appendChild(nameButton)

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

    // create a button and add it to the page for every options
    static menuOption(optObjList:Connector["option"]) {
        if (!BUTTONSECTION) {return}
        BUTTONSECTION.replaceChildren()
        if (optObjList.length==0){return }

        // forEach object: create button
        optObjList.forEach(obj=>{
            let b1 = html.createButton(FAKEID, obj.opt, obj.func)
            BUTTONSECTION.appendChild(b1)
        })
    }


}





