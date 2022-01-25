export function pun(solution: string) {
    let punContainer = document.createElement("div")
    punContainer.className = "pun-container"

    let punLabel = document.createElement("span")
    punLabel.innerHTML = "Pun label will go here ---"
    punContainer.appendChild(punLabel)

    // may need more complex solution
    // iterate through and when find open curly save any thing
    // in the middle and then move on to make a new input set of boxes
    // for the next word

    console.log(solution)

    // this bad and needs to be reworked
    let gap = false
    for(let i = 0; i < solution.length; i++) {
        let c = solution[i]
        if (c === "}") {
            gap = false
        }

        if (c === "{") {
            gap = true
        }
        
        if (gap) {
            console.log(c)
        } else {
            let inputBox = document.createElement("input");
            inputBox.type = "text"
            inputBox.maxLength = 1
            inputBox.className = "input-box"
            punContainer.appendChild(inputBox)
        }

    }

    return punContainer
}
