'use strict'

import { Validator } from "./validator.js";
import { swapCurrency, copyText} from "./modules.js";


export class ConverterComponent {
    constructor(service) {
        this.service = service;

        this.elements = {
            formWrapper : document.getElementById ('formWrapper'),
            divOrigin: document.getElementById('divOrigin'), 
            mountOrigin: document.getElementById('mountOrigin'),
            divConvert: document.getElementById('divConvert'),
            mountConvert: document.getElementById('mountConvert'),
            btnConvert: document.getElementById('btnConvert'),
            btnSwap: document.getElementById('btnSwap'),
            btnCopy: document.getElementById('btnCopy'),
        }; 

        this.init();
    }

    init() {
        this.elements.btnConvert.addEventListener('click', async () => {
            await this.convertMount();
        });

        this.elements.btnSwap.addEventListener('click', async() => {
            swapCurrency(
                this.elements.formWrapper,
                this.elements.divOrigin,
                this.elements.mountOrigin,
                this.elements.divConvert,
                this.elements.mountConvert
            );
            await this.convertMount();
        });

        this.elements.btnCopy.addEventListener('click', () => {
            copyText(
                this.elements.mountConvert.value,
                this.elements.formWrapper);
        });

    }
    
    async convertMount() {
            const formWrapper = this.elements.formWrapper;
            const divOrigin = this.elements.divOrigin;
            const mountOrigin = this.elements.mountOrigin;
            const divConvert = this.elements.divConvert;
            const mountConvert = this.elements.mountConvert;
            
        try {
            Validator.clearMessages(formWrapper);

            const isCurrencyValid = Validator.validateCurrency(divOrigin, divConvert, formWrapper);
            const isMountValid = Validator.validateText(mountOrigin, formWrapper);

            if (!isCurrencyValid || !isMountValid) {
                return;
            }

            const convertResult = await this.service.convert( 
                divOrigin.value,
                mountOrigin.value,
                divConvert.value
            );
            mountConvert.value = Number(convertResult.conversion_result).toFixed(2);

            const display = document.querySelector('.display');
            display.textContent = `1 ${divOrigin.value} = ${Number(convertResult.conversion_rate).toFixed(2)} ${divConvert.value}`;
        }
        
        catch (error) {
            Validator.showMessage( formWrapper, error.message, 'error');
        }
    }
}
