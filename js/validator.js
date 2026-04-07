'use strict'

export class Validator {
    static clearMessages(node) {
        const oldMessages = node.querySelectorAll('.message');
        oldMessages.forEach(msg => msg.remove());
    }
    
    static showMessage (node, textMessage, type) {
        const message = document.createElement('div');
        message.className = `message message--${type}`;
        message.textContent = textMessage;
        node.appendChild(message);

        setTimeout(() => {
            this.clearMessages(node);
        }, 3000);
    }

    static validateText(txtOrigin, node) {
        const length = txtOrigin.value.length;

        if (length === 0) {
            this.showMessage (node, 'Por favor, introduce el texto a traducir.','warning');
            return false;
        }

        if (length > 5000) {
            this.showMessage (node, 'El texto no puede suprerar 5000 caracteres','error');
            return false;
        }

        return true;
    }

    static validateLanguage(lanOrigin, lanTranslate, node) {
        const lanOriginValue = lanOrigin.value;
        const lanTranslateValue = lanTranslate.value;

        if (!lanOriginValue && !lanTranslateValue ) {
            this.showMessage (node, 'Por favor, elige el idioma de origen y el de destino.','warning');
            return false;
        }
        
        if (!lanOriginValue) {
            this.showMessage (node, 'Por favor, elige el idioma de origen.','warning');
            return false;
        }

        if (!lanTranslateValue) {
            this.showMessage (node, 'Por favor, elige el idioma de destino.','warning');
            return false;
        }
        return true;
    }

    static validateCurrency(divOrigin, divConvert, node) {
        const divOriginValue = divOrigin.value;
        const divConvertValue = divConvert.value;

        if (!divConvertValue && !divConvertValue ) {
            this.showMessage (node, 'Por favor, elige la modeda de origen y la de destino.','warning');
            return false;
        }
        
        if (!divOriginValue) {
            this.showMessage (node, 'Por favor, elige la moneda de origen.','warning');
            return false;
        }

        if (!divConvertValue) {
            this.showMessage (node, 'Por favor, elige la moneda de destino.','warning');
            return false;
        }
        return true;
    }
}