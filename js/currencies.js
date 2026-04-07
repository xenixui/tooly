'use strict'

 class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

export function getArrayCurrencies(supportedCodes) {
    let currencies = [];

    for (const [code, name] of supportedCodes) {
        const currency = new Currency(code, name);
        currencies.push(currency);
    }

    return currencies;
}