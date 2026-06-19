import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"
import * as html from "./htmlUtils.js"



const ws = new Workspace()
init(ws)


// shit is broken
// working on deleting a connector
// include multiple connector that are connected to. 



// input connectors are giving "na value" to output conn. should be the other way around
// disconect when connection to another con. contectedTo should be an array

// how to really remove data from mem

// conn delete
// spreadvalue

// look who has conn in their connectedto. then delete


// disable new conn on preset?

// set conn
// put next node in Q
// ws.checkQ()

// the option defaults as "newNode" when matchpiece is undefined(to many match byname(ws.getPiece))