export function word(clue: string, solution: string, indeces: number[]) {

    let wordContainer = document.createElement("div");

    let inputContainer = document.createElement("div")
    inputContainer.className = "input-container"

    let clueContainer = document.createElement("div")
    clueContainer.className = "clue-container"
    
    for(let i = 0; i < clue.length; i++) {

        let letter = document.createElement("div");
        letter.innerHTML = clue[i]
        letter.className = "clue-span"
        letter.addEventListener("click", () => {
            inputBox.innerHTML = clue[i]
        })
        clueContainer.appendChild(letter)
        
        let inputBox = document.createElement("div");
        inputBox.className = "input-box"
        // inputBox.classList.add("correct")
        // inputBox.innerHTML = clue[i]
        inputContainer.appendChild(inputBox)

    }
    wordContainer.appendChild(clueContainer)
    wordContainer.appendChild(inputContainer)

    return wordContainer
}