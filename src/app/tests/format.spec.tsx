import { formatDate } from "../utils/format"

describe('formatDate function', () => {
    it('should parse date in string format to localeString', () => {
        const testDate = '2023-08-23 14:23:30.778770'
        const date = formatDate(testDate)
        expect(date).toBeTruthy()
    })

    it('should parse empty date to localeString', () => {
        const date = formatDate()
        expect(date).toBeTruthy()
    })
})