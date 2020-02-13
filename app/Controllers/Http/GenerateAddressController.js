'use strict'

const BitGoJS = require('bitgo');

const { validate } = use('Validator')

class GenerateAddressController {

    async index({ request, session, response })
    {
        const rules = {
            environment: 'required',
            access_token: 'required',
            currency: 'required',
            walletId: 'required',
            addressLabel: 'required'
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

            await wallet.createAddress({ label: request.addressLabel }).then(async (address) => {

                return response.status(200).json({
                    address: address.address
                })

            });

        });
    }

}

module.exports = GenerateAddressController
