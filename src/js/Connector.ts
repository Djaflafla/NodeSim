type InValue = string[]
type outValue = string[]


export class Connector {
    id: string= ""
    value:string=""

    static getConnValue (connector:Connector[]):InValue {
        
        return connector.map(conn => conn.value.toString())
    }

    // set indexed conn value to indexed value
    static setConnValue (connector:Connector[], valueList:outValue) {
        if (valueList.length!==connector.length){
            return
        }
        connector.forEach((conn, i)=>{
            if(valueList[i]!==undefined ){
                conn.value = valueList[i]
            }
        })
    }
}