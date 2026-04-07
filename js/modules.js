'use strict'

import {getArrayLanguages} from '../js/languages.js';
import { Validator } from "./validator.js";

export function generateLanguages() {
    const languages = getArrayLanguages();
    let lanOrigin = document.getElementById('lanOrigin');
    let lanTranslate = document.getElementById('lanTranslate');

    for (const language of languages) {
        const optionOrigin = document.createElement('option');
        optionOrigin.value = language.code;
        optionOrigin.textContent = language.language;
        lanOrigin.appendChild(optionOrigin);
        
        const optionTranslate = document.createElement('option');
        optionTranslate.value = language.code;
        optionTranslate.textContent = language.language;
        if (optionTranslate.value != "auto") {
            lanTranslate.appendChild(optionTranslate);
        } 
    }
}

export function generateCurrencies(supportedCodes) {
    const currencies = getArrayCurrencies(supportedCodes);
    let divOrigin = document.getElementById('divOrigin');
    let divConvert = document.getElementById('divConvert');

    for (const currency of currencies) {
        const optionOrigin = document.createElement('option');
        optionOrigin.value = currency.code;
        optionOrigin.textContent = currency.name;
        divOrigin.appendChild(optionOrigin);

        const optionConvert = document.createElement('option');
        optionConvert.value = currency.code;
        optionConvert.textContent = currency.name;
        divConvert.appendChild(optionConvert);
    }
}

export function swapLanguage(node, lanOrigin, txtOrigin, lanTranslate, txtTranslate) {
    
    try {
        const refLan = lanOrigin.value;
        const refTxt = txtOrigin.value;

        if(Validator.validateLanguage(lanOrigin, lanTranslate, node) && lanOrigin.value != "auto") {
            lanOrigin.value = lanTranslate.value;
            lanTranslate.value = refLan;
            Validator.clearMessages(node);
           
        }

        if(Validator.validateText(txtOrigin, node)) {
            txtOrigin.value = txtTranslate.value;
            txtTranslate.value = refTxt;
            Validator.clearMessages(node);
        }
    }
    catch(error) {
        Validator.showMessage (node, error.message,'warning');
    }   
}

export function copyText(text, node) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => Validator.showMessage( node, 'Texto copiado a portapapeles', 'success'))
            .catch(() => fallbackCopyToClipboard(text));
    } else {
        fallbackCopyToClipboard(text);
    }
}

export function showMenu (tools, toggleButton) {
    let menu = document.querySelector('.menu'); 

    if (!menu) {
        menu = document.createElement ('ul');
        menu.classList.add ("menu");

        for (const tool of tools) {
            const menuItem = document.createElement ('a'); 
            menuItem.classList.add ("link");
            menuItem.textContent = tool.name;
            menuItem.href = tool.href;
            menu.appendChild(menuItem);
        }

        toggleButton.appendChild(menu);
    }
 
    return menu;
}

