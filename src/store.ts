type State = {
    [key: string]: Object
}

export class Store {

    state: State;

    constructor() {
        this.state = {}
    }

    get(key: keyof State) {
        if (key in this.state) {
            return this.state[key]
        }

        return undefined
    }

    update(key: keyof State, value: Object) {
        this.state = {
            ...this.state,
            [key]: value
        }
    }

    delete(key: keyof State) {
        delete this.state[key]
    }

    clear() {
        this.state = {}
    }
}