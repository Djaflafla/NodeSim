import type { nodeType } from "./Node.js";
import { nodeFunction } from "./nodeFunction.js";

export const UUID = ()=>{return crypto.randomUUID().slice(36-6)}

export const isNodeType = (input: string): input is nodeType => {
    return input in nodeFunction;
}

export const setInputNode = ():void => {}
