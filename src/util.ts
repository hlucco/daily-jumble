export function shuffle(clue: string) {
    let clueArray = clue.split("")

    for (let i = clue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = clueArray[j]
        clueArray[j] = clueArray[i]
        clueArray[i] = temp
    }

    return clueArray.join("");
}