import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import type { NestedConnectors } from "./Connection.js"
import { Connector } from "./Connector.js"

const ws = new Workspace()
// init(ws)

type z = (number|z)[]

// [25, 86, [3, 77], [66, 7, 8, 9], 4, 5, 6]
// [[86, 25], [3, 77], [66, 7, 8, 9], 4, 5, 6]

// [[[66, 7, 8, 9], [3, 77], [86, 25]], 4, 5, 6]
// array = [[[86, 25], [3, 77], [66, 7, 8, 9]], 4, 5, 6]
// temp1 = check1(array[0]) [[86, 25], [3, 77], [66, 7, 8, 9]]

// temp2 = check2 [25, 86] = [25, 86]
// clean2 = [25, 86, [3, 77], [66, 7, 8, 9]]
// return1 check [25, 86, [3, 77], [66, 7, 8, 9]]

// temp1 = [25, 86, [3, 77], [66, 7, 8, 9]]
// clean1 = [25, 86, [3, 77], [66, 7, 8, 9], 4, 5, 6]



// [[[66, 7, 8, 9], [3, 77], [86, 25]], 4, 5, 6]
// [[[86, 25], [3, 77], [66, 7, 8, 9]], 4, 5, 6]
// [[[25, 86], [3, 77], [66, 7, 8, 9]], 4, 5, 6]
// [[25, 86, [3, 77], [66, 7, 8, 9]], 4, 5, 6]
// [25, 86, [3, 77], [66, 7, 8, 9], 4, 5, 6]

// [[[66, 3, 77], 7, 8, 9], [86, 25]]
// [[66, 7, 8, 9], 3, 77], [86, 25]], 4]


// [[86, 25], [3, 77], [66, 7, 8, 9], 4, 5, 6]

function cleanFirstConn(array:z):z{
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

let test2 = [[[], 3], 4, 5, 6]
// [3,[],4,5,6]
// [3,[2,9,55],4,5,6]
let array = [[[], [86, 25], []], 4, 5, 6]
let res = cleanFirstConn(array)
console.log(JSON.stringify(res));


// Did Connectors, Connection, Connection Manager
// Connect(), delConn()
// Everything is a dict now
// Removed addConn from menuOptions
// Special class for input and output node
// printLine is printing
// setButton sets
// Can add a single conn to a connection
// did addInConnectionFlow. good mental challenge. only for 1 at the time
// addConector(). only work with a connectionless conn1

// Did a big chunk of connection. ConnectionFlowCorrection, Del conn, add connector, link/connect

// delConnFromConnection and removeInConnectionFlow
// Clean last index of CF
// Connect two existing connexion
// unlink


// Put TEXTFORCONN = to their value


// connect array = [1, [2, 3], [4, 5]]
// connect array = [1, [2, 3], 4, 5]     4, 5 are end of line, so ...
// 1 is connected to 2 then 4
// 3 is connect to 2 then 1
// 2 is connected to 3 and to 1
// 3->5 = [3, 2, 4, 5]
// add next to it when first or last
// create branch when in between other conn





// [1, [2, 3], 4, 5]
// [2, 3]
// [[2, 7], 3]
// [1, [[2, 7], 3], 4, 5]
// 

// [1, [2, 3], 4, 5]
// [2, 3]
// [1, [2, 3], 4, 5]
// [[4, 6], 5]
// [1, [2, 3], [4, 6], 5]
// [4, 5, 6]
// [1, [2, 3], 4, 5, 6]


// [1, [[2, 9, 55], 3], 4, 5, 6]
// remove 2
// [[2, 9, 55], 3]
// [2, 9, 55]
// [] [9, 55]
// [[], 3] [9, 55]
// [] [3] [9, 55]
// [1, [], 4, 5, 6] [3] [9, 55]
// [1] [4, 5, 6] [3] [9, 55]


// [1, [[2, 9, 55], 3], 4, 5, 6]
// [1]
// [2]
// [1, 2] b1
// [1, 2, 3] b2


// [2, [3, 4], 5]
// [2, [3, 4]]


// [2, [3, 4], 5]
// [2, [3, 4], 5]
// [2, [3], 5] [[4, 3]]



// [2, [3, 4], 5]
// [2, [], 5] [3, 4]
// [2, [], 5] [4]
// [2, [], 5]
// [2, [], 5]



// [2, [3, 4], 5]
// [] [2, [3, 4], 5]
// [] [[3, 4], 5]
// [[3, 4], 5]
// [4, 3, 5]



// [[[2, 9, 55], [3, 77], [R, T]], 4, 5, 6]
// [[[55, 9, 2], [3, 77], [R, T]], 4, 5, 6]
// [[55, 9, 2, [3, 77], [R, T]], 4, 5, 6]
// [55, 9, 2]
// then push everything else
    // [55, 9, 2, [3, 77], [R, T]]
// return this^^
// [[55, 9, 2, [3, 77], [R, T]], 4, 5, 6]
// check if array





// [[55, 9, 2, [3, 77], [R, T]], 4, 5, 6]
// [[R, T], [3, 77], 2, 9, 55], 4, 5, 6]
// [T, R, [3, 77], 2, 9, 55, 4, 5, 6]



// Check if first is array
// Check if its first is array
// when found: reverse array and push to clean
// return clean
// check first is array (clean)





// [55, 9, 2, [3, 77], 4, 5, 6]
// [[[2, 9, 55], [3, 77]], 4, 5, 6]
// [[[2, 9, 55], [3, 77]], 4, 5, 6]
// [[[3, 77], [2, 9, 55]], 4, 5, 6]
// [[[3, 77], [2, 9, 55]], 4, 5, 6]

// [[[2, 9, 55], 3], 4, 5, 6]





// WTF
// need first of first array to be a conn
// need last of first array to be a conn
// 
// 

// [55, 9, 2, [3, 77], [R, T]]



// array=  [[[2, 9, 55], [3, 77], [R, T]], 4, 5, 6]

// clean = check [[2, 9, 55], [3, 77], [R, T]]
// check returns = [55, 9, 2, [3, 77], [R, T]]
// clean  = [55, 9, 2, [3, 77], [R, T]]
// return  = check [55, 9, 2, [3, 77], [R, T]]
// return  = [55, 9, 2, [3, 77], [R, T]]





// array = [[55, 9, 2, [3, 77], [R, T]], 4, 5, 6]


// array = [[[55, 9, 2], [3, 77], [R, T]], 4, 5, 6]


// return clean = [55, 9, 2, [3, 77], [R, T]]

// [[55, 9, 2], [3, 77], [R, T]]
// Clean = [55, 9, 2]
// Clean = [55, 9, 2, [3, 77], [R, T]]

// if it is an array:
// return sorted arrray
