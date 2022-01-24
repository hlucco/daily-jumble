import axios from "axios"
import "./style/index.scss";

function layout() {

    axios.get("https://gamedata.services.amuniversal.com/c/uupuz/l/U2FsdGVkX1+b5Y+X7zaEFHSWJrCGS0ZTfgh8ArjtJXrQId7t4Y1oVKwUDKd4WyEo%0A/g/tmjms/d/2022-1-23/data.json").then((response) => {
        let json = document.createElement("div");
        json.innerHTML = JSON.stringify(response.data)
        root.appendChild(json)
    })

    const root = document.createElement('div');

    root.innerHTML = "Hello Test"

    return root;
}

document.body.appendChild(layout());