import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import {Renderer as R} from "./Render.js"
import { Piece } from "./Piece.js"
import { Menu } from "./Menu.js"

export type FuncList = {
    type:string, 
    func:()=>void
}[]

type CreatePiece=(type:"node"|"conn", name:string, func?:()=>void)=> Piece

const POSSPIECE = [
    {type:"node", cstr:Node},
    {type:"conn", cstr:Connector}
]


export class Workspace {
    idList:string[] = []
    Q:Piece[]=[]
    pieceCollection:Piece[] = []
    menu=new Menu()
    funcForOption = [
        {type:"edit", func:()=>{}},
        {type:"addConn", func:()=>{}},
        {type:"delNode", func:()=>{
            this.delPiece(this.getPiece(this.menu.getInputVal()))
        }},
        {type:"newNode", func:()=>{
            // create node with inputvalue as name
            this.createPiece("node", this.menu.getInputVal())
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

    // Create a piece and push to pieceCollection
    // Render when finished
    createPiece: CreatePiece=(type, name, func=()=>{})=>{
        let id = crypto.randomUUID().slice(32)
        let piece = POSSPIECE.find(obj=>obj.type === type)!
        let newP = new piece.cstr(id, func, name)

        this.pieceCollection.push(newP)
        // console.log(this.pieceCollection)
        // console.log("^^^in createPiece^^^")
        R.renderWS(this)

        return newP
        
    }


    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(value:string)=>Piece|undefined = (value) => {

        //check by id first (id is more precise bc of uuid)
        let byid = this.pieceCollection.find(piece=>piece.id==value)

        let found:Piece[] = []
        let byname = undefined
        this.pieceCollection.forEach(piece=>{
            if (piece.name==value) {
                found.push(piece)
            }
        })
        if (found.length==1) {byname = found[0]}
        if (found.length>1) {console.log("multiple pieces with this name")}

        // console.log(`${found.length} is found Len`)
        return byid?byid:byname
        
    }

    delPiece (piece:Node|Connector|Piece|undefined) {
        if (!piece) {console.log("no piece to delete")}
        let indx = this.pieceCollection.findIndex(p=>p==piece)
        this.pieceCollection.splice(indx, 1)
        // console.log(this.pieceCollection)
        // console.log("^^^in delPiece^^^")
        this.menu.selectedPiece=undefined
        R.renderWS(this)
        
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