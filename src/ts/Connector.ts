export class Connector {
    id:string;
    value:string = ""
    type = "connector"
    option: {opt:string, func:()=>void}[] = [
        {opt:"link", func:()=>{}},
        {opt:"delConn", func:()=>{}}
    ]
    

    constructor (id:string ) {
        this.id = id
    }

}