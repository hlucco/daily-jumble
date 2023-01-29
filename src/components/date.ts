import { Layout } from "../index";

export type DateState = {
    date: string
}

export const monthLookup: { [id: number] : string} = {
    1 : "January",
    2 : "February",
    3 : "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

export const dayLookup: { [id: number] : string } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

function updateDate(modifier: number, layout: Layout, dateObject: Date, oldDateString: string) {
    dateObject.setDate(dateObject.getDate() + modifier)

    var dd = String(dateObject.getDate()).padStart(2, '0');
    var mm = String(dateObject.getMonth() + 1).padStart(2, '0');
    var yyyy = dateObject.getFullYear();

    const newDateString = yyyy + "-" + mm + "-" + dd

    const previousDatesObject = JSON.parse(window.localStorage.getItem("dates"))
    let newDatesObject = {...previousDatesObject, [oldDateString]: layout.store.state}
    window.localStorage.setItem("dates", JSON.stringify(newDatesObject))
    
    layout.store.clear()
    window.localStorage.setItem("state", JSON.stringify(layout.store.state))

    layout.init(newDateString)
}

export function date(layout: Layout) {
    const dateString = (layout.store.get("date") as DateState).date;
    const dateTokens = dateString.split("-");
    const parsedDate = monthLookup[Number.parseInt(dateTokens[1])] + " " + dateTokens[2] + ", " + dateTokens[0];
    const dateObject = new Date(parsedDate);

    let dateContainer = document.createElement("div");
    dateContainer.className = "date-container";
    let dateParagraph = document.createElement("span");

    let dateRightArrow = document.createElement("span");
    dateRightArrow.className = "date-arrow";
    dateRightArrow.innerHTML = ">";
    dateRightArrow.onclick = (() => updateDate(1, layout, dateObject, dateString));

    let dateLeftArrow = document.createElement("span");
    dateLeftArrow.className = "date-arrow";
    dateLeftArrow.innerHTML = "<";
    dateLeftArrow.onclick = (() => updateDate(-1, layout, dateObject, dateString));

    dateParagraph.innerHTML = dayLookup[dateObject.getDay()] + ", " + parsedDate;

    dateContainer.appendChild(dateLeftArrow);
    dateContainer.appendChild(dateParagraph);
    dateContainer.appendChild(dateRightArrow);
    return dateContainer;
}