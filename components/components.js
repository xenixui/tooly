import {Dropdown} from "./dropdown/dropdown.js";
import { Menu } from "./menu/menu.js";

if (!customElements.get('my-dropdown')) {
    customElements.define('my-dropdown', Dropdown);
}
if (!customElements.get('my-menu')) {
    customElements.define('my-menu', Menu);
}