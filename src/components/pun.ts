import { Layout, ImageState } from "../index"
import { iconX } from "./xIcon"

export type PunState = {
    letters: string,
    guess: string,
    active: number[]
}

export function pun(solution: string, label: string, answer: string, layout: Layout) {

    let key = "pun"

    if (layout.store.get(key) === undefined) {
        layout.store.update(key, {
            guess: "",
            active: [],
            letters: ""
        })
    }

    let cState = layout.store.get(key) as PunState

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

    // console.log(solution);

    // let regex = /(\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})|(\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})/g
    let regex = /(\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \}|\{- \}|\{ '\})|(\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \}|\{- \}|\{' -\})/g
    // let regex = /(?:\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})|(?=\{ \w+ \}|\{\}|\{'\}|\{' \}|\{ \})/g
    let tregex = /\{ \w+ \}|\{'\}|\{' \}|\{ \}|\{- \}|\{ '\}|\{' -\}/g

    let raw = solution.split(regex);

    // console.log(raw);

    let solutionArr: string[] = []
    raw.forEach((elm) => {
        if (elm !== undefined) {
            solutionArr.push(elm)
        }
    })

    let solutionContents: HTMLElement[] = []
    let guessIndex = 0
    for (let i = 0; i < solutionArr.length; i++) {
        let token = solutionArr[i]
        let c;
        if (token.match(tregex)) {
            // generate a label showing clue
            // console.log(token);
            let stripped = token.substring(2, token.length - 2)
            if (token.includes("'")) {
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
                for (let j = 0; j < token.length; j++) {
                    let inputBox = document.createElement("div");
                    inputBox.innerHTML = cState.guess[guessIndex] === undefined ? "" : cState.guess[guessIndex].toString()
                    guessIndex += 1
                    inputBox.classList.add("input-box", "pun-input-box")
                    if (cState.guess === answer) {
                        inputBox.classList.add("correct")
                    }
                    c.appendChild(inputBox)
                }
                solutionContents.push(c)
            }
        }
    }

    let punAnswerContainer = document.createElement("div")
    punAnswerContainer.className = "pun-answer-container"

    solutionContents.forEach((element) => {
        punAnswerContainer.appendChild(element)
    })

    punContainer.appendChild(punAnswerContainer)

    let punControlContainer = document.createElement("div")
    punControlContainer.classList.add("pun-control-container")

    for (let i = 0; i < cState.letters.length; i++) {
        let letter = document.createElement("div");
        letter.innerHTML = cState.letters[i]
        letter.className = "clue-span"

        if (cState.active.includes(i)) {
            letter.classList.add("active")
        }

        letter.addEventListener("click", () => {

            if (!cState.active.includes(i)) {
                layout.store.update(key, {
                    ...cState,
                    guess: cState.guess += cState.letters[i],
                    active: [...cState.active, i]
                })
            }

            layout.render()
        })
        punControlContainer.appendChild(letter)
    }

    if (cState.guess !== "" && cState.guess !== answer) {
        let clearButton = document.createElement("button");
        clearButton.className = "clear-button"
        clearButton.appendChild(iconX())
        clearButton.addEventListener("click", () => {
            layout.store.update(key, {
                ...cState,
                guess: "",
                active: []
            })

            layout.render()
        })
        punAnswerContainer.appendChild(clearButton);
    }

    punContainer.appendChild(punControlContainer)

    let viewImageButton = document.createElement("button");
    viewImageButton.className = "view-image-button"

    let iState = layout.store.get("image") as ImageState

    viewImageButton.innerHTML = iState.active ? "Hide Image" : "View Image"
    viewImageButton.addEventListener("click", () => {

        layout.store.update("image", {
            ...iState,
            active: !iState.active
        })

        layout.render()
    })

    let viewCirclesButton = document.createElement("button");
    viewCirclesButton.className = "view-image-button"
    viewCirclesButton.innerHTML = iState.circlesActive ? "Hide Clues" : "View Clues"

    viewCirclesButton.addEventListener("click", () => {

        layout.store.update("image", {
            ...iState,
            circlesActive: !iState.circlesActive
        })

        layout.render()
    })

    punContainer.appendChild(viewImageButton)
    punContainer.appendChild(viewCirclesButton)


    return punContainer
}
