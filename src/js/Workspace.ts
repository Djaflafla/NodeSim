import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import { renderNodes, renderToLink } from "./Render.js"

export class Workspace {
    nodeList:Node[] = []
    linkCouple:string[] = []
    connToNode:string[][] = []
    connection:string[][] = []

    
    // Create a node and push to nodeList
    createNode (id:string, name = "") {
        let nn = new Node(id, name)
        this.nodeList.push(nn)
        document.dispatchEvent(new Event("render"))
        return nn
    }

    toLink (connID:string) {
        if (this.linkCouple.length>1) {
            this.linkCouple.shift()
        }
        this.linkCouple.push(connID)
        renderToLink(this)
    }

    addConn(node:Node){
        let newConn = new Connector(crypto.randomUUID().slice(30))
        node.connectors.push(newConn)
        this.connToNode.push([newConn.id, node.id])
        renderNodes(this.nodeList, this)
    }


    link() {
        if (this.linkCouple.length !== 2) {
            console.log("need 2 conn to link")
            return
        }
        if (this.linkCouple[0] && this.linkCouple[1]){
            let conn = []
            conn[0]=this.linkCouple[0]
            conn[1]=this.linkCouple[1]
            this.connection.push(conn)
            console.log(`connected conns ${this.linkCouple[0]} and ${this.linkCouple[1]}`)
        }
    }
}