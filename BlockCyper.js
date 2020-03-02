
const request = require("request");
const bitcoin = require("bitcoinjs-lib");
const bigi    = require("bigi");
const buffer  = require('buffer');

const URL_ROOT = 'https://api.blockcypher.com/v1/';

/**
 * 
 */
class BlockCyper {

    constructor(coin,chain){
        this.coin = coin;
        this.chain = chain;
    }

    _get(url,cb) {
        const urlr = URL_ROOT + this.coin + '/' + this.chain + url;
        request.get({
            url:urlr,
            strictSSL:true,
            json: true
        }, function (error, response, body) {
            if (!error || response.statusCode !== 200) {
                cb(error, body || {});
            } else {
                cb(null, body);
            }
        });
    };

    _post(url, data, cb) {
        const urlr = URL_ROOT + this.coin + '/' + this.chain + url;
        console.log(urlr);
        request.post({
            url:urlr,
            strictSSL:true,
            json: true,
            body: data 
        }, function (error, response, body) {
            if (!error || (response.statusCode !== 200 && response.statusCode !== 201)) {
                cb(error, body || {});
            } else {
                cb(null, body);
            }
        });
    };

    /**
     * 
     */
    createAddress(){
        return new Promise((resolve,reject) => {
            this._post('/addrs',{},(err,body) => {
                if (err) {
                    reject(body);
                } else {
                    resolve(body);
                }
            })
        });
    };

    /**
     * <b>Get Addr Bal</b>
     * Get balance information about an address.
     * @param {(string|number)}    addr       Address you're querying.
     * @return Promise<balance>
     * @method getBalance
     */
    getBalance(addr) {
        return new Promise((resolve,reject) => {
            this._get('/addrs/' + addr + '/balance', function(err, body) {
                if (err) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        });
    };

    /**
     * 
     * @param {Object} tx 
     * @param {String} private_key 
     */
    transaction(tx,private_key) {
        return new Promise((resolve,reject) => {
            let self = this;
            this._post('/txs/new', tx, function(err, body) {
                if (err) {
                    reject(body);
                } else {
                    const keys = new bitcoin.ECPair(bigi.fromHex(private_key));
                    body.pubkeys = [];
                    body.signatures = body.tosign.map(function(tosign, n) {
                        body.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
                        return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
                    });
                    console.dir(body);
                    self._post('/txs/send', body, function(err, body) {
                        if (err) {
                            console.log("error");console.dir(err);
                            reject(body);
                        } else {
                            console.log("success **************");console.dir(body);
                            resolve(body);
                        }
                    });
                    
                }
            });
        });
    };


}


module.exports = BlockCyper;
