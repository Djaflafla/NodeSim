import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"
import type { NestedConnectors } from "./Connection.js"


export const CFFunc = {
    cleanCF: (array:NestedConnectors):NestedConnectors => {
        if (!array[0]){throw new Error("wtf code bhtjoi")}

        // remove lonely/empty

        let workArray = array
        workArray = CFFunc.removeExtra(workArray)
        workArray = CFFunc.cleanFirstConn(workArray)
        workArray = CFFunc.cleanLastConn(workArray)
        
        // 
        return workArray
        // let withNoEmptyArray = 
        // let connInFirst = CFFunc.cleanFirstConn(array)
    },


    cleanLastConn : (array:NestedConnectors):NestedConnectors => {
        if (array.length < 2){return array}
        let last = array[array.length-1]
        if (Array.isArray(last)){
            // if last is an array
            array.pop()
            last.forEach(elem=>{array.push(elem)})
        }
        return array
    },


    // Removes empty. [2, []] = [2]
    // Removes length=1. [[2], 1] = [2, 1]
    // Removes nestedarrays. [[2]] = [2]
    removeExtra : (array:NestedConnectors):NestedConnectors => {
        let clean:NestedConnectors = []
        for (let e of array) {
            if (e instanceof Connector){clean.push(e)}
            if (Array.isArray(e)) {
                let check = CFFunc.removeExtra(e)
                if (check.length == 1){
                    clean.push(check[0]!)
                } else if (check.length >1) {
                    clean.push(check)
                }
            }
        }
        if (clean.length==1 && Array.isArray(clean[0])) {
            return clean[0]
        }
        return clean
    },

    // returns an array with the first element being a conn
    // Doesn't accept empty array. anywhere
    cleanFirstConn : (array:NestedConnectors):NestedConnectors => {
        let clean = []
        if (array[0] instanceof Connector) {
            // If first index of this array is a conn, return array
            return array
        }
        if (Array.isArray(array[0])) {
            array[0].reverse()
            

            let temp = CFFunc.cleanFirstConn(array[0])
            
            temp.forEach(conn=>{
                clean.push(conn)
            })
            // met le resste
            for (let i =1; i<array.length; i++){
                clean.push(array[i]!)
            }
            return CFFunc.cleanFirstConn(clean)
        }
        throw new Error ("wtf, code 44444")
    },

    // cleanLonely: (array:NestedConnectors):NestedConnectors => {
    //     let clean = []
    //     for (let [index, elem] of array.entries()){
    //         if (elem instanceof Connector){
    //             clean.push(elem)
    //         }
    //         if (Array.isArray(elem)) {
    //             // Do nothing if elem.length==0
    //             if (elem.length==1 && elem[0]) {clean.push(elem[0])}
    //             if (elem.length>1) {
    //                 clean.push()
    //             }
    //         }
    //     }
    //     return clean
    // },


    splitFlow: (conn1:Connector, array:NestedConnectors, cm:ConnectionManager):[NestedConnectors, Boolean] => {
        // Returns connectionFlow array without the splited bit
        // Creates connection if able
        function splitAction (index: number, array:NestedConnectors):NestedConnectors{
            // get last part of array and remove conn to delete from array
            let lastHalfArray = array.splice(index)
            lastHalfArray.splice(0, 1)
            
            // Create connexion if more than 2 connector
            if (lastHalfArray.length>1) {
                cm.createConnection(lastHalfArray)
            } else if (lastHalfArray[0] instanceof Connector){
                // if alone in array: remove conexId from conn. do nothing with the array
                    lastHalfArray[0].connectionId=""
            }

            return array
        }
        
        for (let [index, elem] of array.entries()) {
            if (elem === conn1) {
                return [splitAction(index, array), true]
            }

            if (Array.isArray(elem)) {
                // Loop through array
                let returnObj = CFFunc.splitFlow(conn1, elem, cm)

                if (returnObj.length<1) {array = splitAction(index, array)}

                if (returnObj[1]) {return [array, true]}
            }
        }
        return [array, false]
    },
    
    
    // Returns an array with the new connector connected to target connector.
    // Returned CF is clean
    addInsideFlow: (newConn:Connector, targetConn:Connector, array:NestedConnectors):[NestedConnectors, Boolean] =>{
        for (let [index, elem] of array.entries()) {
            if (elem === targetConn) {
                // Check to add last
                if (array[array.length-1]==targetConn){
                    // if last of its array
                    array.push(newConn)
                    return [array, true]
                }

                // take index
                // replace indexed by [itself, newConn]
                array.splice(index, 1, [targetConn, newConn])
                return [array, true]
            } 
            if (Array.isArray(elem)) {
                // Loop through array
                let returnObj = CFFunc.addInsideFlow(newConn, targetConn, elem)
                array.splice(index, 1, returnObj[0])
                if (returnObj[1]){return [array, true]}
            }
        }
        return [array, false]
    }
}
