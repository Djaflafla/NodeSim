
import {Menu} from "./Menu.js"
import { Workspace } from "./Workspace.js"
import * as html from "./htmlUtils.js"

const menu = new Menu()
const ws = new Workspace()

menu.objectToOption = [{value:"3", option:["dodo"]}]
const ib = menu.inputBar? menu.inputBar.addEventListener(
    "keydown", 
    ()=>{menu.optionToShow = []; menu.checkValue()}
):null



// menu.checkValue()
// update after the next keydown



// menu
// ws.checkQ()


// Trigger node
// set conn
// put next node in Q