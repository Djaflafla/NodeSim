import { Connector } from "./Connector.js";
import { Node } from "./Node.js";
import type {Piece} from "./Workspace.js"
import type { Workspace } from "./Workspace.js";
import { Renderer } from "./Render.js";

const INBAR = document.getElementById("userInput") as HTMLInputElement  // input bar Element
const BASEOPTION:string[] = ["addInput", "addOutput"]
    
export class Menu {
    inputBar= INBAR;
    optList:string[] = BASEOPTION
    selectedPiece: Piece[] = []

    newInput(ws:Workspace){
        this.selectedPiece=[]
        this.updateSelected(this.getInputVal(), ws)
    }

    // update slectedPiece with given input
    updateSelected(input:string, ws:Workspace){
        if (input===""){
            this.setInputVal("")
            this.optList=BASEOPTION
            this.selectedPiece=[]
            return Renderer.updateMenu(ws)
        }
        
        let inputBarPiece = ws.getPiece(input)
        
        if (!inputBarPiece) {
            this.optList=BASEOPTION
            return Renderer.updateMenu(ws)
        }
        
        
        if (this.selectedPiece.length===1) {
            let sp = this.selectedPiece
            if (inputBarPiece instanceof Connector && sp[0] instanceof Connector){
                sp.push(inputBarPiece)
                if (sp[0].connection.connectedTo[sp[0].id]?.includes(sp[1] as Connector)){
                    this.optList = ["unlink"]
                } else {this.optList = ["link"]}
                return Renderer.updateMenu(ws)
            }
           this.selectedPiece = []
        }

        if (this.selectedPiece.length===0 || this.selectedPiece.length===2){
            this.selectedPiece = [inputBarPiece]
            this.optList = inputBarPiece.menuOption
            return Renderer.updateMenu(ws)
        }
        console.error("Why the fuck Am I here")
    }

    getInputVal () {
        return INBAR.value
    }

    setInputVal (value:string) {
        INBAR.value = value
    }
}