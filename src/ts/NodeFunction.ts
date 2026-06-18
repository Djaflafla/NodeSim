import { Node } from "./Node.js"

// const POSSNODE = ["and", "or", "not", "input", "wire"]
export class NodeFunction {
    static funcForNode:{type:string, func:(node:Node)=>void}[] = [
        {type:"node", func:(node)=>{}},

        {type:"and", func:(node)=>{

            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.log("missing conn for andFunc"); return}

            if (a.value == "1" && b.value == "1"){
               c.value = "1"
            } else {
                c.value = "0"
            }
        }},
        
        
        {type:"or", func:(node)=>{
            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.log("missing conn for andFunc"); return}
    
            if (a.value == "1" || b.value == "1"){
               c.value = "1"
            } else {
                c.value = "0"
            }
        }},
        
        
        {type:"not", func:(node)=>{
            let a = node.connectors[0]
            let b = node.connectors[1]
            if (!a || !b ){console.log("missing conn for andFunc"); return}
    
            a.value == "1"?b.value="0":b.value="1"
        }},


        {type:"input", func:(node)=>{
            let a = node.connectors[0]
            if (!a || !node.inputValue ){return}
            a.value = node.inputValue
        }},


        {type:"wire", func:(node)=>{
            // output a = input 1
        }},

    ]

    static getFunction(type:string){
        let funcObj = NodeFunction.funcForNode.find(func=>func.type == type)
        return funcObj?.func
    }
}