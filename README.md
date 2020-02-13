# Bitgo Express setup

bitgo -- https://github.com/BitGo/BitGoJS/tree/master/modules/express#cloning-the-repository-and-installing-dependencies

# Request and params

In 

1. POST -- /create/address
    Params: environment, access_token, currency, walletId, addressLabel

2. POST -- /new/transaction
    Params: environment, access_token, currency, walletId, amount, address, phrase

3. POST -- /new/transaction/to/many
    Params: environment, access_token, currency, walletId, amount1, address1, amount2, address2, phrase

4. POST -- /get/transaction
    Params: environment, access_token, currency, walletId, transferId