'use strict'

import {TranslatorComponent} from '../js/translatorComponent.js';
import { TranslationService } from './translationService.js';
import { ConverterComponent } from './converterComponent.js';
import { ConvertService} from './converTService.js';
import '../components/components.js';


class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const isTranslatorPage = window.location.pathname.endsWith('translator.html');
            const isConverterPage = window.location.pathname.endsWith('converter.html');
            if(isTranslatorPage) {
                this.translator = new TranslatorComponent(new TranslationService());
            }
            if(isConverterPage) {
                this.converter = new ConverterComponent(new ConvertService());
            }
        });
    }
}

new App(); 

 