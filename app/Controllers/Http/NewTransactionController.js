'use strict'

const BitGoJS = require('bitgo');

const { validate } = use('Validator')

class NewTransactionController {

    async index({ request, session, response })
    {

        const rules = {
            environment: 'required',
            access_token: 'required',
            currency: 'required',
            walletId: 'required',
            amount: 'required',
            address: 'required',
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
                amount: data.amount * 1e8,
                address: data.address,
                walletPassphrase: data.phrase
            };

            await wallet.send(params).then(async (transaction) => {

                return response.status(200).json({
                    txid: transaction.txid,
                    status: transaction.status
                })

            });

        });

    }

}

module.exports = NewTransactionController
