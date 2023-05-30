import axios from "axios"
import "./style/index.scss";
import { word } from "./components/word"
import { pun } from "./components/pun"
import { date, monthLookup, DateState, updateDateString} from "./components/date"
import { Store } from "./store"

export type ImageState = {
    active: boolean,
    circlesActive: boolean,
}

export class Layout {

    store: Store;
    data: any;

    constructor() {
        this.store = new Store()

        let date = new Date()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        let dateString = yyyy + "-" + mm + "-" + dd

        this.init(dateString)
    }

    // function that takes in a datestring and makes an axios request to get the data
    async makeRequest(dateString: string, dateObject: Date) {  
        const dataObject = JSON.parse(window.localStorage.getItem("data"));
        
        
        if (!dataObject) {
            window.localStorage.setItem("data", JSON.stringify({}));
        } else {
            if (dataObject[dateString]) {
                console.log("here");
                console.log(dataObject.dateString);
                return dataObject[dateString];
            }
        }

        let request = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjmf/d/${dateString}/data.json`
        if (dateObject.getDay() === 0) {
            request = `https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/${dateString}/data.json`
        }

        const response = await axios.get(request);
        if (response.data === null) {
            alert("Jumble data has not yet been updated for today " + dateString)
        }

        const oldDataObject = JSON.parse(window.localStorage.getItem("data"));
        let newDataObject = {...oldDataObject, [dateString]: response.data};
        window.localStorage.setItem("data", JSON.stringify(newDataObject))

        return response.data;
    }

    init(dateString: string) {
        const datesObject = JSON.parse(window.localStorage.getItem("dates"))
        if (datesObject !== null) {
            this.store.state = datesObject[dateString] 
        }

        const dateTokens = dateString.split("-");
        const parsedDate = monthLookup[Number.parseInt(dateTokens[1])] + " " + dateTokens[2] + ", " + dateTokens[0];
        let dateObject = new Date(parsedDate);

        if (!this.store.state || Object.keys(this.store.state).length === 0) {
            this.store.update("image", {
                active: false,
                circlesActive: false
            })
        }

        this.store.update("date", {
            date: dateString
        })

        this.makeRequest(dateString, dateObject).then((data) => { 
            this.data = data;
            this.render() 
        });

        // additional requests will be calculated 10 total 5 prior 5 post dates
        // then they will be loaded in addition to the current date
        
        // const previousDatesObject = JSON.parse(window.localStorage.getItem("dates"))
        // let newDatesObject = {...previousDatesObject,}
        // window.localStorage.setItem("dates", JSON.stringify(newDatesObject))

        // for (let i = -5; i < 6; i++) {
        //     if (i !== 0) {
        //         const dateString = (this.store.get("date") as DateState).date;
        //         const dateTokens = dateString.split("-");
        //         const parsedDate = monthLookup[Number.parseInt(dateTokens[1])] + " " + dateTokens[2] + ", " + dateTokens[0];
        //         const currentDateObject = new Date(parsedDate);

        //         let currentDateString = updateDateString(i, this, currentDateObject);
        //         this.makeRequest(currentDateString, currentDateObject).then((data) => { 
        //             const oldDataObject = JSON.parse(window.localStorage.getItem("data"));
        //             if (oldDataObject[currentDateString] === undefined) {
        //                 let newDataObject = {...oldDataObject, [currentDateString]: data};
        //                 window.localStorage.setItem("data", JSON.stringify(newDataObject))
        //             }
        //         });
        //     }
        // }
    }

    render() {
        let root = document.createElement("div");
        root.className = "root";

        let container = document.createElement("div");
        container.className = "container";

        let dateComponent = date(this);
        container.appendChild(dateComponent);

        let wordContainer = document.createElement("div");
        wordContainer.className = "word-container";

        Object.keys(this.data.Clues).forEach((key) => {
            if (key.charAt(0) === "c") {

                let answer = this.data.Clues["a" + key.charAt(1)]
                let circles = this.data.Clues["o" + key.charAt(1)]
                let clue = this.data.Clues[key]

                let elm = word(clue, answer, circles, this)
                wordContainer.appendChild(elm)
            }
        })

        container.appendChild(wordContainer)

        root.appendChild(container)
        root.appendChild(pun(this.data.Solution.s1, this.data.Caption.v1, this.data.Solution.k1, this))

        let overlay = document.createElement("div")
        overlay.className = "image-overlay"

        let image = document.createElement("img")
        image.src = this.data.Image
        image.className = "comic-image"
        overlay.appendChild(image)

        let iState = this.store.get("image") as ImageState
        try {
            iState.active ? root.appendChild(overlay) : root.removeChild(overlay)
        } catch (e) {
            // console.log(e)
        }

        document.body.innerHTML = ''
        document.body.appendChild(root)

        window.localStorage.setItem("state", JSON.stringify(this.store.state))

        const previousDatesObject = JSON.parse(window.localStorage.getItem("dates"))
        const dateString = (this.store.get("date") as DateState).date;
        let newDatesObject = {...previousDatesObject, [dateString]: this.store.state}
        window.localStorage.setItem("dates", JSON.stringify(newDatesObject))
    }
}

new Layout() 
