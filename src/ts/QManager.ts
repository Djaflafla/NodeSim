import { Connection } from "./Connection.js";
import type { Node } from "./Node.js";

export class QManager {
    Q:Node[]=[]
    startingNodes:Node[]=[]
    checkInputUpdate:boolean=false

    clockAction(){
        if (this.checkInputUpdate) {
            // put first node after input in q
            this.initQ()
            this.checkInputUpdate=false
        }
        if (this.Q.length>0){this.runNextinQ()}
    }

    initQ(){
        this.Q = []
        this.startingNodes.forEach(node=>{
            let outputConex = node.getOutputConnections()  // return Conex[]
            let nextNodes = Connection.getNextNodes(outputConex)  // get nodes of input connectors in conex.subscriber
            this.Q = this.Q.concat(nextNodes)   // put nextNodes in Q
        })
    }

    runNextinQ(){
        if (this.Q.length<1){console.error("Q is empty")}
        let next:Node = this.Q[0]!

        next.updateInputs() // get value from connection
        next.run()  // process inputs and set output

        let updatedConex = Connection.updateConnection(next)  // update conex value. return Conex[]
        let nextNodes = Connection.getNextNodes(updatedConex)  // get nodes of input connectors in conex.subscriber
        this.Q = this.Q.concat(nextNodes)      // put nextNodes in Q
        
        this.Q.splice(0, 1)
    }

    
}