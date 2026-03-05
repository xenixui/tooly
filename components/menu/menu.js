export class Menu extends HTMLElement {
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
        const response = await fetch('/components/menu/menu.html');
        
        if (!response.ok) {
            alert('No se pudo cargar menu.html');
            return;
        }

        const htmlContent = await response.text();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/components/menu/menu.css';

        const div = document.createElement('div');
        div.innerHTML = htmlContent;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(div);

        }

    async showMenu(items) {
        await this._ready;

        let menu = this.shadowRoot.querySelector('.menu');
        if (!menu) return;
        
        menu.innerHTML = '';

        for(const item of items) {
            const menuItem = document.createElement ('li');
            const link = document.createElement('a');
            link.classList.add ("menu__link");
            link.textContent = item.name;
            link.href = item.href;
            menuItem.appendChild(link)
            menu.appendChild(menuItem);
        }
    }
}

window.customElements.define('my-menu', Menu);