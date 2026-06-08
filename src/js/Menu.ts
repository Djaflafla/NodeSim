export class Menu {
    inputBar= document.getElementById("userInput") as HTMLInputElement | null;
    lastValue:string = ""
    optionToShow:string[] = []
    objectToOption:{value:string; option:string[]}[] = []
     
    checkValue() {
        // Check if value updates options
        let value = this.getInputValue()
        if (value == this.lastValue) {return}
        this.updateMenuOptions(value)
    }

    getInputValue(){
        if (!this.inputBar) {return "noBar"}
        return this.inputBar.value
    }

    updateMenuOptions(value:string) {
        // check if value match
        let obj = this.objectToOption.find(obj=> obj.value === value)
        if (obj) {
        this.optionToShow = obj.option
       }

        // if so or not, set otpion to show
        // Show option
    }
}