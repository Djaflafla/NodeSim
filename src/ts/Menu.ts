import { Connector } from "./Connector.js";
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
    selectedPiece: Piece |Connector[]|undefined 



    // set selected piece, set available options, update inputBar
    setSelected(pieceId:string, ws:Workspace) {
        this.optList= []
    
        let p = ws.getPiece(pieceId)
        if (!p) {
            this.selectedPiece=undefined;
            pieceId==""?this.optList=[]:this.optList= ["newNode"]
            return
        }
        if (this.selectedPiece instanceof Connector && p instanceof Connector){

            this.selectedPiece = [this.selectedPiece, p]

            let a = this.selectedPiece[0]?.name?this.selectedPiece[0].name:this.selectedPiece[0]?.id
            let b = this.selectedPiece[1]?.name?this.selectedPiece[1].name:this.selectedPiece[1]?.id
            this.inputBar.value = `${a}, ${b}` 
            this.optList=["link"]
            return
        }
        this.selectedPiece=p
        this.optList=p.option
        this.inputBar.value = this.selectedPiece.name?this.selectedPiece.name:this.selectedPiece.id
    }

    getInputVal () {
        return INBAR.value
    }
}