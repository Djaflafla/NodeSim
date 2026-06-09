export class Connector {
    id:string;
    value:string = ""
    type = "connector"
    option:string[] = ["delConn", "link"]
    

    constructor (id:string ) {
        this.id = id
    }

}