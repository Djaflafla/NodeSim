
import type { Node, nodeType } from "./Node.js"
import { InputNode, OutputNode } from "./Node.js"
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
    
    "input" : [1, 1, (node)=>{

        let conn1 = node.connectors[0]
        let conn2 = node.connectors[1]
        if (conn1&&conn2){
            conn2.value = conn1.value
        }
    }],
    
    "output" : [1, 0, (node)=>{
        let a = node.connectors[0]
        if (!a || !(node instanceof OutputNode)){console.error("output node fuckerie");return}
        node.setOutput(a.value)
    }],
    
    "wire" : [1, 1, (node)=>{
        if (node.connectors[0]&&node.connectors[1]){
            node.connectors[1].value = node.connectors[0].value
        }
    }],
    
    "add" : [2, 1, (node)=>{

        let a = node.connectors[0]
        let b = node.connectors[1]
        let c = node.connectors[2]
        if (!a || !b || !c){console.error("missing conn for addFunc"); return}

        let avalue = Number.parseInt(a.value)
        let bvalue = Number.parseInt(b.value)
        if (!Number.isFinite(avalue) || !Number.isFinite(bvalue) ){console.error("cannot add because not a number");return}

        c.value = (bvalue+avalue).toString()
    }],
} satisfies NF

export function getFunction(funcKey:nodeType) {
    let func = nodeFunction[funcKey][2]
    if (!func) {console.error(`no function for key (nodeFunc). Key: ${funcKey}`);return (node:Node)=>{}}
    return func
}

// Returns value of number of connector for node
export function getNbConn(funcKey:nodeType):[number, number] {
    if (!nodeFunction[funcKey]) {console.error(`no value for key (nodeFunc). Key: ${funcKey}`);return [0, 0]}
    let nbIn = nodeFunction[funcKey][0]
    let nbOut = nodeFunction[funcKey][1]
    return [nbIn, nbOut]
}