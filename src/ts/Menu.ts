export class Menu {
    inputBar= document.getElementById("userInput") as HTMLInputElement | null;
    lastValue:string = ""
    optionToShow:string[] = []
    objectToOption:{value:string; option:string[]}[] = []
     
    checkValue() {
        // Check if value updates options
        let value = this.getInputValue()
        if (value == this.lastValue) {return}
        this.lastValue = value
        this.updateMenuOptions(value)
    }
    
    getInputValue(){
        if (!this.inputBar) {return "noBar"}
        return this.inputBar.value
    }
    
    updateMenuOptions(value:string) {
        // check if value match a know object
        let obj = this.objectToOption.find(obj=> obj.value === value)
        if (!obj) {
            this.optionToShow = ["new node"]
            console.log(this.optionToShow)
            return
        }

        // add given list of option to menu.optionToShow
        this.optionToShow = obj.option
       
       console.log(this.optionToShow)

        // if so or not, set otpion to show
        // Show option
    }
}