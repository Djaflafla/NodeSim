import type { Connector } from "./Connector.js";
import type { Node } from "./Node.js";

// no input bar error message
const NIBEM = "noBar"

// input bar id 
const IBI = "userInput"
const BASICOPTION = ["newNode"]


export class Menu {
    inputBar= document.getElementById(IBI) as HTMLInputElement | null;
    lastValue:string = ""
    optionToShow:string[] = []
    objTracker:{id:string; obj:Node|Connector}[] = []
     
    // if new input value
    // update menu option with given option
    inputUpdate() {
        let inputValue = this.getInputValue()
        
        // Check if value is the same as last
        if (inputValue == this.lastValue) {return}

        // pipe list of option to the renderer
        this.updateMenuOptions(this.getOption(inputValue))

        this.lastValue = inputValue
    }

    // look if known
    // or return basic
    getOption: (id:string)=>string[] = (id)=>{
        // check if id match a know object
        let match = this.objTracker.find(obj=> obj.id === id)
        
        // if not know, return basic options
        if (!match) {
            return BASICOPTION
        }
        return match.obj.option
    }
    
    getInputValue:()=>string = ()=>{
        if (!this.inputBar) {return NIBEM}
        return this.inputBar.value
    }
    
    updateMenuOptions(optList:string[]) {
        console.log("need to render option")

    }
}