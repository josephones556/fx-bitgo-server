'use strict'

const BitGoJS = require('bitgo');

const { validate } = use('Validator')

class NewTransactionToManyController {

    async index({ request, session, response })
    {
        const rules = {
            environment: 'required',
            access_token: 'required',
            currency: 'required',
            walletId: 'required',
            amount1: 'required',
            address1: 'required',
            amount2: 'required',
            address2: 'required',
            phrase: 'required',
        }

        var data = request.all();

        const validation = await validate(data, rules)

        if (validation.fails()) 
        {
            return response.status(401).json(validation.messages()) 
        }

        const bitgo = new BitGoJS.BitGo({ 
            env: data.environment,
            accessToken: data.access_token 
        });

        await bitgo.coin(data.currency).wallets().get({ id: data.walletId }).then(async (wallet) => {

            let params = {
                recipients: [{
                    amount: parseInt(data.amount1),
                    address: data.address1,
                }, {
                    amount: parseInt(data.amount2),
                    address: data.address2,
                }],
                walletPassphrase: data.phrase
            };

            await wallet.sendMany(params).then(async (transaction) => {

                return response.status(200).json({
                    id: transaction.transfer.id,
                    txid: transaction.transfer.txid,
                    status: transaction.status
                })

            });

        });

    }

}

module.exports = NewTransactionToManyController
