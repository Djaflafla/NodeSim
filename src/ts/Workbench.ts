import type { pieceCollection } from "./Workspace.js"
import { Menu } from "./Menu.js"
import { QManager } from "./QManager.js"
import { ConnectionManager } from "./ConnectionManager.js"


export class Workbench {
    cm: ConnectionManager
    qm: QManager
    pieceCollection: pieceCollection

    constructor (){
        this.cm = new ConnectionManager()
        this.qm = new QManager()
        this.pieceCollection = {}
    }
}