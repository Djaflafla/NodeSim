import type { Node } from "./Node.js"

// const POSSNODE = ["and", "or", "not", "input", "wire"]
export class NodeFunction {
    static funcForNode:{type:string, func:(node:Node)=>void}[] = [
        {type:"node", func:()=>{}},

        {type:"and", func:(node)=>{

            let a = node.connectors[0]
            let b = node.connectors[1]

            if (a?.value == "1" && b?.value == "1"){
                node.connectors[2]?node.connectors[2].value = "1":console.log("\"and\" function in funcForPiece")
            } else {node.connectors[2]?node.connectors[2].value = "0":console.log("\"and\" function in funcForPiece")}
        }},


        {type:"or", func:()=>{
            // Read input 1
            // Read input 2
            // Logic
            // Set output a
        }},


        {type:"not", func:()=>{
            // Read input 1
            // Logic
            // Set output a
        }},


        {type:"input", func:()=>{
            // Read inputbar
            // set output a
        }},


        {type:"wire", func:()=>{
            // output a = input 1
        }},

    ]

    static getFunction(type:string){
        let funcObj = NodeFunction.funcForNode.find(func=>func.type == type)
        return funcObj?.func
    }
}