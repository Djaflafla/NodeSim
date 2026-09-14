import type { NestedConnectors } from "./Connection.js"
import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"

export const CFFunc = {
    connectionFlowCorrection: (array:NestedConnectors):NestedConnectors => {
        if (!array[0]){throw new Error("wtf code bhtjoi")}
        

        // returns an array with the first element being a conn
        // Doesn't accept empty array. anywhere
        function cleanFirstConn(array:NestedConnectors):NestedConnectors{
            let clean = []
            if (Number.isFinite(array[0])) {
                // If first index of this array is a conn, return array
                return array
            }
            if (Array.isArray(array[0])) {
                array[0].reverse()
                

                let temp = cleanFirstConn(array[0])
                
                temp.forEach(conn=>{
                    clean.push(conn)
                })
                // met le resste
                for (let i =1; i<array.length; i++){
                    clean.push(array[i]!)
                }
                console.log(JSON.stringify(array));
                return cleanFirstConn(clean)
            }
            throw new Error ("wtf, code 44444")
        }
        return cleanFirstConn(array)
        function x (array:NestedConnectors, clean:NestedConnectors):NestedConnectors {
            for (let [index, elem] of array.entries()){
                if (elem instanceof Connector){
                    clean.push(elem)
                }
                if (Array.isArray(elem)) {
                    // Do nothing if elem.length==0
                    if (elem.length==1 && elem[0]) {clean.push(elem[0])}
                    if (elem.length>1) {
                        clean.push()
                    }
                }
            }
            return clean
        }
    }, 


    removeInConnectionFlow: (conn1:Connector, array:NestedConnectors, cm:ConnectionManager):[NestedConnectors, Boolean] => {
    
        let connectionToCreate = []

        for (let [index, connOrArray] of array.entries()) {
            if (connOrArray === conn1) {

                // get last part of array and remove conn to delete
                let lastHalfArray = array.splice(index)
                lastHalfArray.splice(0, 1)
                connectionToCreate.push(lastHalfArray)


                // Create connexion if more than 2 connector
                if (lastHalfArray.length>1) {cm.createConnection(lastHalfArray)}
                else {
                    // if alone in array: remove conexId from conn. do nothing with the array
                    if (lastHalfArray[0] instanceof Connector){
                        lastHalfArray[0].connectionId=""
                    } else {console.error("lastHalfArray is not a connector")}
                } 

                // returning spliced array
                // May be empty or 1
                return [array, true]
            }
            if (Array.isArray(connOrArray)) {
                // Loop through array
                let returnObj = CFFunc.removeInConnectionFlow(conn1, connOrArray, cm)
                array.splice(index, 1, returnObj[0])
                if (returnObj[1]) {return [array, true]}
            }
        }
        return [array, false]
    },
    
    
    addInConnectionFlow: (conn1:Connector, conn2:Connector, array:NestedConnectors):[NestedConnectors, Boolean] =>{
        for (let [index, connOrArray] of array.entries()) {
            if (connOrArray === conn2) {
                if (array[array.length-1]==conn2){
                    // if last of its array
                    array.push(conn1)
                    return [array, true]
                }
                // take index
                // replace indexed by [itself, newConn]
                array.splice(index, 1, [conn2, conn1])
                return [array, true]
            } 
            if (Array.isArray(connOrArray)) {
                // Loop through array
                let returnObj = CFFunc.addInConnectionFlow(conn1, conn2, connOrArray)
                array.splice(index, 1, returnObj[0])
                if (returnObj[1]){return [array, true]}
            }
        }
        return [array, false]
    }
}
