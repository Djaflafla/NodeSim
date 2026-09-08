import type { Node, nodeType } from "./Node.js"

type NF = {
    [type:string]:[nbConn:number,(node:Node)=>void]
}

export const nodeFunction = {
    "node" : [0, ()=>{}],

    "and" : [3, (node)=>{

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
        
        
    "or" : [3, (node)=>{
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
        
        
    "not" : [2, (node)=>{
        let a = node.connectors[0]
        let b = node.connectors[1]
        if (!a || !b ){console.error("missing conn for andFunc"); return}
        
        a.value == "1"?b.value="0":b.value="1"
    }],
    
    
    "input" : [1, (node)=>{
        let a = node.connectors[0]
        if (!a || !node.inputValue ){return}
        a.value = node.inputValue
    }],
    
    "output" : [1, (node)=>{
        let a = node.connectors[0]
        if (!a){return}
        if (node.outputP) {node.outputP.textContent = `output: ${a.value}`}
    }],
    
    "wire" : [2, (node)=>{
        if (node.connectors[0]&&node.connectors[1]){
            node.connectors[1].value = node.connectors[0].value
        }
    }],
    
    "add" : [3, (node)=>{

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
    let func = nodeFunction[funcKey][1]
    if (!func) {console.error(`no function for key (nodeFunc). Key: ${funcKey}`);return ()=>{}}
    return func
}

// Returns value of number of connector for node
export function getNbConn(funcKey:nodeType) {
    let nb = nodeFunction[funcKey][0]
        if (!nb) {console.error(`no value for key (nodeFunc). Key: ${funcKey}`);return 0}
        return nb
}