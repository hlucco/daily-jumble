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
    // "ON{ THE }LOOKOUT{}FOR{}IT"

    let regex = /(?<=\{ \w+ \}|\{\})|(?=\{ \w+ \}|\{\})/g

    let solutionArr = solution.split(regex)

    console.log(solutionArr)
    
    return punContainer
}
