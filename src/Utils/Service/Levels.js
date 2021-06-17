class Levels{
    constructor(client) {
        this.client = client
    }
    
    invoke(client) {
        return new Levels(client)
    }

    handle(message){

    }
}

module.exports = Levels
