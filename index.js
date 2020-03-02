const rpc = require('node-json-rpc');
const BlockCyper = require("./BlockCyper");
 
const options = {
    // int port of rpc server, default 5080 for http or 5433 for https
    port: process.env.RPC_PORT || 5080,
    // string domain name or ip of rpc server, default '127.0.0.1'
    host: process.env.RPC_HOST || '127.0.0.1',
    // string with default path, default '/'
    path: process.env.RPC_PATH || '/',
    // boolean false to turn rpc checks off, default true
    strict: true
};
console.log(options)
// Create a server object with options
const server = new rpc.Server(options);

server.addMethod('CREATE_ADDRESS', async function(args,cb){
    const bcyper = new BlockCyper(args.coin,args.environment);
    await bcyper.createAddress()
    .then((address) => {
        cb(null,address);
    })
    .catch((error) => {
        cb(error,null);
    });
});

server.addMethod('GET_BALANCE', async function(args,cb){
    const bcyper = new BlockCyper(args.coin,args.environment); 
    await bcyper.getBalance(args.address)
    .then((result) => {
        cb(null,result);
    })
    .catch((error) => {
        cb(error,null);
    });
});

server.addMethod('CREATE_TRANSACTION', async function(args,cb){
    const bcyper = new BlockCyper(args.coin,args.environment); 

    if(args.amount < 0.0001){
        cb({"status":false,"error_message":"Minimum amount for transaction is 0.0001"},null);
    }else{
        let amount = 100000000 * args.amount;
        let tx = {"inputs": [{"addresses": [args.from]}], "outputs": [{"addresses": [args.to], "value": amount}]};
        await bcyper.transaction(tx,args.private_key)
        .then((result) => {
            cb(null,result.tx);
        })
        .catch((error) => {
            cb(error,null);
        });
    }
    
});

server.addMethod('ping', async function (args, cb) {
    console.dir(args);
    cb(null,{"status":true});
});

server.start(function (error) {
    // Did server start succeed ?
    if (error) throw error;
    else {
      console.log('Server running ...');
    }
});
