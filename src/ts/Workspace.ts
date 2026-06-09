import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import { printConnMap, renderNodes, renderToLink, printLine } from "./Render.js"

export class Workspace {
    nodeList:Node[] = []
    idsToObject:string|Node|Connector[][] = []
    connToLink:string[] = []
    connToNode:string[][] = []
    connection:string[][] = []
    Q:Node[]=[]

    checkQ () {
        // if Node in Q, run it

        if (this.Q.length = 0) {return}
        if (!this.Q[0]) {return}

        this.Q[0].run()
        this.Q.shift()
    }

    // Create a node and push to nodeList
    createNode () {
        let nn = new Node()
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