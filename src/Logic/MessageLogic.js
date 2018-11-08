export let createRoom = (friendId, userId) => {
  if (typeof friendId !== "number" || typeof userId !== "number") {
    throw new Error("Must give two number arguments");
  }
  const string = `${friendId} ${userId}`;
  return string
    .split(" ")
    .map(ID => Number(ID))
    .sort((a, b) => a - b)
    .join("");
};
export let sendMessage = (arr, message) => {
  if (Array.isArray(arr) === false || typeof message !== "object") {
    throw new Error("You should give an array arg then message arg");
  }
  let newArr = [...arr];
  let newMessage = { ...message };
  newArr.push(newMessage);
  return newArr;
};

export let formatDate = (date) => {
    
    let dateArr = date.split(":")
    let newDate = ""
    if(dateArr[0] === '0') {
        newDate = `12:${dateArr[1]} am`
    }
    if(Number(dateArr[0]) <= 12) {
      newDate = `${date} am`
    }
    if(Number(dateArr[0]) > 12) {
        dateArr[0] = Number(dateArr[0]) - 12
        newDate = `${dateArr[0]}:${dateArr[1]} pm`
    }
    return newDate
}
// module.exports = {
//   createRoom: (friendId, userId) => {
//     if (typeof friendId !== "number" || typeof userId !== "number") {
//       throw new Error("Must give two number arguments");
//     }
//     const string = `${friendId} ${userId}`;
//     return string
//       .split(" ")
//       .map(ID => Number(ID))
//       .sort((a, b) => a - b)
//       .join("");
//   },
//   sendMessage: (arr, message) => {
//     if (Array.isArray(arr) === false || typeof message !== "object") {
//       throw new Error("You should give an array arg then message arg");
//     }
//     let newArr = [...arr];
//     let newMessage = { ...message };
//     newArr.push(newMessage);
//     return newArr;
//   },

//   formatDate: date => {
//     let dateArr = date.split(":");
//     let newDate = "";
//     if (dateArr[0] === '0') {
//       newDate = `12:${dateArr[1]} am`;
//     }
//     else if (Number(dateArr[0]) <= 12) {
//       newDate = `${date} am`;
//     }
//     else if (Number(dateArr[0]) > 12) {
//       dateArr[0] = Number(dateArr[0]) - 12;
//       newDate = `${dateArr[0]}:${dateArr[1]} pm`;
//     }
//     return newDate;
//   }, 

//   createDate: date => {
//       if(typeof date!=='object') {
//           throw new Error('parameter must be a object')
//       }
//     if(date.getMinutes() < 10) {
//         return `${date.getHours()}:0${date.getMinutes()}`
//       }
//       return `${date.getHours()}:${date.getMinutes()}`
//   }
// };
