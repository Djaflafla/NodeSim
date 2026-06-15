import type { Connector } from "./Connector.js";
import { Piece } from "./Piece.js";
import type {FuncList} from "./Workspace.js"
import type { Workspace } from "./Workspace.js";

const INBAR = document.getElementById("userInput") as HTMLInputElement  // input bar Element
const BASICOPTION = ["newNode"]


export class Menu {
    inputBar= INBAR;
    lastValue:string = ""
    // pieceCollection:Piece[] = []
    optList:string[] = []
    selectedPiece: Piece |undefined 

    // 
    setSelected(pieceId:string, ws:Workspace) {
        this.optList= []
    
        let p = ws.getPiece(pieceId)
        if (!p) {
            this.selectedPiece=undefined;
            pieceId==""?this.optList=[]:this.optList= ["newNode"]
            return
        }
        this.selectedPiece=p
        this.optList=p.option
    }

    getInputVal () {
        return INBAR.value
    }
}