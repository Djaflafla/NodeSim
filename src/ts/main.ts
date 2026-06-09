
import {Node} from "./Node.js"
import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import * as html from "./htmlUtils.js"

const menu = new Menu()
const ws = new Workspace()

menu.objTracker = [{id:"3", obj:new Node()}]


// check value everytime the inputbar is edited
menu.inputBar? menu.inputBar.addEventListener("input", ()=>{
    menu.inputUpdate()
}):console.log("no input bar")



// menu
// render menu button
// give action to button


// ws.checkQ()


// Trigger node
// set conn
// put next node in Q