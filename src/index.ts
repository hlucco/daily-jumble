import axios from "axios"
import "./style/index.scss";
import {word} from "./components/word"
import {pun} from "./components/pun"

function layout() {

    let date = new Date()
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    let dateString = yyyy + "-" + mm + "-" + dd

    let request = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`
    if (date.getDay() === 6) {
        request = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/${dateString}/data.json`
    }

    axios.get(request).then((response) => {
        
        let data = response.data

        console.log(data)

        let container = document.createElement("div");
        container.className = "container"

        let wordContainer = document.createElement("div");
        wordContainer.className = "word-container"

        Object.keys(data.Clues).forEach((key) => {
            if(key.charAt(0) === "c") {
                
                let answer = data.Clues["a"+key.charAt(1)]
                let circles = data.Clues["o"+key.charAt(2)]
                let clue = data.Clues[key]

                let elm = word(clue, answer, circles)
                wordContainer.appendChild(elm)
            }
        })

        container.appendChild(wordContainer)

        let image = document.createElement("img")
        image.src = data.Image
        image.className = "comic-image"
        container.appendChild(image)

        root.appendChild(container)
        root.appendChild(pun(data.Solution.s1, data.Caption.v1))
    })

    const root = document.createElement('div');
    root.className = "root"

    return root;
}

document.body.appendChild(layout());