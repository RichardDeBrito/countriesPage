import { createDetailsPage } from "./createPages.js";
import { captureCurrencies, captureLanguages, captureBorders, captureDomains } from "./utils.js";

const contrie = JSON.parse(localStorage.getItem("selectContrie"));

const languages = Object.values(contrie.languages);
const currencies = Object.values(contrie.currencies);

const borders = contrie.borders;
const lat = contrie.latlng[0];
const lng = contrie.latlng[1];

const name = contrie.name.common;
const nameOfficial = contrie.name.official;
const flag = contrie.flags.svg;
const capital = contrie.capital;
const population = contrie.population.toLocaleString('pt-BR');
const area = contrie.area.toLocaleString('pt-BR') + ' km²';
const region = contrie.region;
const domain = contrie.tld;

const currenciesText = captureCurrencies(currencies);
const languageText = captureLanguages(languages);
const domainsText = captureDomains(domain);
const borderValues = captureBorders(borders);


const mapsLink = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-1}%2C${lat-1}%2C${lng+1}%2C${lat+1}&layer=mapnik&marker=${lat}%2C${lng}`;

const iframe = document.getElementById('iframe');
iframe.src = mapsLink;

document.addEventListener('DOMContentLoaded', () => {
    createDetailsPage(name, nameOfficial, flag, capital, population, area, region, languageText, currenciesText, domainsText, borderValues);
});