import { Layout } from "../index"
import { PunState } from "../components/pun"
import { iconX } from "./xIcon";

type WordState = {
    guess: string,
    active: number[]
}

export function word(clue: string, solution: string, indeces: number[], layout: Layout) {

    console.log(indeces)

    let wordContainer = document.createElement("div");

    let inputContainer = document.createElement("div")
    inputContainer.className = "input-container"

    let clueContainer = document.createElement("div")
    clueContainer.className = "clue-container"

    if (layout.store.get(solution) === undefined) {
        layout.store.update(solution, {
            guess: "",
            active: []
        })
    }

    let cState = layout.store.get(solution) as WordState
    
    for(let i = 0; i < clue.length; i++) {

        let letter = document.createElement("div");
        letter.innerHTML = clue[i]
        letter.className = "clue-span"
        letter.addEventListener("click", () => {
            // need to update state here
            // state will be held in session storage so that it persists
            // for each word there will be a variable in session storage that
            // represents that word. Then when a tile is clicked the attempt
            // for that word will update and page will rerender. The rerender
            // checks state to see what letters it needs to populate the blank
            // spaces with
            
            //make a queue and put a rerender task on it
            //wait until about to give up a thread
            //if multiple things want to rerender put them on the queue
            //event happens
            //give up thread after processing event
            //at the end say check for state change and render if so
            //anotehr way is every time there is a state change you say render
            //if not already rendering.
            //you can use boolean or quueue with one thing on it. Easiest way is
            //everywhere you change state you say maybe render. If there are any
            //maybe renders during the episode of handly the event (having the thread)
            

            // render belongs as part of the visual goo. Visual object gets render
            // view is my layout component
            // controller is events
            // state is the model

            // controller gets even and updates model which causes view to rerender itself
            // rerender entire view from state. 

            // keep all divs an repopulate them
            // wont flicker as long as you build it and switch over by setting document.body to new thing

            if(!cState.active.includes(i)) {
                layout.store.update(solution, {
                    guess: cState.guess+=clue[i],
                    active: [...cState.active, i]
                })
            }

            let pState = layout.store.get("pun") as PunState

            if(cState.guess === solution) {
                let newLetters = ""
                for(let j = 0; j < solution.length; j++) {
                    if (indeces.includes(j+1)) {
                        newLetters+=solution[j]
                    }
                }

                layout.store.update("pun", {
                    ...pState,
                    letters: pState.letters + newLetters
                })
            }
           
            //re render here right before thread is given up
            layout.render()
        })

        if (cState.active.includes(i)) {
            letter.classList.add("active")
        }

        clueContainer.appendChild(letter)
        
        let inputBox = document.createElement("div");
        inputBox.className = "input-box"

        if (indeces.includes(i+1)) {
            inputBox.classList.add("pun-clue")
        }

        if (cState.guess === solution) {
            inputBox.classList.add("correct")
        }

        inputBox.innerHTML = cState.guess[i] === undefined ? "" : cState.guess[i].toString()
        inputContainer.appendChild(inputBox)

    }

    if (cState.guess !== "" && cState.guess !== solution) {
        let clearButton = document.createElement("button");
        clearButton.className = "clear-button"
        clearButton.appendChild(iconX())
        clearButton.addEventListener("click", () => {
            layout.store.update(solution, {
                guess: "",
                active: []
            })

            layout.render()
        })
        inputContainer.appendChild(clearButton);
    }

    wordContainer.appendChild(clueContainer)
    wordContainer.appendChild(inputContainer)

    return wordContainer
}