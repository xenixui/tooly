export class Header extends HTMLElement {
constructor () {
    super();
    this._ready = null;
}

    connectedCallback() {
        if (this._ready) return;
        this._ready = this._render();
    }

    async _render() {
        const response = await fetch('/components/header/header.html');
        
        if (!response.ok) {
            alert('No se pudo cargar header.html');
            return;
        }

        const htmlContent = await response.text();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/components/header/header.css';

        const div = document.createElement('div');
        div.innerHTML = htmlContent;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(div);

        }

}

window.customElements.define('my-header', Header);