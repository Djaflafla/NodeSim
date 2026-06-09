import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"

const menu = new Menu()
const ws = new Workspace()
init(menu)






menu.objTracker = [
    {id:"3", obj:new Node()},
    {id:"t", obj:new Connector("fakeid")}
]


// menu.updateMenuOptions

// put id of obj in input if clicked
// if obj=conn, can add 2nd conn to input bar for linking



// ws.checkQ()


// Trigger node
// set conn
// put next node in Q