

To create address

http://127.0.0.1:5080

params 
``` json
{
	"id":1,
	"jsonrpc":"2.0",
	"method":"CREATE_ADDRESS"
}
```
sample response 
``` json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "private": "db8251a01500f15ef3c5215f3083f4f54a0bd4081b63a3c7649d9a162c3b6e61",
        "public": "038b6a891cc3c2f67f59673067371f6ff4d751768c14cdb6b1bc3038188a378673",
        "address": "mzu31ZL5SUtCjYHSmBpmz8JoBgabizM56m",
        "wif": "cUwQ52U52riXXxp7qssqghoDCTZBE7fDaYG8V9YVCX2dauKqPTvF"
    }
}
```
To get balance of a address
http://127.0.0.1:5080

sample params 
``` json
{
	"id":1,
	"jsonrpc":"2.0",
	"method":"GET_BALANCE",
	"params" : {
    	"address" : "n3Kix7s5u2dGDbmGg1HgdwNqY3XWTE8Tqm"
	}
}
```

sample response 
``` json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "address": "n3Kix7s5u2dGDbmGg1HgdwNqY3XWTE8Tqm",
        "total_received": 54000,
        "total_sent": 50000,
        "balance": 4000,
        "unconfirmed_balance": 0,
        "final_balance": 4000,
        "n_tx": 7,
        "unconfirmed_n_tx": 0,
        "final_n_tx": 7
    }
}

```

To create transaction 

http://127.0.0.1:5080

sample params 
``` json
{
	"id":1,
	"jsonrpc":"2.0",
	"method":"CREATE_TRANSACTION",
	"params" : {
    	"from" : "n3Kix7s5u2dGDbmGg1HgdwNqY3XWTE8Tqm",
    	"to" : "mtcJYtesgcKZTWWoRzCaE528JHo6TgdbiA",
    	"amount" : 0.0001,
    	"private_key" : "4855cb2bcadabdcb3a07c2f22724338fe87994bf6bc237a74703b085913d6500"
	}
}
```

sample error message
``` json
{
    "id": 1,
    "jsonrpc": "2.0",
    "error": {
        "status": false,
        "error_message": "Minimum amount for transaction is 0.0001"
    }
}
```
sample success response 
``` json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "block_height": -1,
        "block_index": -1,
        "hash": "18962907c06529af374f9b091feb1f03194cb2a6ac524986b65dad96c97d246f",
        "addresses": [
            "n3Kix7s5u2dGDbmGg1HgdwNqY3XWTE8Tqm",
            "mtcJYtesgcKZTWWoRzCaE528JHo6TgdbiA"
        ],
        "total": 10000,
        "fees": 15000,
        "size": 192,
        "preference": "high",
        "relayed_by": "103.224.32.210",
        "received": "2020-03-02T08:07:03.356799813Z",
        "ver": 1,
        "double_spend": false,
        "vin_sz": 1,
        "vout_sz": 1,
        "confirmations": 0,
        "inputs": [
            {
                "prev_hash": "9a92936b676870dd2e113e75273ccc1c6bac7b67fbc67bd5cd60352fb88fd646",
                "output_index": 0,
                "script": "483045022100bf0ec1e3cb7571f8f1d7cdda86d633dec4d2a9742769ceda57a32321405a9aae0220474dc0018734aec83cabcc3eb803adfb082459679677bac88957264f3b6b1796012102f0626c92e4d6f80c8d8ae0e18f3aaa2aba811e67f4444b59c9e6d878a391eb7f",
                "output_value": 25000,
                "sequence": 4294967295,
                "addresses": [
                    "n3Kix7s5u2dGDbmGg1HgdwNqY3XWTE8Tqm"
                ],
                "script_type": "pay-to-pubkey-hash",
                "age": 1666318
            }
        ],
        "outputs": [
            {
                "value": 10000,
                "script": "76a9148f9c9faaf39147cba0890e41d0487abb241a694b88ac",
                "addresses": [
                    "mtcJYtesgcKZTWWoRzCaE528JHo6TgdbiA"
                ],
                "script_type": "pay-to-pubkey-hash"
            }
        ]
    }
}
```