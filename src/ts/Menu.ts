import type { Piece } from "./Piece.js";
import type {OptionList} from "./Workspace.js"
import { Renderer } from "./Render.js";
import type { Connector } from "./Connector.js";
import type { Node } from "./Node.js";
import type { Workspace } from "./Workspace.js";


type GetOption = (input:string, option:OptionList, pieceCollection:Piece[])=>OptionList
const NIBEM = "noBar"       // no input bar error message
const INBAR = document.getElementById("userInput") as HTMLInputElement  // input bar Element



export class Menu {
    inputBar= INBAR;
    lastValue:string = ""
    pieceCollection:Piece[] = []
    
    static getOption:GetOption = (input, option, pc)=>{
        if (input=="") {return []}
        
        // check if id match a know object
        let matchPiece = pc.find(piece=> piece.id === input || piece.name === input)

        // if not known: return optObj newNode[]
        if (!matchPiece) {
            let x = option.find(opt => opt.type == "newNode")
            return x ? [x] : []
        }

        // if known: get every optionObj for each opt in node/conn
        
        let optStrList = matchPiece.option

        let optObjList:OptionList = []
        optStrList.forEach(optStr=>{
            let optObj = option.find(opt => opt.type == optStr)
            if (optObj){optObjList.push(optObj)}
        })
        return optObjList
    
        
    }
    
    getInputValue:()=>string = ()=>{
        if (!this.inputBar) {return NIBEM}
        return this.inputBar.value
    }

}