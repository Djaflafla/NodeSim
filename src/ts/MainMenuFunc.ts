import { Renderer } from "./Render.js"
import { Workspace } from "./Workspace.js"
import { initWS } from "./init.js"

export type mmFunc = {[opt:string]:()=>void}

export const mainMenuFunc = {
    newSystem: ()=>{
        document.body.replaceChildren()
        let ws = initWS()
        
    },
    library: ()=>{
        console.log("No library")
    },
} satisfies mmFunc

export type possibleMainMenuFunc = keyof typeof mainMenuFunc