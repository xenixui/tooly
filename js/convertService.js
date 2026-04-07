'use strict'

import {CONVERT_API_CONFIG}  from './config.js';
import { generateCurrencies } from './modules.js';

export class ConvertService {
    constructor() {
        generateCurrencies();
    }
    
    buildURL(divOrigin, mountOrigin, divConvert) {

        const BASE_URL = CONVERT_API_CONFIG.BASE_URL;
        const API_KEY = CONVERT_API_CONFIG.API_KEY;
        const TYPE = CONVERT_API_CONFIG.TYPE;

        return `${BASE_URL}/${API_KEY}/${TYPE}/${divOrigin}/${divConvert}/${mountOrigin}`; 

    }

    async convert(divOrigin, mountOrigin, divConvert) { 
        
        const request = await fetch ( this.buildURL(divOrigin, mountOrigin, divConvert));
        const data = await request.json(); 

        if (data.result !== 'success') throw new Error('Error en la conversión');
        
        return data; 
    }
}
