import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"


const ws = new Workspace()
init(ws)

// link
//  funcForOption

// if obj=conn, can add 2nd conn to input bar for linking
// Connect 2 conn together

//getPiece() with multiple found names(or id)


// Trigger node
// set conn
// put next node in Q
// ws.checkQ()

// the option defaults as "newNode" when matchpiece is undefined(to many match byname(ws.getPiece))