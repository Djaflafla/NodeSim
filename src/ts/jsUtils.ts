import type { nodeType } from "./Node.js";
import { nodeFunction } from "./nodeFunction.js";

export const UUID = (nb:number)=>{return crypto.randomUUID().slice(36-nb)}

export const isNodeType = (input: string): input is nodeType => {
    return input in nodeFunction;
}