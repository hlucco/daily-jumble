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

export function date(layout: Layout) {
    let dateContainer = document.createElement("div");
    dateContainer.className = "date-container";
    
    let dateParagraph = document.createElement("p");
    let dateString = (layout.store.get("date") as DateState).date;
    let dateTokens = dateString.split("-");

    dateString = monthLookup[Number.parseInt(dateTokens[1])] + " " + dateTokens[2] + ", " + dateTokens[0];

    let dateObject = new Date(dateString);
    dateParagraph.innerHTML = dayLookup[dateObject.getDay()] + " " + dateString;

    dateContainer.appendChild(dateParagraph);
    return dateContainer;
}