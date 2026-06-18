import { Connector } from "./Connector.js"
import { Node, POSSNODE } from "./Node.js"
import type { nodeType } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Menu } from "./Menu.js"
import { NodeFunction as nf} from "./NodeFunction.js" 


export type FuncMap = {
    type:nodeType, 
    func:()=>void
}[]
export type Piece = Node|Connector



export class Workspace {
    idList:string[] = []
    Q:(Piece)[]=[]
    pieceCollection:(Piece)[] = []
    menu=new Menu()
    funcForOption = [
        {type:"newNode", func:()=>{
            let input = this.menu.getInputVal()
            let known = POSSNODE.find(str=>str==input)

            let node = Node.createNode(this, known?known:"node", input)
            this.pieceCollection.push(node)
            this.menu.setSelected(node.id, this)
            R.renderWS(this)

        }},


        {type:"newConn", func:()=>{
        let sp = this.menu.selectedPiece
            if (!(sp instanceof Node)){console.log("seleceted piece is not a node in newConn");return}
            sp.addConn(this)


            // put new conn in selectedPiece
            // if (newConn){this.menu.setSelected(conn.id, this)}

            R.renderWS(this)
        }},

        
        {type:"delNode", func:()=>{
            if (Array.isArray(this.menu.selectedPiece)){console.log("is an array in \"delNode\"");return}
            if (!this.menu.selectedPiece){return}
            Node.delPiece(this.menu.selectedPiece, this)
            this.menu.inputBar.value=""
            this.menu.setSelected("", this)
            R.renderWS(this)
            
        }},


        {type:"delConn", func:()=>{
            if (Array.isArray(this.menu.selectedPiece)){console.log("is an array in \"delConn\"");return}
            if (!this.menu.selectedPiece){return}
            Node.delPiece(this.menu.selectedPiece, this)
            this.menu.inputBar.value=""
            this.menu.setSelected("", this)
            R.renderWS(this)
            // delete from  pC and from conn
        }},


        {type:"edit", func:()=>{}},
        {type:"link", func:()=>{}},
    ]

   

    doOpt(opt:string){
        let funcObj = this.funcForOption.find(obj=>obj.type== opt)
        funcObj?.func()
    }

    
    // checkQ () {
    //     // if Node in Q, run it
    //     let next = this.Q[0]
    //     if (!next || !(next instanceof Node)) {return}

    //     next.run(next)
    //     this.Q.shift()
    // }

    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(value:string)=>Piece | undefined = (value) => {

        //check by id first (id is more precise bc of uuid)
        let byid = this.pieceCollection.find(piece=>piece.id==value)

        let found:(Piece)[]= []
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
}