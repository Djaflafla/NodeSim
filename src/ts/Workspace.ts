import { Connector } from "./Connector.js"
import { Node } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Piece } from "./Piece.js"
import { Menu } from "./Menu.js"

export type FuncList = {
    type:string, 
    func:()=>void
}[]

type CreatePiece=(type:"node"|"conn", name:string|undefined, func?:()=>void)=> Node|Connector

const POSSPIECE = [
    {type:"node", cstr:Node},
    {type:"conn", cstr:Connector}
]

const FakeID = "in1"


export class Workspace {
    idList:string[] = []
    Q:Piece[]=[]
    pieceCollection:(Node | Connector)[] = []
    menu=new Menu()
    funcForOption = [
        {type:"edit", func:()=>{}},
        {type:"newConn", func:()=>{
            if (this.menu.selectedPiece instanceof Node){
                let conn = this.newConn(this.menu.selectedPiece)
                if (conn){
                    this.menu.setSelected(conn.id, this)
                }
            }
            R.renderWS(this)
        }},
        {type:"delNode", func:()=>{
            if (Array.isArray(this.menu.selectedPiece)){console.log("is an array in \"delNode\"");return}
            this.delPiece(this.menu.selectedPiece)
            this.menu.inputBar.value=""
            this.menu.setSelected("", this)
            R.renderWS(this)
            
        }},
        {type:"newNode", func:()=>{
            // create node with inputvalue as name
            let node = this.createPiece("node", this.menu.getInputVal())
            if (node){
                this.menu.setSelected(node.id, this)
            }
            R.renderWS(this)

        }},
        {type:"link", func:()=>{}},
        {type:"delConn", func:()=>{
            if (Array.isArray(this.menu.selectedPiece)){console.log("is an array in \"delConn\"");return}
            this.delPiece(this.menu.selectedPiece)
            this.menu.inputBar.value=""
            this.menu.setSelected("", this)
            R.renderWS(this)
            // delete from  pC and from conn
        }}
    ]


    doOpt(opt:string){
        let funcObj = this.funcForOption.find(obj=>obj.type== opt)
        funcObj?.func()
    }

    
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
    delPiece (piece:Piece|undefined) {
        if (!piece){console.log("no piece to del from delPiece()");return}
        if (piece instanceof Node) {
            piece.connectors.forEach(conn=>{
                let indx3 = this.pieceCollection.findIndex(c=>c==conn)
                this.pieceCollection.splice(indx3, 1)
            })
        }
        if (piece instanceof Connector) {
            
            // del conn from node.connector
            let node = piece.node
            let indx = node.connectors.findIndex(conn=>conn==piece)
            node.connectors.splice(indx, 1)
        }
        
        // del mentioned piece from pc
        let indx1 = this.pieceCollection.findIndex(p=>p==piece)
        this.pieceCollection.splice(indx1, 1)
        console.log("delPiece "+piece?.id)
    }

    //add in pieceCollection and in node.connectors
    newConn(node:Node|undefined){
        if (!node){return}
        let newConn = this.createPiece("conn", node.connectors.length.toString())

        if (!(newConn instanceof Connector)){return}
        node.connectors.push(newConn)
            if (newConn instanceof Connector){
                newConn.node = node
            }
        
        return newConn
    }

    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(value:string)=>Piece|undefined = (value) => {

        //check by id first (id is more precise bc of uuid)
        let byid = this.pieceCollection.find(piece=>piece.id==value)

        let found:(Node | Connector)[]= []
        let byname = undefined
        this.pieceCollection.forEach(piece=>{
            if (piece.name==value) {
                found.push(piece)
            }
        })
        if (found.length==1) {byname = found[0]}
        if (found.length>1) {console.log("multiple pieces with this name")}

        // console.log(`${found.length} is found Len`)
        // console.log(byid?byid:byname)
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