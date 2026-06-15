import type { Piece } from "./Piece.js";
import type {FuncList} from "./Workspace.js"
import type { Workspace } from "./Workspace.js";

const INBAR = document.getElementById("userInput") as HTMLInputElement  // input bar Element
const BASICOPTION = ["newNode"]


export class Menu {
    inputBar= INBAR;
    lastValue:string = ""
    pieceCollection:Piece[] = []
    funcList:FuncList = []
    selectedPiece:Piece|undefined


    getInputVal () {
        return INBAR.value
    }
    checkInputValue (ws:Workspace) {
        let input=this.getInputVal()
        let knownP = ws.getPiece(this.selectedPiece?this.selectedPiece.id:input)

        return input==""?[]:knownP?knownP.option:BASICOPTION
    }

    static setFuncList (opt:string[], ws:Workspace){
        ws.menu.funcList=[]
    
        if (opt.length==0){return}

        opt.forEach(optType=>{
            let funcObj = ws.funcForOption.find(func => func.type == optType)
            if (funcObj){ws.menu.funcList.push(funcObj)}
        })
    }

}