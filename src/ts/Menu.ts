import type { Piece } from "./Piece.js";
import type {OptionList} from "./Workspace.js"
import { Renderer } from "./Render.js";
import type { Connector } from "./Connector.js";
import type { Node } from "./Node.js";
import type { Workspace } from "./Workspace.js";


const NIBEM = "noBar"       // no input bar error message
const IBI = "userInput"     // input bar id 


type GetOption = (input:string, option:OptionList, pieceCollection:Piece[])=>OptionList

export class Menu {
    inputBar= document.getElementById(IBI) as HTMLInputElement | null;
    lastValue:string = ""
    pieceCollection:Piece[] = []
     
    // if new input value
    // update menu option with given option
    inputUpdate(option:OptionList, pc:Piece[]) {
        let inputValue = this.getInputValue()
        
        // // Check if value is the same as last or null
        // if (inputValue == this.lastValue) {return}


        // pipe list of optObj to the renderer
        let c =  Menu.getOption(inputValue, option, pc)!
        Renderer.menuOption(c)

        this.lastValue = inputValue
    }
    

    
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