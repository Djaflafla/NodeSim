import { Connector } from "./Connector.js"
import { Node, InputNode, OutputNode} from "./Node.js"
import { Menu } from "./Menu.js"
import { menuFunc, type PossibleMenuFunc } from "./menuFunc.js"
import { ConnectionManager } from "./ConnectionManager.js"
import { QManager } from "./QManager.js"

export type Piece = Node|Connector

export type pieceCollection = {
    [id:string]:Piece
}


export class Workspace {

    cm: ConnectionManager
    menu: Menu
    qm: QManager
    pieceCollection: pieceCollection

    constructor (){
        this.cm = new ConnectionManager()
        this.menu = new Menu()
        this.qm = new QManager()
        this.pieceCollection = {}
    }
   

    doOpt(opt:PossibleMenuFunc){
        let func = menuFunc[opt]
        if (!func) {console.error(`no function for option: ${opt}`);return}
        func(this)
    }

    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(search:string)=>Piece | undefined = (search) => {
        let found:(Piece)[]= []

        //check by id first (id is more precise bc of uuid)
        if (this.pieceCollection[search]) {
            found.push(this.pieceCollection[search])
        }
        if (found.length==1) {return found[0]}
        if (found.length>1) {console.error("multiple pieces with this id")}

        for (let [Key, piece] of Object.entries(this.pieceCollection)) {
            if (piece.name==search) {
                found.push(piece)
            }   
        }
        if (found.length==1) {return found[0]}
        if (found.length>1) {
            console.error("multiple pieces with this name")
            console.error(`Here's the found pieces: ${found}`)
        }
    }

    
    
}
