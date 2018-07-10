var expect = require('expect');
var { generateMessage } = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Iksan';
        var text = 'Hai Diah';
        var msgObj = generateMessage(from, text);

        expect(typeof msgObj.from).toBe('string');
        expect(msgObj).toMatchObject({from, text});
    });
});