const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    /**
     *
     * Boleto Log object
     *
     * @description Every time a Boleto entity is updated, a corresponding Boleto Log
     * is generated for the entity. This log is never generated by the
     * user, but it can be retrieved to check additional information
     * on the Boleto.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param boleto [Boleto]: Boleto entity to which the log refers to.
     * @param errors [list of strings]: list of errors linked to this Boleto event
     * @param type [string]: type of the Boleto event which triggered the log creation. ex: 'registered' or 'paid'
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({created, type, errors, boleto, id}) {
        super(id);
        this.created = check.date(created);
        this.type = type;
        this.errors = errors;
        this.boleto = boleto;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'BoletoLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Boleto Log
     *
     * @description Receive a single Boleto Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Boleto Log object with updated attributes
     *
     */
    return rest.getId({resource, id, user});
};

exports.query = async function ({ limit, after, before, types, boletoIds, user} = {}) {
    /**
     *
     * Retrieve Boleto Logs
     *
     * @description Receive a generator of Boleto Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
     * @param boletoIds [list of strings, default null]: list of Boleto ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Boleto Log objects with updated attributes
     *
     */
    let params = {
        after: after,
        before: before,
        types: types,
        boletoIds: boletoIds,
    };
    return rest.getList({resource, limit, params, user});
};
