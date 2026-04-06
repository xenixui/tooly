'use strict';

import { TOOLS } from '../../js/config.js';
import { LINKS } from '../../js/config.js';

export class Header extends HTMLElement {
    constructor () {
        super();
        this._ready = null;
        this.attachShadow({ mode: 'open' });
        this._tools = TOOLS;
    }

    connectedCallback() {
        if (this._ready) return;
        this._ready = this._render();
    }

    async _render() {
        const srcLogo = this.getAttribute('src-logo') ?? '';
        const altLogo = this.getAttribute('alt-logo') ?? '';
        const response = await fetch('/components/header/header.html');
        
        if (!response.ok) {
            alert('No se pudo cargar header.html');
            return;
        }

        const htmlContent = await response.text();
        const parsed = htmlContent
            .replace('{{srcLogo}}', srcLogo)
            .replace('{{altLogo}}', altLogo);

        const linkIcons = document.createElement('link');
        linkIcons.rel = 'stylesheet';
        linkIcons.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';

        const linkBootstrap = document.createElement('link');
        linkBootstrap.rel = 'stylesheet';
        linkBootstrap.href = 'https://cdn.jsdelivr.net/npm/bootstrap-v4-grid-only@1.0.0/dist/bootstrap-grid.min.css';

        const linkGlobal = document.createElement('link');
        linkGlobal.rel = 'stylesheet';
        linkGlobal.href = '/css/style.css';

        const linkLocal = document.createElement('link');
        linkLocal.rel = 'stylesheet';
        linkLocal.href = '/components/header/header.css';

        const div = document.createElement('div');
        div.innerHTML = parsed;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(linkGlobal);
        this.shadowRoot.appendChild(linkIcons);
        this.shadowRoot.appendChild(linkLocal); 
        this.shadowRoot.appendChild(linkBootstrap); 
        this.shadowRoot.appendChild(div);

        this.openDropdown();
        this._activateURL();
        this._openMobileMenu();
    }

    async openDropdown() {
        await this._ready;

        const btnDropdown = this.shadowRoot.getElementById('btnDropdown');

        if (!btnDropdown) return;

        const dropdown = document.createElement('my-dropdown');
        document.body.appendChild(dropdown);

        const menu = document.createElement('my-menu');
        document.body.appendChild(menu);

        btnDropdown.addEventListener('click', async () => {
        if(dropdown._isOpen) {
            await dropdown.closeDropdown(btnDropdown);
        } else {
            await dropdown.openDropdown(btnDropdown, menu);
            await menu.showMenu(TOOLS, 'column');
            }
        }); 
    }

    _activateURL() {
    const urlActual = window.location.href;
    const urlListHeader = this.shadowRoot.querySelectorAll('a');
    const btnMenu = this.shadowRoot.getElementById('btnDropdown');

    for (const urlHeader of urlListHeader) {
        if (urlActual === urlHeader.href) {
            urlHeader.classList.add('active');
            }
        }

    for (const tool of this._tools) {
        if (urlActual.includes(tool.href)) {
            btnMenu?.classList.add('active');
            }
        }
    }

    _openMobileMenu() {
        const mobileBreakpoint = 768;
        const btnMenu = this.shadowRoot.getElementById('mobileMenu');
        const desktopMenu = this.shadowRoot.getElementById('desktopMenu');

        this._updateMobileMenuState();

        const dropdown = document.createElement('my-dropdown');
        document.body.appendChild(dropdown);

        const menu = document.createElement('my-menu');
        document.body.appendChild(menu);
        
        btnMenu.addEventListener('click', async () => {
            if(dropdown._isOpen) {
                await dropdown.closeDropdown(btnMenu);
            } else {
                await dropdown.openDropdown(btnMenu, menu);
                await menu.showMenu(LINKS, 'column');
            }
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(async () => {      
                this._updateMobileMenuState();

                if (dropdown._isOpen) {                     
                    await dropdown.closeDropdown(btnMenu);  
                }                                           
                    }, 250);
        });
    }

    _updateMobileMenuState() {
        const mobileBreakpoint = 768;
        const btnMenu = this.shadowRoot.getElementById('mobileMenu');
        const desktopMenu = this.shadowRoot.getElementById('desktopMenu');

        if (window.innerWidth <= mobileBreakpoint) {
            btnMenu.classList.remove('btn--hidden');
            desktopMenu.classList.add('hidden');
        } else {
            btnMenu.classList.add('btn--hidden');
            desktopMenu.classList.remove('hidden');
        }
    }
}

window.customElements.define('my-header', Header);