import type { Connector } from "./Connector.js";
import type { Node } from "./Node.js";
import { Renderer } from "./Render.js";

// no input bar error message
const NIBEM = "noBar"

// input bar id 
const IBI = "userInput"
const BASICOPTION = [{opt:"newNode", func:()=>{}}]


export class Menu {
    inputBar= document.getElementById(IBI) as HTMLInputElement | null;
    lastValue:string = ""
    optionToShow:string[] = []
    objTracker:{id:string; obj:Node|Connector}[] = []
     
    // if new input value
    // update menu option with given option
    inputUpdate() {
        let inputValue = this.getInputValue()
        
        // Check if value is the same as last or null
        if (inputValue == this.lastValue) {return}

        // pipe list of optObj to the renderer
        Renderer.menuOption(this.getOption(inputValue))

        this.lastValue = inputValue
    }

    // return option object {opt, func} from id
    getOption: (id:string)=>Connector["option"] = (id)=>{
        if (id=="") {return []}
        
        // check if id match a know object
        let match = this.objTracker.find(obj=> obj.id === id)
        
        // if not know, return basic options
        if (!match) {return BASICOPTION}
        return match.obj.option
    }
    
    getInputValue:()=>string = ()=>{
        if (!this.inputBar) {return NIBEM}
        return this.inputBar.value
    }

}