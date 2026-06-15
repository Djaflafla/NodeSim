import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Piece } from "./Piece.js"
import { Menu } from "./Menu.js"

export type FuncList = {
    type:string, 
    func:()=>void
}[]

type CreatePiece=(type:"node"|"conn", name:string|undefined, func?:()=>void)=> Piece

const POSSPIECE = [
    {type:"node", cstr:Node},
    {type:"conn", cstr:Connector}
]

const FakeID = "in1"


export class Workspace {
    idList:string[] = []
    Q:Piece[]=[]
    pieceCollection:Piece[] = []
    menu=new Menu()
    funcForOption = [
        {type:"edit", func:()=>{}},
        {type:"addConn", func:()=>{
            this.addConn(this.getPiece(this.menu.getInputVal()))
            R.renderWS(this)
        }},
        {type:"delNode", func:()=>{
            this.delPiece(this.menu.selectedPiece)
            R.renderWS(this)

        }},
        {type:"newNode", func:()=>{
            // create node with inputvalue as name
            this.createPiece("node", this.menu.getInputVal())
            R.renderWS(this)

        }},
        {type:"link", func:()=>{}},
        {type:"delConn", func:()=>{
            // delete from  pC and from conn
        }}
    ]



    
    checkQ () {
        // if Node in Q, run it

        if (!this.Q[0] ) {return}

        this.Q[0].run()
        this.Q.shift()
    }

    // Create a piece and push to pieceCollection
    createPiece: CreatePiece=(type, name, func=()=>{})=>{
        let id = crypto.randomUUID().slice(32)
        let piece = POSSPIECE.find(obj=>obj.type === type)!
        let newP = new piece.cstr(id, func, name)
        this.pieceCollection.push(newP)
        return newP
        
    }

    // delete node and its connectors from pieceCollection
    // delete Conn from pieceCollection and from node.connectors
    delPiece (piece:Node|Connector|Piece|undefined) {
        if (!piece){return}
        let indx = this.pieceCollection.findIndex(p=>p==piece)
        this.pieceCollection.splice(indx, 1)
        if (piece instanceof Node && piece.connectors.length>0) {
            piece.connectors.forEach(conn=>{
                this.delPiece(conn)
            })
        }
        if (piece instanceof Connector) {
            
            // del conn from node.connector
            let node = piece.node
            let indx = node.connectors.findIndex(conn=>conn==piece)
            node.connectors.slice(indx, 1)
        }
        // del mentioned piece from pc
        let indx1 = this.pieceCollection.findIndex(p=>p=piece)
        this.pieceCollection.slice(indx1, 1)

        if (!piece) {console.log("no piece to delete");return}
        this.menu.selectedPiece=undefined
        Renderer.renderWS(this)
        
    }

    //add in pieceCollection and in node.connectors
    addConn(piece:Piece|undefined){
        if (piece instanceof Node) {
            let newConn = this.createPiece("conn", piece.connectors.length.toString())
            if (newConn instanceof Connector){
                piece.connectors.push(newConn)
                newConn.node = piece
            }
        }
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

    // toLink (connID:string) {
    //     if (this.connToLink.length>1) {
    //         this.connToLink.shift()
    //     }
    //     this.connToLink.push(connID)
    //     R.renderToLink(this)
    // }


    // link() {
    //     if (!this.connToLink[0] || !this.connToLink[1]){return}

    //     this.connection.push(this.connToLink)
    //     R.printLine(this.connToLink[0], this.connToLink[1])
    //     console.log(`connected conns ${this.connToLink[0]} and ${this.connToLink[1]}`)
    // }
}