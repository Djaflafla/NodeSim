
import type { Node, nodeType } from "./Node.js"
import { InputNode } from "./Node.js"
import { Renderer } from "./Render.js"

type NF = {
    [type:string]:[nbInput:number, nbOutput:number, (node:Node)=>void]
}

export const nodeFunction = {
    "node" : [0, 0, ()=>{return}],

    "and" : [2, 1,(node)=>{

            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.error("missing conn for andFunc"); return}

            if (a.value == "1" && b.value == "1"){
               c.value = "1"
            } else {
                c.value = "0"
            }
        }],
        
        
    "or" : [2, 1, (node)=>{
            let a = node.connectors[0]
            let b = node.connectors[1]
            let c = node.connectors[2]
            if (!a || !b || !c){console.error("missing conn for andFunc"); return}
            
            if (a.value == "1" || b.value == "1"){
                c.value = "1"
            } else {
                c.value = "0"
            }
        }],
        
        
    "not" : [1, 1, (node)=>{
        let a = node.connectors[0]
        let b = node.connectors[1]
        if (!a || !b ){console.error("missing conn for andFunc"); return}
        
        a.value == "1"?b.value="0":b.value="1"
    }],
    
    "input" : [0, 1, (node)=>{

        let conn1 = node.connectors[0]
        if (conn1&&node instanceof InputNode){
            conn1.value = node.inputBar.value

        }
    }],
    
    "output" : [1, 0, (node)=>{
        // let a = node.connectors[0]
        // if (!a){return}
        // if (node.outputP) {node.outputP.textContent = `output: ${a.value}`}
    }],
    
    "wire" : [1, 1, (node)=>{
        if (node.connectors[0]&&node.connectors[1]){
            node.connectors[0].value = node.connectors[1].value
        }
    }],
    
    "add" : [2, 1, (node)=>{

        let a = node.connectors[0]
        let b = node.connectors[1]
        let c = node.connectors[2]
        if (!a || !b || !c){console.error("missing conn for addFunc"); return}

        if (typeof a === 'number' && typeof b === 'number') {
            let answ = a+b
            c.value = answ.toString()
        }
    }],
} satisfies NF

export function getFunction(funcKey:nodeType) {
    let func = nodeFunction[funcKey][2]
    if (!func) {console.error(`no function for key (nodeFunc). Key: ${funcKey}`);return (node:Node)=>{}}
    return func
}

// Returns value of number of connector for node
export function getNbConn(funcKey:nodeType):number {
    let nbIn = nodeFunction[funcKey][0]
    let nbOut = nodeFunction[funcKey][1]
        if (!nodeFunction[funcKey]) {console.error(`no value for key (nodeFunc). Key: ${funcKey}`);return 0}
        return nbIn+nbOut
}