const { createRoom, sendMessage } = require("../Logic/MessageLogic")

describe("createRoom should work properly", () => {
    test("createRoom returns a string", () => {
        expect(typeof createRoom(6, 5)).toBe("string")
    })
    test("createRoom should throw an error if two number arguments arent given", () => {
        expect(() => createRoom(6, "dafsfda")).toThrowError("Must give two number arguments")
    })
    test("createRoom should sort the numbers in the right order", () => {
        expect(createRoom(8, 4)[0]).toBe("4")
        expect(createRoom(4, 8)[0]).toBe("4")
    })
})
describe("sendMessage should work properly", () => {
    let messages = []
    test("sendMessage should push message into messages array", () => {
        let message = {
            id: "5",
            userid: 6,
            friendid: 4,
            authorPicture: "dahdflajksdh",
            type: "normal message",
            message: "message to be sent"
        }
        let length = messages.length
        
        expect(sendMessage(messages, message).length).toBe(length + 1)
    })
})