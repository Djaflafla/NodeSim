import { Node } from "./Node.js"
import { Renderer } from "./Render.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"

const ws = new Workspace()
init(ws)


// let input1 = Node.createNode("input", ws)
// let input2 = Node.createNode("input", ws)
// ws.pieceCollection[input1.id] = input1
// ws.pieceCollection[input2.id] = input2
// let add = Node.createNode("add", ws)
// ws.pieceCollection[add.id] = add
// let output = Node.createNode("output", ws)
// ws.pieceCollection[output.id] = output

// export const blabla = [input1, input2, output]

Renderer.renderWS(ws)




// ---------------------------------------------


// lets customize!





// work on rendering someday