'use strict'

import { Validator } from "./validator.js";
import { swapLanguage, copyText, showMenu } from "./modules.js";
import { TOOLS } from "./config.js";

export class TranslatorComponent {
    constructor(service) {
        this.service = service;
        this.tools = TOOLS;

        this.elements = {
            formWrapper : document.getElementById ('formWrapper'),
            lanOrigin: document.getElementById('lanOrigin'), 
            txtOrigin: document.getElementById('txtOrigin'),
            lanTranslate: document.getElementById('lanTranslate'),
            txtTranslate: document.getElementById('txtTranslate'),
            btnTranslate: document.getElementById('btnTranslate'),
            btnSwap: document.getElementById('btnSwap'),
            btnCopy: document.getElementById('btnCopy'),
            btnMenu: document.getElementById('btn-menu'),
        }; 

        this.init();
    }

    init() {
        this.elements.btnTranslate.addEventListener('click', async () => {
            await this.translateText();
        });

        this.elements.btnSwap.addEventListener('click', async() => {
            swapLanguage(
                this.elements.formWrapper,
                this.elements.lanOrigin,
                this.elements.txtOrigin,
                this.elements.lanTranslate,
                this.elements.txtTranslate
            );
            await this.translateText();
        });

        this.elements.btnCopy.addEventListener('click', () => {
            copyText(
                this.elements.txtTranslate.value,
                this.elements.formWrapper);
        });

        this.elements.btnMenu.addEventListener('click', () => {
            showMenu(this.tools, this.elements.btnMenu);
        })

    }
    
    async translateText() {
            const formWrapper = this.elements.formWrapper;
            const lanOrigin = this.elements.lanOrigin;
            const txtOrigin = this.elements.txtOrigin;
            const lanTranslate = this.elements.lanTranslate;
            const txtTranslate = this.elements.txtTranslate;
            
        try {
            Validator.clearMessages(formWrapper);

            const isLanguageValid = Validator.validateLanguage(lanOrigin, lanTranslate, formWrapper);
            const isTextValid = Validator.validateText(txtOrigin, formWrapper);

            if (!isLanguageValid || !isTextValid) {
                return;
            }

            const translateResult = await this.service.translate(lanOrigin.value, txtOrigin.value, lanTranslate.value);
            txtTranslate.value = translateResult[0][0][0];
        } 
        
        catch (error) {
            Validator.showMessage( formWrapper, error.message, 'error');
        }
    }
}
