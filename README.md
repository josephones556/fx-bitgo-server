# Bitgo Express setup

bitgo -- https://github.com/BitGo/BitGoJS/tree/master/modules/express#cloning-the-repository-and-installing-dependencies

# Request and params

1. POST -- /create/address
    Params: environment, access_token, currency, walletId, addressLabel

2. POST -- /new/transaction
    Params: environment, access_token, currency, walletId, amount, address, phrase
    amount: In satochi

3. POST -- /new/transaction/to/many
    Params: environment, access_token, currency, walletId, amount1, address1, amount2, address2, phrase
    amount 1 & 2: In satochi

4. POST -- /get/transaction
    Params: environment, access_token, currency, walletId, transferId



cd bitgojs/modules/express
