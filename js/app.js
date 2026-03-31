'use strict'

import {TranslatorComponent} from '../js/translatorComponent.js';
import { TranslationService } from './translationService.js';
import '../components/components.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const isTranslatorPage = window.location.pathname.endsWith('translator.html');
            if(isTranslatorPage) {
                this.translator = new TranslatorComponent(new TranslationService());
            }
        });
    }
}

new App(); 

 