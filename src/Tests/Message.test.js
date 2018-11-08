const {
  createRoom,
  sendMessage,
  formatDate,
  createDate
} = require("../Logic/MessageLogic");

describe("createRoom should work properly", () => {
  test("createRoom returns a string", () => {
    expect(typeof createRoom(6, 5)).toBe("string");
  });
  test("createRoom should throw an error if two number arguments arent given", () => {
    expect(() => createRoom(6, "dafsfda")).toThrowError(
      "Must give two number arguments"
    );
  });
  test("createRoom should sort the numbers in the right order", () => {
    expect(createRoom(8, 4)[0]).toBe("4");
    expect(createRoom(4, 8)[0]).toBe("4");
  });
});
describe("sendMessage should work properly", () => {
  let messages = [];
  let message = {
    id: "5",
    userid: 6,
    friendid: 4,
    authorPicture: "dahdflajksdh",
    type: "normal message",
    message: "message to be sent"
  };
  test("sendMessage should return a new array with the messaged pushed onto it", () => {
    let length = messages.length;

    expect(sendMessage(messages, message).length).toBe(length + 1);
  });
  test("sendMessage should throw error if not given proper args", () => {
    expect(() => sendMessage("adskjhalfjk", message)).toThrowError(
      "You should give an array arg then message arg"
    );
    expect(() => sendMessage(messages, "casfdasfa")).toThrowError(
      "You should give an array arg then message arg"
    );
    expect(() => sendMessage("adskjhalfjk", 33)).toThrowError(
      "You should give an array arg then message arg"
    );
  });
});

describe("formatDate should work properly", () => {
  test("formatDate should return 12 if given a time that is at midnight", () => {
    expect(formatDate("0:30")).toBe("12:30 am");
  });
  test("if dateArr[0] is less than or equal to 12, then should return the time passed in plus pm", () => {
    expect(formatDate('5:30')).toBe('5:30 am')
  })
  test("if dateArr[0] is greater than 12, should be date passed in, pm", () => {
      expect(formatDate('14:30')).toBe('2:30 pm')
  })
});

describe("createDate should work properly", () => {
  test("check if we're getting out a string", () => {
    expect(typeof createDate(new Date())).toBe("string");
  });
  test("if passed in not a object, should throw an error", () => {
    expect(() => createDate(5)).toThrowError("parameter must be a object");
  });
});
