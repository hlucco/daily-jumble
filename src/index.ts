import axios from "axios"
import "./style/index.scss";
import {word} from "./components/word"

function layout() {

    axios.get("https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/2022-1-16/data.json").then((response) => {
        
        console.log(response.data)

        let container = document.createElement("div");
        container.className = "container"

        let wordContainer = document.createElement("div");
        wordContainer.className = "word-container"
        
        for(let i = 0; i < 6; i++) {
            let elm = word("DYOITD", "ODDITY", [1,5]);
            wordContainer.appendChild(elm)
        }

        container.appendChild(wordContainer)

        let image = document.createElement("img")
        image.src = "https://assets.amuniversal.com/ee8618e0459c013a8d9b005056a9545d"
        image.className = "comic-image"
        container.appendChild(image)

        root.appendChild(container)
    })

    const root = document.createElement('div');
    root.className = "root"

    let punContainer = document.createElement("div")
    punContainer.className = "pun-container"
    root.appendChild(punContainer)

    let punLabel = document.createElement("span")
    punLabel.innerHTML = "Pun label will go here ---"
    punContainer.appendChild(punLabel)

    return root;
}

document.body.appendChild(layout());