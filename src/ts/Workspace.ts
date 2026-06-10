import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import {Renderer as R} from "./Render.js"
import { Piece } from "./Piece.js"
import { Menu } from "./Menu.js"

export type OptionList = {
    type:string, 
    func:()=>void
}[]

const POSSPIECE = [
            {type:"node", cstr:Node},
            {type:"conn", cstr:Connector}
]


export class Workspace {
    nodeList:Node[] = []
    connToLink:string[] = []
    connToNode:string[][] = []
    connection:string[][] = []
    Q:Piece[]=[]
    pieceCollection:Piece[] = []
    menu=new Menu()

    optList = [
        {type:"edit", func:()=>{}},
        {type:"addConn", func:()=>{}},
        {type:"delNode", func:()=>{}},
        {type:"newNode", func:()=>{
            // create node
            this.createPiece("node", this.menu.getInputValue())
            
            // console.log(this.pieceCollection)
        }},
        {type:"link", func:()=>{}},
        {type:"delConn", func:()=>{}}
    ]

    checkQ () {
        // if Node in Q, run it

        if (!this.Q[0] ) {return}

        this.Q[0].run()
        this.Q.shift()
    }

    // Create a node and push to nodeList
    createPiece:(type:string, name?:string, func?:()=>void)=> Node|Connector|Piece = (type:string, name="", func=()=>{})=>{
        let id = crypto.randomUUID()

        let piece = POSSPIECE.find(obj=>obj.type === type)
        if (!piece){return new Piece(id)}

        let newP = new piece.cstr(id, name, func)!

        this.pieceCollection.push(newP)
        this.menu.inputUpdate(this.optList, this.pieceCollection)
        console.log("new piece created")
        return newP
        
    }

    // toLink (connID:string) {
    //     if (this.connToLink.length>1) {
    //         this.connToLink.shift()
    //     }
    //     this.connToLink.push(connID)
    //     R.renderToLink(this)
    // }

    // addConn(node:Node){
    //     let newConn = this.createPiece("conn")
    //     if (!newConn) {return}
    //     if (newConn !== typeof Connector) {return}

    //     node.connectors.push(newConn)
    //     this.connToNode.push([newConn.id, node.id])
    //     R.rnode(this.nodeList, this)
    //     return newConn
    // }


    // link() {
    //     if (!this.connToLink[0] || !this.connToLink[1]){return}

    //     this.connection.push(this.connToLink)
    //     R.printLine(this.connToLink[0], this.connToLink[1])
    //     console.log(`connected conns ${this.connToLink[0]} and ${this.connToLink[1]}`)
    // }
}