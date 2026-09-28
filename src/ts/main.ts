import { Workspace } from "./Workspace.js"
import { init } from "./init.js"

const ws = new Workspace()
init(ws)


// ---------------------------------------------


// unconnect()
// [3, 4, 5, 6, 7]    4 & 5
// [3, 4] [5, 6, 7]

// check connconn 4
// check connconn 5
// if connconn of 5 in connconn of 4
// if connconn of 4 in connconn of 5
// keep connection
// else 
// remove 4 from connconn 5
// remove 5 from connconn 4
// for each connconn 5:
//  add connconn x to new connexion
// add x to subscriber

// from
// connect 4 to 5
// initial conn
// connect 3 to 5
// [4, 3, 5] 3 from 5
// connect 9 to 4
// [4, 3, 5, 9] 9 from 4
// connect 7 to 9
// [4, 3, 5, 9, 7] 7 from 9
// unconnect 4 & 5
// take all from 4, all from 5
// create connections with those


// new connection = connected to loop






// Put TEXTFORCONN = to their value


