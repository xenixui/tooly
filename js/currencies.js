'use strict'

const CURRENCIES
 = {
    AUTO: { code: 'auto', name: 'Detectar automáticamente' },
    EN: { code: 'en', name: 'English' },
    ES: { code: 'es', name: 'Spanish' },
    FR: { code: 'fr', name: 'French' },
    DE: { code: 'de', name: 'German' },
    IT: { code: 'it', name: 'Italian' },
    PT: { code: 'pt', name: 'Portuguese' },
    RU: { code: 'ru', name: 'Russian' },
    ZH: { code: 'zh', name: 'Chinese' },
    JA: { code: 'ja', name: 'Japanese' },
  };

  class Currency {
    constructor(code, currency) {
        this.code = code;
        this.currency = currency;
    }
  }

  export function getArrayCurrencies() {
    let currencies = [];

    for(const cur of Object.values(CURRENCIES)) {
        const currency = new Currency (
            cur.code,
            cur.name
        )

        currencies.push(currency);
    }

    return currencies;
  }