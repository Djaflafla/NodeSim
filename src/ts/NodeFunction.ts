import { Node } from "./Node.js"

// const POSSNODE = ["and", "or", "not", "input", "wire"]
export class NodeFunction {
    static funcForNode:{type:string, func:(node:Node)=>void}[] = [
        {type:"node", func:(node)=>{}},

        {type:"and", func:(node)=>{

            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.error("missing conn for andFunc"); return}

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
            if (!a || !b || !c){console.error("missing conn for andFunc"); return}
            
            if (a.value == "1" || b.value == "1"){
                c.value = "1"
            } else {
                c.value = "0"
            }
        }},
        
        
        {type:"not", func:(node)=>{
            let a = node.connectors[0]
            let b = node.connectors[1]
            if (!a || !b ){console.error("missing conn for andFunc"); return}
            
            a.value == "1"?b.value="0":b.value="1"
        }},
        
        
        {type:"input", func:(node)=>{
            let a = node.connectors[0]
            if (!a || !node.inputValue ){return}
            a.value = node.inputValue
        }},
        
        {type:"output", func:(node)=>{
            let a = node.connectors[0]
            if (!a){return}
            if (node.outputP) {node.outputP.textContent = `output: ${a.value}`}
        }},
        
        {type:"wire", func:(node)=>{
            if (node.connectors[0]&&node.connectors[1]){
                node.connectors[1].value = node.connectors[0].value
            }
            
            
        }},
        
        {type:"add", func:(node)=>{

            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.error("missing conn for addFunc"); return}

            if (typeof a === 'number' && typeof b === 'number') {
                let answ = a+b
                c.value = answ.toString()
            }
        }},
    ]

    static getFunction(type:string){
        let funcObj = NodeFunction.funcForNode.find(func=>func.type == type)
        return funcObj?.func
    }
}