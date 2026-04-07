'use strict'

export const TRANSLATE_API_CONFIG = {
    BASE_URL: 'https://translate.googleapis.com/translate_a/single',
    CLIENT: 'gtx',
    DATA_TYPE: 't',
};

export const CONVERT_API_CONFIG = {
    BASE_URL: 'https://v6.exchangerate-api.com/v6',
    API_KEY: 'c5dd0e985e4dfaca670d2f5b',
    TYPE: 'pair',
};

export const TOOLS = [
    {name: "Translator", href: "translator.html"},
    {name: "Converter", href: "converter.html"}
]

export const LINKS = [
    {name: "Inicio", href: "index.html"},
    {name: "Herramientas", submenu: "tools"},
    {name: "Contacto", href: "contact.html"}
]
