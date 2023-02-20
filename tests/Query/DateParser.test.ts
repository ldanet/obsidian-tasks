/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import { DateParser } from '../../src/Query/DateParser';
import { TaskRegularExpressions } from '../../src/Task';

window.moment = moment;

function testParsingeSingleDate(input: string, result: string) {
    const moment = DateParser.parseDate(input);
    expect(moment.format(TaskRegularExpressions.dateFormat)).toEqual(result);
}

describe('DateParser - single dates', () => {
    it('should parse a valid fixed date correctly', () => {
        const input = '2021-03-17';
        testParsingeSingleDate(input, input);
    });

    it('should recognise an invalid date correctly', () => {
        testParsingeSingleDate('2021-13-17', 'Invalid date');
    });
});

describe('DateParser - date ranges', () => {
    it('should parse date range from natural dates', () => {
        // Arrange
        const input = '17 August 2013 19 August 2013';

        // Act
        const result = DateParser.parseDateRange(input);

        // Assert
        const start = result[0];
        expect(start).toBeDefined();
        expect(start.format(TaskRegularExpressions.dateFormat)).toEqual('2013-08-17');

        const end = result[1];
        expect(end).toBeDefined();
        expect(end.format(TaskRegularExpressions.dateFormat)).toEqual('2013-08-19');
    });

    it('should parse date range with  multiple spaces', () => {
        // Arrange
        const input = '2013-08-17   2014-08-19';

        // Act
        const result = DateParser.parseDateRange(input);

        // Assert
        const start = result[0];
        expect(start).toBeDefined();
        expect(start.format(TaskRegularExpressions.dateFormat)).toEqual('2013-08-17');

        const end = result[1];
        expect(end).toBeDefined();
        expect(end.format(TaskRegularExpressions.dateFormat)).toEqual('2014-08-19');
    });

    it('should parse single date as date range', () => {
        // Arrange
        const input = '2019-12-28';

        // Act
        const result = DateParser.parseDateRange(input);

        // Assert
        const start = result[0];
        expect(start).toBeDefined();
        expect(start.format(TaskRegularExpressions.dateFormat)).toEqual(input);

        const end = result[1];
        expect(end).toBeDefined();
        expect(end.format(TaskRegularExpressions.dateFormat)).toEqual(input);
    });
});
