import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import { printConnMap, renderNodes, renderToLink, printLine } from "./Render.js"

export class Workspace {
    nodeList:Node[] = []
    connToLink:string[] = []
    connToNode:string[][] = []
    connection:string[][] = []

    
    // Create a node and push to nodeList
    createNode (name = "") {
        let nn = new Node(name)
        this.nodeList.push(nn)
        renderNodes(this.nodeList, this)
        return nn
    }

    toLink (connID:string) {
        if (this.connToLink.length>1) {
            this.connToLink.shift()
        }
        this.connToLink.push(connID)
        renderToLink(this)
    }

    addConn(node:Node){
        let newConn = new Connector(crypto.randomUUID().slice(30))
        node.connectors.push(newConn)
        this.connToNode.push([newConn.id, node.id])
        renderNodes(this.nodeList, this)
        return newConn
    }


    link() {
        if (!this.connToLink[0] || !this.connToLink[1]){return}

        this.connection.push(this.connToLink)
        printLine(this.connToLink[0], this.connToLink[1])
        console.log(`connected conns ${this.connToLink[0]} and ${this.connToLink[1]}`)
    }
}