import { Node } from "./Node.js"
import { Renderer } from "./Render.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"

const ws = new Workspace()
init(ws)


let input1 = Node.createNode("input", ws)
let input2 = Node.createNode("input", ws)
ws.pieceCollection[input1.id] = input1
ws.pieceCollection[input2.id] = input2
let add = Node.createNode("add", ws)
ws.pieceCollection[add.id] = add
let output = Node.createNode("output", ws)
ws.pieceCollection[output.id] = output

export const blabla = [input1, input2, output]

Renderer.renderWS(ws)




// ---------------------------------------------
// new/update input, new node, linkunlink, piece delete
// clock -> runNextinQ()
// updateInputs()
// getConnectiontoUpdate()
// initQ()
// hitting q is empty
// outputs
// Do that it is not allowed to connect multiple connexion to a connector
// I can, but need to do shit with the last value saved in the conn




// work on rendering someday