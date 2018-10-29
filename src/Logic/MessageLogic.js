const axios = require("axios")

module.exports = {
    createRoom: (friendId, userId) => {
        if(typeof friendId !== "number" || typeof userId !== "number") {
            throw new Error("Must give two number arguments")
        }
        const string = `${friendId} ${userId}`
        return string.split(' ')
            .map(ID => Number(ID))
            .sort((a, b) => a - b)
            .join('')
    },
    sendMessage: (arr, message) => {
        let newArr = [...arr]
        let newMessage = {...message}
    }
}
