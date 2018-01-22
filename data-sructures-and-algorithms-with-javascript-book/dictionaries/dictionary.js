class Dictionary {
    constructor() {
        this.dataStore = [];
    }

    get count() {
        return Object.keys(this.dataStore).length;
    }

    add(key, value) {
        this.dataStore[key] = value;
    }

    find(key) {
        return this.dataStore[key];
    }

    remove(key) {
        if (!this.dataStore[key]) {
            return false;
        }

        delete this.dataStore[key];
        return true;
    }

    clear() {
        Object.keys(this.dataStore).forEach(key => this.remove(key));
    }

    showAll() {
        Object.keys(this.dataStore).sort().forEach(key => {
            console.log(`${key}: ${this.dataStore[key]}`);
        });
    }
}

module.exports = Dictionary;