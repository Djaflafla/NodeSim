import { Workspace } from "./Workspace.js"

const ws = new Workspace()
// init(ws)


// ---------------------------------------------


// connect 2 connection together
// unlink without delConn
// do cleanLast for every ends of branches

// last in flow can be an array
// [[5, 6], [[[2, [7, [8, 9], 0]], 1], 3]]
// (not cleaned. putInFirst(5))





// Put TEXTFORCONN = to their value





export type NestedConnectors = (number|NestedConnectors)[]
export type Connector = number


// function mergeConnection (newConenection:NestedConnectors, targetConnection:NestedConnectors):NestedConnectors {
//     // find new and target in flow
// }

// function putTargetFirst (array:NestedConnectors, target:Connector):NestedConnectors{
//     for (let [index, elem] of array.entries()){
//         if (elem == target) {

//         }
//         if (elem !== target) {

//         }
//         if (Array.isArray(elem)) {

//         }
//     }
// }



function cleanLastConn (array:NestedConnectors):NestedConnectors {
    for (let i=0; i<array.length; i++){
     if (i==array.length-1){
        // found an end
     }   
    }
    
    if (Number.isFinite(array[0])) {
        return []
    

        // start cleaning ends

    } else if (Number.isFinite(array[0])) {
        // put a conn in first
        // check elem
        // elem.splice(index, 1, check.forEch())

    }


    
// in which array is the last index an array
    let clean:NestedConnectors = []

    for (let i =array.length-1; i<1; i--){
        let target = array[i]!
        if (Number.isFinite(target)) {
            clean.push(target)
        } else if (Array.isArray(target)){
            array.splice(i, 1, cleanLastConn(target))
            // take target elem of array being eval
            // put it at the end of the array being eval
            clean.push()
        }
    }
    return []
}
  

    // do that in everyArray

    // returns an array with the first element being a conn
        // Doesn't accept empty array. anywhere
function cleanFirstConn  (array:NestedConnectors):NestedConnectors {
    let clean = []
    if (Number.isFinite(array[0])) {
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
        return cleanFirstConn(clean)
    }
    throw new Error ("wtf, code 44444")
}

// [[[2, [3, 4]], 1], 9] 
//array1, array2, array3


// array1 = [[[2, [3, 4]], 1], 9, 87] 
// if first of array1 is array

// array1 = [[2, [3, 4]], [1, 6]]
// array2 = [[2, [3, 4]], [1, 6]]
// let arrayFinal = [4, 3, 2, | [1, 6]]

// clean first = clean first then lasts
// clean last = clean last then first

// array1 = [87, 9, [[2, [3, 4], 55], 1]]
// array2 = [[2, [3, 4], 55], 1]
// array3 = [2, [3, 4], 55]
// array4 = [3, 4]  // no array here
// array3.1 = [2, [3, 4], 55]  // push to lastknown array
// array2.1 = [[2, [3, 4], 55], 1]
// array1.1 = [87, 9, [[2, [3, 4], 55], 1]]
let arrayclean = [87, 9, [2, [3, 4], 55], 1]

// array1 = [87, 9, [[2, 3, 4], 1]]
// array2 = [[2, 3, 4], 1]

// [[3, 4], [2], 1]

// [[[2, [3, 4]], 1], 9]   // take restof array1. push each in an array in front of itfront of 
// [9, [[2, [3, 4]], 1]]

// [[2, 3, 4], 1]
// new = 

2: 3, 1
3: 4, 2
4: 3
1: 2



let x = [[[[2,[7,[8,9],0]],1],3],[5,[6,83]]]
let y = [[5, 6], [[[2, [7, [8, 9], 0]], 1], 3]]

// [3,[[2,[7,[8,9],0]],1],5,6,83]
// [3,[2,[7,[8,9], 0],1],5,6,83]


// let x = [[[[2,[7,[8,9],0]],1],3],[5,[6,83]]]
// 2 & 5
// 
x.reverse()
console.log(JSON.stringify(x))
let res = cleanFirstConn(x)
res.reverse()
res = cleanFirstConn(res)

console.log(JSON.stringify(res))