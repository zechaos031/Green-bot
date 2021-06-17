class Counter{
    constructor(client) {
        this.client = client
    }

    invoke(client) {
        return new Counter(client)
    }

    handle(message){

    }
}

module.exports = Counter
