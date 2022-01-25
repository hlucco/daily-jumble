export function word(letters: string, solution: string, indeces: number[]) {

    let wordContainer = document.createElement("div");

    let label = document.createElement("span");
    label.innerHTML = letters
    wordContainer.appendChild(label)

    let inputContainer = document.createElement("div")
    inputContainer.className = "input-container"
    
    for(let i = 0; i < letters.length; i++) {

        let inputBox = document.createElement("input");
        inputBox.type = "text"
        inputBox.maxLength = 1
        inputBox.className = "input-box"
        inputContainer.appendChild(inputBox)

    }
    wordContainer.appendChild(inputContainer)

    return wordContainer
}