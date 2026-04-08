'use strict';

import { TOOLS } from '../../js/config.js';

const SUBMENUS = {
    tools: TOOLS
};

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

    async showMenu(items, flexDirection = 'row') {
        await this._ready;

        let menu = this.shadowRoot.querySelector('.menu');
        if (!menu) return;
        
        menu.innerHTML = '';
        menu.style.flexDirection = flexDirection;

        for(const item of items) {
            const menuItem = document.createElement ('li');
            const link = document.createElement('a');
            link.classList.add ("menu__link");
            link.textContent = item.name;
            link.href = item.href || '#';

              if (item.submenu) {
                const iconLink = document.createElement('link');
                iconLink.rel = 'stylesheet';
                iconLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
                this.shadowRoot.appendChild(iconLink);
                
                const icon = document.createElement('span');
                icon.classList.add('menu__span', 'menu_icon');
                icon.textContent = 'expand_more'; 
                link.appendChild(icon);
                }

            menuItem.appendChild(link);

            if (item.submenu) {
                link.classList.add('active_dropdown');
                const submenu = document.createElement('ul');
                const submenuItems = SUBMENUS[item.submenu];

                for (const sub of submenuItems) {
                    const subItem = document.createElement('li');

                    const subLink = document.createElement('a');
                    subLink.textContent = sub.name;
                    subLink.href = sub.href;
                    subLink.classList.add('menu__link');

                    subItem.appendChild(subLink);
                    submenu.appendChild(subItem);
                };
                submenu.classList.add('menu__submenu');
                menuItem.appendChild(submenu); 
            }
            menu.appendChild(menuItem);
        }
    }
}

window.customElements.define('my-menu', Menu);