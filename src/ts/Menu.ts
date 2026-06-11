import type { Piece } from "./Piece.js";
import type {FuncList} from "./Workspace.js"
import type { Connector } from "./Connector.js";
import type { Node } from "./Node.js";
import type { Workspace } from "./Workspace.js";


type GetOption = (input:string, option:FuncList, ws:Workspace)=>FuncList
const INBAR = document.getElementById("userInput") as HTMLInputElement  // input bar Element
const BASICOPTION = ["newNode"]


export class Menu {
    inputBar= INBAR;
    lastValue:string = ""
    pieceCollection:Piece[] = []
    funcList:FuncList = []
    selectedPiece:Node|Connector|Piece|undefined


    getInputVal () {
        return INBAR.value
    }
    checkInputValue (ws:Workspace) {
        let input=this.getInputVal()
        let knownP = ws.getPiece(this.selectedPiece?this.selectedPiece.id:input)

        Menu.setFuncList(input==""?[]:knownP?knownP.option:BASICOPTION, ws)
    }

    static setFuncList (opt:string[], ws:Workspace){
        ws.menu.funcList=[]
    
        if (opt.length==0){ws.menu.funcList=[];return}

        opt.forEach(optType=>{
            let funcObj = ws.funcForOption.find(func => func.type == optType)
            if (funcObj){ws.menu.funcList.push(funcObj)}
        })
    }

}