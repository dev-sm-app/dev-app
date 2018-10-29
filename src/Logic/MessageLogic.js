
export let createRoom = (friendId, userId) => {
    if (typeof friendId !== "number" || typeof userId !== "number") {
        throw new Error("Must give two number arguments")
    }
    const string = `${friendId} ${userId}`
    return string.split(' ')
        .map(ID => Number(ID))
        .sort((a, b) => a - b)
        .join('')
}
export let sendMessage = (arr, message) => {
    if (Array.isArray(arr) === false || typeof message !== "object") {
        throw new Error("You should give an array arg then message arg")
    }
    let newArr = [...arr]
    let newMessage = { ...message }
    newArr.push(newMessage)
    return newArr
}

// module.exports = {
//     createRoom: (friendId, userId) => {
//         if (typeof friendId !== "number" || typeof userId !== "number") {
//             throw new Error("Must give two number arguments")
//         }
//         const string = `${friendId} ${userId}`
//         return string.split(' ')
//             .map(ID => Number(ID))
//             .sort((a, b) => a - b)
//             .join('')
//     },
//     sendMessage: (arr, message) => {
//         if (Array.isArray(arr) === false || typeof message !== "object") {
//             throw new Error("You should give an array arg then message arg")
//         }
//         let newArr = [...arr]
//         let newMessage = { ...message }
//         newArr.push(newMessage)
//         return newArr
//     }
// }