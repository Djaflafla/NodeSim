import { Workspace } from "./Workspace.js"
import { init } from "./init.js"
import type { NestedConnectors } from "./Connection.js"
import { Connector } from "./Connector.js"
import { CFFunc } from "./ConnectionFlow.js"

const ws = new Workspace()
init(ws)


// ---------------------------------------------


// connect 2 connection together

// Link -> connect()
// Connect() -> createConnection ✅ , connectToFlow
// connectToFlow -> add first/last | addInsideFlow
// addInsideFlow

// delConn -> cm.delConn
// cm.delConn -> delFromNode ✅ , delFromConnection
// delFromConex -> splitFlow ✅, check if still alive ✅





// Did clean last
// it fucking works. ConnectionFlow is goooooodyyyyyoooooo

//splitFlow(), addInsideFlow

// if first half of split connection is alone. doesnt kill connection
// need to

// [2, [[8, 9], 4, 69], 5, 45]
// [2, [[], 4, 69], 5, 45] [9]
// [2, [], 5, 45] [4, 69]
// [2] [4, 69] [5, 45]
// [] [4, 69] [5, 45]



// testing linking and unlinking and deleting

// delConnFromConnection and removeInConnectionFlow
// Connect two existing connexion
// unlink

// Put TEXTFORCONN = to their value


// [2, [3, [8, 9], 4], 5]
// [2, [3, [], 4], 5] [9]

// [2, [3, [8, 9], 4], 5]
// [2, [], 5] [[8, 9], 4]

// [[2]] [4, 69] [4, 45]
// 





// [2] [[[8, 9], 4, 69], 5, 45]