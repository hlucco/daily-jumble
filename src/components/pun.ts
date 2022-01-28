export function pun(solution: string, label: string) {
    let punContainer = document.createElement("div")
    punContainer.className = "pun-container"

    let punLabel = document.createElement("span")
    punLabel.innerHTML = label
    punContainer.appendChild(punLabel)

    // may need more complex solution
    // iterate through and when find open curly save any thing
    // in the middle and then move on to make a new input set of boxes
    // for the next word

    // solution = "ON{ THE }LOOKOUT{}FOR{}IT"

    let regex = /(?<=\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})|(?=\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})/g
    let tregex = /\{ \w+ \}|\{'\}|\{' \}|\{ \}/g

    let solutionArr = solution.split(regex)

    let solutionContents: HTMLElement[] = []
    solutionArr.forEach((token) => {
        let c;
        if (token.match(tregex)) {
            // generate a label showing clue
            let stripped = token.substring(2, token.length-2)
            if(token.includes("'")) {
                stripped = "\"";
            }
            c = document.createElement("span")
            c.innerHTML = stripped
            solutionContents.push(c)
        }
        else {
            // generate open boxes to fill in
            if (token[0] !== "{") {
                c = document.createElement("div")
                c.className = "pun-input-word"
                for(let i = 0; i < token.length; i++) {
                    let inputBox = document.createElement("input");
                    inputBox.type = "text"
                    inputBox.maxLength = 1
                    inputBox.classList.add("input-box", "pun-input-box")
                    c.appendChild(inputBox)
                }
                solutionContents.push(c)
            }
        }
    })

    let punAnswerContainer = document.createElement("div")
    punAnswerContainer.className = "pun-answer-container"

    solutionContents.forEach((element) => {
        punAnswerContainer.appendChild(element)
    })

    punContainer.appendChild(punAnswerContainer)
    
    return punContainer
}
