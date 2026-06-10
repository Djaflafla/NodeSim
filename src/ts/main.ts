import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"


const ws = new Workspace()
init(ws)


ws.createPiece("node", "m1")
ws.createPiece("node", "m2")
ws.createPiece("conn", "m2")
console.log(ws.pieceCollection)


// print node on creation

// Give functions to menu buttons

// put id of obj in input if clicked
// if obj=conn, can add 2nd conn to input bar for linking



// ws.checkQ()


// Trigger node
// set conn
// put next node in Q


// Menu.getOption() and undefined type logic