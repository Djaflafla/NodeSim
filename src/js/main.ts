const D:HTMLElement|null = document.getElementById("mainDiv")
const P:HTMLElement|null = document.getElementById("outputP")

import { Connector } from "./Connector.js"
import { Nodes } from "./Node.js"

type InValue = string[]
type outValue = string[]
    
function createElement(type:string, id:string){ 
    const newElem:HTMLElement|null = document.createElement(type)
    newElem.id = id
    return newElem
}

function createobj (arr1:string[], arr2:number[]) {
    return Object.fromEntries(arr1.map((key, index)=>[key, arr2[index]]))
}

const conn1 = new Connector()
const conn11 = new Connector()
const conn2 = new Connector()
const nd = new Nodes([conn1, conn11], [conn2], x)
conn1.value = "3"
conn11.value = "100"

function x (inarr:InValue):outValue {
    if (inarr[0]!==undefined&&inarr[1]!==undefined){
        const asw = Number(inarr[0])+Number(inarr[1])
        return [`${asw}`]
    }
    return ["runfunc failed"]
}

console.log(nd)
console.log(nd.runNode())