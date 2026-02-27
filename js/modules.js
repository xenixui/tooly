'use strict'

import {getArrayLanguages} from '../js/languages.js';
import { Validator } from "./validator.js";
import { TOOLS } from './config.js';


/*Generar listado de idiomas en el select a aprtir de la constante LANGUAGES*/
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

export function activateURL() {
    const urlActual = window.location.href;

    const header = document.querySelector('.header');
    const urlListHeader = header.querySelectorAll('a');
    const btnMenu = document.getElementById('btn-menu');

    const tools = TOOLS;

    for (const urlHeader of urlListHeader) {
        if (urlActual === urlHeader.href) {
            urlHeader.classList.add('active');
        }
    }
   
    for (const tool of tools){
        if (urlActual.includes(tool.href)) {
            btnMenu.classList.add('active');
        }
    }
}

