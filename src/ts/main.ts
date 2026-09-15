import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import type { NestedConnectors } from "./Connection.js"
import { Connector } from "./Connector.js"
import { CFFunc } from "./ConnectionFlow.js"

const ws = new Workspace()
// init(ws)


// ---------------------------------------------



type z = (number|z)[]
// function cleanLastConn(array:z):z{
//     let clean = []
//     if (Number.isFinite(array[0])) {
//         return array
//     }
//     if (Array.isArray(array[0])) {
//         array[0].reverse()
        
        
//         let temp = cleanFirstConn(array[0])
        
//         temp.forEach(conn=>{
//             clean.push(conn)
//         })
//         // met le resste
//         for (let i =1; i<array.length; i++){
//             clean.push(array[i]!)
//         }
//         console.log(JSON.stringify(array));
//         return cleanFirstConn(clean)
//     }
//     throw new Error ("wtf, code 44444")
// }

// [[[66,7,[3],9],[3,[77]]],4,6]


// let array = [[66, 7, [9], [[[3, 77]]], []], 4, [], 6]
        // [[[66,7,[3],9],[3,[77]]],4,6]
// let array = [[[66, 7, 8, 9], [3, 77], [86, 25]], 4, 5, 6]
// let array = [[[[[66, 7, 8]]], [3, [[], []]], []], 4, 5, 6]
let array = [[[[[[[[[5, [[[[[[[[[[[[6]]]]]]]]]]]], [[55, 66], [9]]]], [[[7, 8]]]]], [[[[], [], [[[], []]]]]]]]]]]
// let array = [[[[[[[[[5, [[[[[[[[[[[[6]]]]]]]]]]]], [[55, 66], [9]]]], [[[7, 8]]]]], [[[[], [], [[[], []]]]]]]]]]]




// Lets gooooo
// finally did removeExtra()
// NOW: cleanLast conn

// delConnFromConnection and removeInConnectionFlow
// Clean last index of CF
// Connect two existing connexion
// unlink

// Put TEXTFORCONN = to their value