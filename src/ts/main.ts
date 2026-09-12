import { Workspace } from "./Workspace.js"
import { init } from "./init.js"


const ws = new Workspace()
init(ws)

// Did Connectors, Connection, Connection Manager
// Connect(), delConn()
// Everything is a dict now
// Removed addConn from menuOptions
// Special class for input and output node
// printLine is printing
// setButton sets




// node function wont work because of index number



// CONNECTION
// 1 connector = 1 network. Multiple connector but only 1 connection
// All the connectors receive same value at the same time
// need to activate the receiving node for the value not to be erase by the next node firing
// probleme is that lines connected on the same connector are not one connection
// Unlink, Duplicate connexion



// Html/CSS, spreadValue, Lines, setInput, ReadOutput, flow, clock

// Class InputNode is now in same folder as Node.ts because of initialization problems
// link -> adding new node after clock: removes draw line
// Put TEXTFORCONN = to their value


// set conn
// put next node in Q
// ws.checkQ()