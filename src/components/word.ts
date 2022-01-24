export function word(letters: string, solution: string, indeces: number[]) {

    let wordContainer = document.createElement("div")

    let label = document.createElement("span");
    label.innerHTML = letters
    wordContainer.appendChild(label)

    return wordContainer
}