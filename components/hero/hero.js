'use strict';

export class Hero extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this._ready = null;
    }

    connectedCallback() {
        if (this._ready) return;
        this._ready = this._render();
    }

    async _render() {
        const srcImg = this.getAttribute('src-img') ?? '';
        const altImg = this.getAttribute('alt-img') ?? '';
        const text = this.getAttribute('text') ?? '';

        const response = await fetch('/components/hero/hero.html');
        
        if (!response.ok) {
            alert('No se pudo cargar hero.html');
            return;
        }

        const htmlContent = await response.text();
        const parsed = htmlContent
            .replace('{{srcImg}}', srcImg)
            .replace('{{altImg}}', altImg)
            .replace('{{text}}', text);

        const linkGlobal = document.createElement('link');
        linkGlobal.rel = 'stylesheet';
        linkGlobal.href = '/css/style.css';
        
        const linkLocal = document.createElement('link');
        linkLocal.rel = 'stylesheet';
        linkLocal.href = '/components/hero/hero.css';

        const section = document.createElement('section');
        section.innerHTML = parsed;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(linkGlobal);
        this.shadowRoot.appendChild(linkLocal);
        this.shadowRoot.appendChild(section);

        }
}

window.customElements.define('my-hero', Hero);