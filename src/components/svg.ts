function createSVGElement(path: string, id?: string) {
    const wrapperDiv = document.createElement("div");
    const emptySVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    wrapperDiv.appendChild(emptySVG);
    emptySVG.outerHTML = path;
    if (id !== undefined) {
        const child = wrapperDiv.children[0];
        child.setAttribute("id", id);
    }
    return wrapperDiv;
}

export function iconX() {
    const path = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0\
        0 24 24" fill="none"\
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"\
        class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6"\
        x2="18" y2="18"></line></svg>`;
    return createSVGElement(path);
}

export function iconShuffle() {
    const path = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="feather feather-shuffle"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20"
    x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21"
    y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`

    return createSVGElement(path);
}