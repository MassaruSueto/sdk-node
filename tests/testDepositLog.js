const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestDepositLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.deposit.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});


describe('TestDepositLogInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.deposit.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.deposit.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
