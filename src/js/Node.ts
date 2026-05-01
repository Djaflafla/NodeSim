
import { Connector } from "./Connector.js";
type InValue = string[]
type outValue = string[]
type runFunction = (inval:InValue)=>outValue

export class Nodes {
    input: Connector[];
    output: Connector[];
    runFunction:runFunction
    
    constructor(inputList:Connector[],
        outputList:Connector[],
        runFunction:runFunction
    ) {
        this.input = inputList;
        this.output = outputList;
        this.runFunction = runFunction
    }


    runNode() {

        // Get value for function
        const inputsForFunction:InValue = Connector.getConnValue(this.input)

        // Get value for output(Run function)
        const valueForOutput:outValue = this.runFunction(inputsForFunction);

        // Set output
        

        return valueForOutput
        // Let know that the next node is ready
    }
}