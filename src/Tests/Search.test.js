const {Page, totalPage} = require('./../Logic/SearchLogic');

describe('checking to see if page has correct values', () => {
    test('check type number', () => {
        expect(() => Page('hi')).toThrowError('page needs to be a number')
    })
    test('increments value passed in', () => {
        expect(Page(1)).toBe(2)
    })
})
describe('total page should get correct values',() => {
    test('check type number', () => {
        expect(() => totalPage('hi')).toThrowError('totalPage to be a number')
    })
    test('getting correct values back', () => {
        expect(totalPage(2)).toBe(3)
        })
    test('page has to be less then totalPage', () => {
        var pageNum = Page(0)
        var totalPages = totalPage(1)
        expect(pageNum < totalPages).toBe(true);
    })
})